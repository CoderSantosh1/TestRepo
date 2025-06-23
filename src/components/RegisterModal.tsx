import { useState } from "react";

export default function RegisterModal({ onSuccess }: { onSuccess: (user: { name: string, mobile: string }) => void }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (name.trim().length < 2) return "Name must be at least 2 characters.";
    if (!/^\d{10}$/.test(mobile)) return "Mobile number must be 10 digits.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("user", JSON.stringify(data.user));
      onSuccess(data.user);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300 }}>
        <h2>Register to Continue</h2>
        <div>
          <label>Name:</label>
          <input value={name} onChange={e => setName(e.target.value)} required style={{ width: "100%" }} />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input value={mobile} onChange={e => setMobile(e.target.value)} required style={{ width: "100%" }} maxLength={10} />
        </div>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        <button type="submit" style={{ marginTop: 16 }} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
} 