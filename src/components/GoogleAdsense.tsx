'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdsenseProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
}

const GoogleAdsense: React.FC<GoogleAdsenseProps> = ({
  adSlot,
  adFormat = 'auto',
  style,
  className
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && !window.adsbygoogle.some(ad => ad.slot === adSlot)) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adSlot]);

  return (
    <ins
      className={`adsbygoogle ${className || ''}`}
      style={style}
      data-ad-client="ca-pub-7649078598124252"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAdsense; 