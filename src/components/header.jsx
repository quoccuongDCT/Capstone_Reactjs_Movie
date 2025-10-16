"use client"

import { Search, Globe } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" className="text-slate-900" />
                <circle cx="9" cy="9" r="2" className="text-slate-900" fill="currentColor" />
                <circle cx="15" cy="9" r="2" className="text-slate-900" fill="currentColor" />
                <circle cx="12" cy="15" r="2" className="text-slate-900" fill="currentColor" />
                <circle cx="9" cy="15" r="1" className="text-slate-900" fill="currentColor" />
                <circle cx="15" cy="15" r="1" className="text-slate-900" fill="currentColor" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold">Movflix</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors">
              HOMEONE
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors">
              MOVIE
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors">
              TV SHOW
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors">
              PRICING
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors">
              BLOG
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition-colors">
              CONTACTS
            </a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-yellow-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors">
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline">EN</span>
            </button>
            <button className="px-6 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-slate-900 transition-all font-semibold">
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
