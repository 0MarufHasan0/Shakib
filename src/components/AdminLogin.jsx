"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter the administration password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Reloading the page will cause Next.js Server Components to re-evaluate the cookies 
        // and render the AdminDashboard instead of the AdminLogin component.
        window.location.reload();
      } else {
        const data = await response.json();
        setError(data.error || "Incorrect credentials. Access denied.");
      }
    } catch (err) {
      console.error(err);
      setError("A connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-margin-mobile relative overflow-hidden">
      {/* Decorative molecular backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-70"></div>
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-primary/5 blur-xl animate-pulse"></div>
      
      {/* Back to Home Link */}
      <a
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md uppercase tracking-wider font-bold"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Return Home
      </a>

      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 shadow-2xl relative z-10 text-center flex flex-col gap-6">
        
        {/* Brand Icon Header */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-3xl font-semibold animate-pulse">
              lock
            </span>
          </div>
          <h2 className="font-display-lg text-2xl font-extrabold text-on-surface">
            Admin Console Access
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 max-w-xs">
            Authenticate to modify B.Pharm portfolio collections and view inbox message logs.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
              Access Key
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-4 border rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors ${
                error ? "border-error" : "border-outline-variant"
              }`}
              placeholder="••••••••••••"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-error/5 border border-error/20 text-error rounded-lg font-body-sm text-body-sm font-semibold text-left flex items-start gap-2 animate-[fadeIn_0.3s_ease-out]">
              <span className="material-symbols-outlined text-lg mt-0.5 flex-shrink-0">warning</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md uppercase tracking-widest font-bold shadow-md hover:bg-primary-container disabled:bg-outline-variant disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && (
              <span className="material-symbols-outlined animate-spin text-lg">sync</span>
            )}
            {loading ? "Authenticating..." : "Unlock Console"}
          </button>
        </form>

        <p className="text-[11px] text-on-surface-variant/70 italic">
          Password can be updated inside the .env.local configuration file.
        </p>

      </div>
    </div>
  );
}
