"use client"

import { useState } from "react"

export default function TrialCTA() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email submitted:", email)
  }

  return (
    <section className="py-16 bg-yellow-400 relative overflow-hidden">
      {/* Dotted Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">TRIAL START FIRST 30 DAYS.</h2>
              <p className="text-slate-900">Enter your email to create or restart your membership.</p>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded bg-white text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                GET STARTED
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
