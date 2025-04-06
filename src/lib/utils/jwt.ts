import { TextEncoder, TextDecoder } from 'util';

interface JWTPayload {
  adminId: string;
  email: string;
  role: string;
  exp: number;
  [key: string]: any;
}

class JWTVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JWTVerificationError';
  }
}

class TokenExpiredError extends Error {
  expiredAt: Date;

  constructor(message: string, expiredAt: Date) {
    super(message);
    this.name = 'TokenExpiredError';
    this.expiredAt = expiredAt;
  }
}

async function importKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function verifySignature(
  token: string,
  secret: string
): Promise<JWTPayload> {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');

    if (!headerB64 || !payloadB64 || !signatureB64) {
      throw new JWTVerificationError('Invalid token format');
    }

    // Decode payload
    const decodedPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString()
    ) as JWTPayload;

    // Check token expiration
    if (decodedPayload.exp && Date.now() >= decodedPayload.exp * 1000) {
      throw new TokenExpiredError(
        'Token expired',
        new Date(decodedPayload.exp * 1000)
      );
    }

    // Verify signature
    const key = await importKey(secret);
    const encoder = new TextEncoder();
    const signatureBase = encoder.encode(`${headerB64}.${payloadB64}`);
    const signature = Buffer.from(signatureB64, 'base64url');

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      signatureBase
    );

    if (!isValid) {
      throw new JWTVerificationError('Invalid signature');
    }

    return decodedPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw error;
    }
    if (error instanceof JWTVerificationError) {
      throw error;
    }
    throw new JWTVerificationError('Token verification failed');
  }
}

export { verifySignature, TokenExpiredError, JWTVerificationError };