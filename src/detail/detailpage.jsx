"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchMovieDetail, clearMovieDetail } from "./../redux/slices/movieSlice"
import Header from "./../components/header.jsx"
import Footer from "./../components/footer.jsx"
import MovieDetailContent from "./../components/movie-detail-content.jsx"

export default function MovieDetailPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const { movieDetail, loading, error } = useSelector((state) => state.movie)

  useEffect(() => {
    if (params.id) {
      dispatch(fetchMovieDetail(params.id))
    }

    return () => {
      dispatch(clearMovieDetail())
    }
  }, [dispatch, params.id])

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-20">
        {loading && (
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-yellow-400 text-xl">Loading movie details...</div>
          </div>
        )}
        {error && (
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-red-500 text-xl">Error: {error}</div>
          </div>
        )}
        {movieDetail && <MovieDetailContent movie={movieDetail} />}
      </div>
      <Footer />
    </div>
  )
}
