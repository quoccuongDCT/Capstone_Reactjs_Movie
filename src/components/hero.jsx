import { useState, useEffect } from "react"
import { Play, Calendar, Clock } from "lucide-react"
import { movieAPI } from "../lib/api"

export default function Hero() {
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        setLoading(true)
        const data = await movieAPI.getMovies()
        // console.log("test Fetched featured movie:", data[0])

        if (data && data.length > 0) {
          const movie = data.content[0]
          setFeaturedMovie({
            title: movie.tenPhim,
            poster: movie.hinhAnh,
            description: movie.moTa,
            year: new Date(movie.ngayKhoiChieu).getFullYear(),
            rating: movie.danhGia,
          })
        }
      } catch (err) {
        console.error("test Error loading featured movie:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedMovie()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={
            featuredMovie?.poster ||
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MlilAhTtPmYea53OGhTsBNo5wKa5Bh.png"
          }
          alt="Hero background"
          className="object-cover"
          priority="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <p className="text-yellow-400 font-semibold mb-4">Movflix</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {loading ? (
              <>
                Unlimited <span className="text-yellow-400">Movie</span>, TVs Shows, & More.
              </>
            ) : (
              <>
                Unlimited <span className="text-yellow-400">{featuredMovie?.title || "Movie"}</span>, TVs Shows, & More.
              </>
            )}
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
              <span>{featuredMovie?.year || "2022"}</span>
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
