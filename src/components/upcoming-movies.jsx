
import { useState, useEffect } from "react"
import MovieGrid from "./movie-grid"
import { movieAPI } from "../lib/api"

export default function UpcomingMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        let data = await movieAPI.getMovies()
        // If data is not an array, try to get the array from .content
        if (!Array.isArray(data) && Array.isArray(data?.content)) {
          data = data.content
        }
        if (!Array.isArray(data)) {
          throw new Error("Movies data is not an array")
        }

        // Transform API data to match component format
        const transformedMovies = data.slice(0, 4).map((movie) => ({
          title: movie.tenPhim,
          poster: movie.hinhAnh,
          quality: movie.hot ? "4K" : "HD",
          duration: "128 min",
          rating: movie.danhGia || "3.5",
          year: new Date(movie.ngayKhoiChieu).getFullYear().toString(),
        }))

        setMovies(transformedMovies)
        setError(null)
      } catch (err) {
        console.error("test Error loading movies:", err)
        setError("Failed to load movies")
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
          <div className="text-yellow-400 text-xl">Loading movies...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-red-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl">Error: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <MovieGrid
      title="Upcoming Movies"
      subtitle="ONLINE STREAMING"
      categories={["TV Shows", "documentary", "Movies", "sports"]}
      movies={movies}
      buttonVariant="outline"
    />
  )
}
