import { Search, Facebook, Twitter, Paintbrush as Pinterest, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          {/* Left: Logo and Navigation */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" className="text-slate-900" />
                  <circle cx="9" cy="9" r="2" className="text-slate-900" fill="currentColor" />
                  <circle cx="15" cy="9" r="2" className="text-slate-900" fill="currentColor" />
                  <circle cx="12" cy="15" r="2" className="text-slate-900" fill="currentColor" />
                </svg>
              </div>
              <span className="text-white text-xl font-bold">Movflix</span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap items-center gap-6">
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                HOME
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                MOVIE
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                TV SHOW
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                PAGES
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                PRICING
              </a>
            </nav>
          </div>

          {/* Right: Search */}
          <div className="flex justify-end">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Find Favorite Movie"
                className="w-full px-4 py-2 bg-slate-800 text-white rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Search className="w-4 h-4 text-slate-900" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                FAQ
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                HELP CENTER
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                TERMS OF USE
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                PRIVACY
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Pinterest className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
