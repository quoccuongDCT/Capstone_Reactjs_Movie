import { useState, useEffect } from "react"
import MovieGrid from "./movie-grid"
import { movieAPI } from "../lib/api"

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const data = await movieAPI.getMovies()
        console.log("[v0] Fetched top rated movies:", data)

        // Transform API data and sort by rating
        const transformedMovies = data
          .sort((a, b) => (b.danhGia || 0) - (a.danhGia || 0))
          .slice(0, 4)
          .map((movie) => ({
            title: movie.tenPhim,
            poster: movie.hinhAnh,
            quality: movie.hot ? "4K" : "HD",
            duration: "128 min",
            rating: movie.danhGia || "3.5",
            year: new Date(movie.ngayKhoiChieu).getFullYear().toString(),
          }))

        setMovies(transformedMovies)
      } catch (err) {
        console.error("[v0] Error loading top rated movies:", err)
        // Fallback to static data
        setMovies([
          {
            title: "Women's Day",
            poster: "/women-s-day-movie-poster-red-orange-silhouette.jpg",
            quality: "HD",
            duration: "128 min",
            rating: "3.5",
            year: "2022",
          },
          {
            title: "The Perfect Match",
            poster: "/the-perfect-match-movie-poster-woman-volleyball.jpg",
            quality: "2K",
            duration: "128 min",
            rating: "3.5",
            year: "2022",
          },
          {
            title: "The Dog Woof",
            poster: "/dog-movie-poster-yellow-background-happy-dog.jpg",
            quality: "4K",
            duration: "128 min",
            rating: "3.5",
            year: "2021",
          },
          {
            title: "The Easy Reach",
            poster: "/kerala-beach-cartoon-character-coconut-tree.jpg",
            quality: "4K",
            duration: "128 min",
            rating: "3.5",
            year: "2021",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-yellow-400 text-xl">Loading top rated movies...</div>
        </div>
      </section>
    )
  }

  return (
    <MovieGrid
      title="Top Rated Movies"
      subtitle="ONLINE STREAMING"
      categories={["TV SHOWS", "MOVIES", "DOCUMENTARY", "SPORTS"]}
      movies={movies}
      buttonVariant="border-left"
    />
  )
}
