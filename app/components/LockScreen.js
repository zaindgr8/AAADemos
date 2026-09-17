"use client";

import React, { useState } from "react";
import { authenticateForm } from "@/lib/forms";

export default function LockScreen({ fixedForm, onUnlock }) {
  const [username, setUsername] = useState(fixedForm ? fixedForm.username : "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(false);

    const userToVerify = fixedForm ? fixedForm.username : username;
    const authenticated = authenticateForm(userToVerify, password);

    if (authenticated) {
      if (fixedForm && authenticated.id !== fixedForm.id) {
        // Entered credentials belong to a different form than the fixed route
        setError("These credentials belong to a different form.");
        triggerShake();
        return;
      }
      onUnlock(authenticated);
    } else {
      setError("Invalid username or password. Please try again.");
      triggerShake();
    }
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "white",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "448px",
          margin: "0 auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className={`space-y-8 transition-transform ${
            shake ? "animate-bounce" : ""
          }`}
        >
          {/* Lock Icon & Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 border border-gray-200 mb-4 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-light text-black mb-2 tracking-wide uppercase">
              {fixedForm ? fixedForm.title : "PORTAL ACCESS"}
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
              {fixedForm ? "Restricted Access Form" : "Enter credentials to unlock"}
            </p>
            <div className="w-12 h-px bg-black mx-auto"></div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {!fixedForm && (
              <div>
                <label
                  htmlFor="portal-username"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Username
                </label>
                <input
                  id="portal-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter assigned username"
                  autoComplete="username"
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="portal-password"
                className="block text-sm font-medium text-black mb-2"
              >
                Password
              </label>
              <input
                id="portal-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center p-3 bg-red-50 border border-red-200">
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-black text-white font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors cursor-pointer"
          >
            Unlock Form
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          paddingTop: "24px",
          paddingBottom: "24px",
          borderTop: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
          Powered by{" "}
          <a
            href="https://devmatesolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#374151", textDecoration: "underline" }}
          >
            devmatesolutions.com
          </a>
        </p>
        <p style={{ fontSize: "12px", color: "#6b7280" }}>
          Join the AI Movement —{" "}
          <a
            href="https://aifounderhub.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#374151", textDecoration: "underline" }}
          >
            aifounderhub.com
          </a>
        </p>
      </footer>
    </div>
  );
}
