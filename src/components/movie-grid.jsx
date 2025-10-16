import { Clock, ThumbsUp } from "lucide-react"
import { getImageUrl } from "../lib/utils.js"

export default function MovieGrid({ title, subtitle, categories, movies, buttonVariant = "outline" }) {
  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm font-semibold mb-2 uppercase tracking-wider">{subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{title}</h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={
                  index === 0 && buttonVariant === "outline"
                    ? "px-6 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400 hover:text-slate-900 transition-all"
                    : index === 0 && buttonVariant === "border-left"
                      ? "px-6 py-2 bg-slate-800 text-yellow-400 rounded border-l-4 border-yellow-400 font-semibold"
                      : "px-6 py-2 bg-slate-800 text-white rounded hover:text-yellow-400 transition-colors font-semibold"
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] mb-4 rounded-lg overflow-hidden bg-slate-800">
                <img
                  src={getImageUrl(movie.poster) || "/placeholder.svg"}
                  alt={movie.title}
                  
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg"
                  }}
                />
              </div>

              {/* Movie Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                  <span className="text-yellow-400 font-semibold">{movie.year}</span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="px-2 py-1 border border-yellow-400 text-yellow-400 text-xs font-semibold rounded">
                    {movie.quality}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{movie.rating}</span>
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
