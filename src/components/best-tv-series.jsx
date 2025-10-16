import { useState, useEffect } from "react"
import { Clock, ThumbsUp } from "lucide-react"
import { movieAPI } from "../lib/api"

export default function BestTVSeries() {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true)
        let data = await movieAPI.getMovies()
        // Ensure data is an array
        if (!Array.isArray(data) && Array.isArray(data?.content)) {
          data = data.content
        }
        if (!Array.isArray(data)) {
          throw new Error("TV series data is not an array")
        }
        // Transform API data for TV series
        const transformedSeries = data.slice(4, 8).map((movie) => ({
          title: movie.tenPhim,
          poster: movie.hinhAnh,
          quality: movie.hot ? "4K" : "HD",
          duration: "128 min",
          rating: movie.danhGia || "3.5",
          year: new Date(movie.ngayKhoiChieu).getFullYear().toString(),
        }))

        setSeries(transformedSeries)
      } catch (err) {
        console.error("test Error loading TV series:", err)
        // Fallback to static data
        setSeries([
          {
            title: "Women's Day",
            poster: "/womens-day-tv-series-colorful-sunglasses.jpg",
            quality: "HD",
            duration: "128 min",
            rating: "3.5",
            year: "2022",
          },
          {
            title: "The Perfect Match",
            poster: "/black-friday-sale-tomato-soup-hoodie.jpg",
            quality: "4K",
            duration: "128 min",
            rating: "3.5",
            year: "2022",
          },
          {
            title: "The Dog Woof",
            poster: "/dog-movie-poster-yellow-background-happy-dog.jpg",
            quality: "HD",
            duration: "128 min",
            rating: "3.5",
            year: "2022",
          },
          {
            title: "The Easy Reach",
            poster: "/kerala-beach-cartoon-character-coconut-tree.jpg",
            quality: "HD",
            duration: "128 min",
            rating: "3.5",
            year: "2022",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSeries()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-yellow-400 text-xl">Loading TV series...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm font-semibold mb-2 uppercase tracking-wider">BEST TV SERIES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">World Best TV Series</h2>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {series.map((show, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Poster */}
              <div className="relative aspect-[2/3] mb-4 rounded-lg overflow-hidden">
                <img
                  src={show.poster || "/placeholder.svg"}
                  alt={show.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg group-hover:text-yellow-400 transition-colors">
                    {show.title}
                  </h3>
                  <span className="text-yellow-400 font-semibold">{show.year}</span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="px-2 py-1 border border-yellow-400 text-yellow-400 text-xs font-semibold rounded">
                    {show.quality}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{show.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{show.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
