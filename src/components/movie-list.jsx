"use client"

import { useSelector } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom"

import { Play, Star } from "lucide-react"
import { Button } from "./ui/button"

export default function MovieList() {
    const { movies, loading } = useSelector((state) => state.movie)
    const [imageErrors, setImageErrors] = useState({})

    const handleImageError = (movieId) => {
        setImageErrors((prev) => ({ ...prev, [movieId]: true }))
    }

    if (loading) {
        return (
            <section id="movies" className="py-16 bg-slate-900">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-yellow-400 text-xl">Loading movies...</div>
                </div>
            </section>
        )
    }

    return (
        <section id="movies" className="py-16 bg-slate-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-yellow-400 font-semibold mb-2">ONLINE STREAMING</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Now Showing Movies</h2>
                </div>

                {/* Movie Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {movies.slice(0, 8).map((movie) => {
                        const movieImage = imageErrors[movie.maPhim] ? "/abstract-movie-poster.png" : movie.hinhAnh

                        return (
                            <Link
                                key={movie.maPhim}
                                href={`/detail/${movie.maPhim}`}
                                className="group relative bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400 transition-all"
                            >
                                {/* Movie Poster */}
                                <div className="relative aspect-[2/3] overflow-hidden">
                                    <Image
                                        src={movieImage || "/placeholder.svg?height=450&width=300&query=movie+poster"}
                                        alt={movie.tenPhim}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={() => handleImageError(movie.maPhim)}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <Play className="w-8 h-8 text-slate-900 fill-current" />
                                        </div>
                                    </div>

                                    {/* Quality Badge */}
                                    {movie.hot && (
                                        <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded">
                                            HOT
                                        </div>
                                    )}
                                </div>

                                {/* Movie Info */}
                                <div className="p-4">
                                    <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{movie.tenPhim}</h3>
                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <span>{new Date(movie.ngayKhoiChieu).getFullYear()}</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-yellow-400">{movie.danhGia || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* View More Button */}
                <div className="text-center">
                    <Button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full font-semibold">
                        VIEW MORE MOVIES
                    </Button>
                </div>
            </div>
        </section>
    )
}
