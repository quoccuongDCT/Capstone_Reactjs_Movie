import { Play, Calendar, Clock } from "lucide-react"


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MlilAhTtPmYea53OGhTsBNo5wKa5Bh.png"
          alt="Hero background"
          // fill
          className="object-cover"
          // priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <p className="text-yellow-400 font-semibold mb-4">Movflix</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Unlimited <span className="text-yellow-400">Movie</span>, TVs Shows, & More.
          </h1>

          {/* Movie Info */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-3 py-1 border-2 border-yellow-400 text-yellow-400 text-sm font-semibold rounded">
              PG 18
            </span>
            <span className="px-3 py-1 border-2 border-yellow-400 text-yellow-400 text-sm font-semibold rounded">
              HD
            </span>
            <span className="text-gray-300">Romance, Drama</span>
            <div className="flex items-center gap-2 text-yellow-400">
              <Calendar className="w-4 h-4" />
              <span>2022</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <Clock className="w-4 h-4" />
              <span>128 min</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="flex items-center gap-3 px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-slate-900 transition-all font-semibold text-lg group">
            <Play className="w-5 h-5 fill-current" />
            WATCH NOW
          </button>
        </div>
      </div>
    </section>
  )
}
