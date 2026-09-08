"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);
    const form = e.target;
    const name = form.name.value;
    const country = form.country.value;
    const contact = form.contact.value;

    // Prepare the data to send
    const dataToSend = { name, country, contact };
    console.log("Sending data to webhook:", dataToSend);

    try {
      const res = await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();
      console.log("Webhook response status:", res.status);
      console.log("Webhook response:", result);

      if (res.ok && result.success) {
        console.log("✅ Data successfully sent to webhook!");
        setSuccess(true);
        form.reset();
      } else {
        console.error(
          "❌ Webhook returned error:",
          result.error || `Status ${res.status}`
        );
        setError(true);
      }
    } catch (error) {
      console.error("❌ Error sending data to webhook:", error);
      setError(true);
    }
    setLoading(false);
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="animate-pulse space-y-8">
            <div className="text-center">
              <div className="h-6 bg-gray-200 w-24 mx-auto mb-2"></div>
              <div className="h-px bg-gray-200 w-12 mx-auto"></div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="h-4 bg-gray-200 w-12 mb-2"></div>
                <div className="h-12 bg-gray-200 w-full"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 w-24 mb-2"></div>
                <div className="flex gap-3">
                  <div className="h-12 bg-gray-200 w-16"></div>
                  <div className="h-12 bg-gray-200 flex-1"></div>
                </div>
              </div>
            </div>
            <div className="h-12 bg-gray-200 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", flexDirection: "column", padding: "16px" }}>
      <div style={{ width: "100%", maxWidth: "448px", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-light text-black mb-2">
             PEARLSHIRE DEVELOPERS - DEMO
            </h1>
            <div className="w-12 h-px bg-black mx-auto"></div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-black mb-2"
              >
                Phone Number
              </label>
              <div className="flex gap-3">
                <select
                  name="country"
                  className="px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-black focus:outline-none focus:border-black transition-colors"
                  defaultValue="971"
                >
                  {/* GCC Countries */}
                  <option value="971">🇦🇪 UAE (+971)</option>
                  <option value="966">🇸🇦 Saudi Arabia (+966)</option>
                  <option value="965">🇰🇼 Kuwait (+965)</option>
                  <option value="974">🇶🇦 Qatar (+974)</option>
                  <option value="973">🇧🇭 Bahrain (+973)</option>
                  <option value="968">🇴🇲 Oman (+968)</option>

                  {/* Other Popular Countries */}
                  <option value="1">🇺🇸 USA (+1)</option>
                  <option value="44">🇬🇧 UK (+44)</option>
                  <option value="92">🇵🇰 Pakistan (+92)</option>
                  <option value="91">🇮🇳 India (+91)</option>
                  <option value="86">🇨🇳 China (+86)</option>
                  <option value="81">🇯🇵 Japan (+81)</option>
                  <option value="49">🇩🇪 Germany (+49)</option>
                  <option value="33">🇫🇷 France (+33)</option>
                  <option value="39">🇮🇹 Italy (+39)</option>
                  <option value="34">🇪🇸 Spain (+34)</option>
                  <option value="61">🇦🇺 Australia (+61)</option>
                  <option value="55">🇧🇷 Brazil (+55)</option>
                  <option value="52">🇲🇽 Mexico (+52)</option>
                  <option value="7">🇷🇺 Russia (+7)</option>
                  <option value="82">🇰🇷 South Korea (+82)</option>
                  <option value="31">🇳🇱 Netherlands (+31)</option>
                  <option value="46">🇸🇪 Sweden (+46)</option>
                  <option value="47">🇳🇴 Norway (+47)</option>
                  <option value="45">🇩🇰 Denmark (+45)</option>
                  <option value="41">🇨🇭 Switzerland (+41)</option>
                  <option value="43">🇦🇹 Austria (+43)</option>
                  <option value="32">🇧🇪 Belgium (+32)</option>
                  <option value="353">🇮🇪 Ireland (+353)</option>
                  <option value="351">🇵🇹 Portugal (+351)</option>
                  <option value="30">🇬🇷 Greece (+30)</option>
                  <option value="48">🇵🇱 Poland (+48)</option>
                  <option value="420">🇨🇿 Czech Republic (+420)</option>
                  <option value="36">🇭🇺 Hungary (+36)</option>
                  <option value="40">🇷🇴 Romania (+40)</option>
                  <option value="359">🇧🇬 Bulgaria (+359)</option>
                  <option value="385">🇭🇷 Croatia (+385)</option>
                  <option value="386">🇸🇮 Slovenia (+386)</option>
                  <option value="421">🇸🇰 Slovakia (+421)</option>
                  <option value="370">🇱🇹 Lithuania (+370)</option>
                  <option value="371">🇱🇻 Latvia (+371)</option>
                  <option value="372">🇪🇪 Estonia (+372)</option>
                  <option value="358">🇫🇮 Finland (+358)</option>
                  <option value="354">🇮🇸 Iceland (+354)</option>
                  <option value="356">🇲🇹 Malta (+356)</option>
                  <option value="357">🇨🇾 Cyprus (+357)</option>
                  <option value="352">🇱🇺 Luxembourg (+352)</option>
                  <option value="423">🇱🇮 Liechtenstein (+423)</option>
                  <option value="378">🇸🇲 San Marino (+378)</option>
                  <option value="376">🇦🇩 Andorra (+376)</option>
                  <option value="377">🇲🇨 Monaco (+377)</option>
                </select>
                <input
                  id="contact"
                  type="tel"
                  name="contact"
                  required
                  placeholder="Phone number"
                  className="flex-1 px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-black text-white font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Submit"
            )}
          </button>

          {/* Success/Error Messages */}
          {success && (
            <div className="text-center">
              <p className="text-sm text-black">
                ✓ Thank you! We'll contact you soon.
              </p>
            </div>
          )}
          {error && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ✗ Something went wrong. Please try again.
              </p>
            </div>
          )}
        </form>

      </div>

      {/* Footer */}
      <footer style={{ width: "100%", paddingTop: "24px", paddingBottom: "24px", borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
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
