"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

export default function BannerCarousel() {
    const { banners, loading } = useSelector((state) => state.movie)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [imageErrors, setImageErrors] = useState({})

    useEffect(() => {
        if (banners.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % banners.length)
            }, 5000)
            return () => clearInterval(interval)
        }
    }, [banners.length])

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length)
    }

    const handleImageError = (bannerId) => {
        setImageErrors((prev) => ({ ...prev, [bannerId]: true }))
    }

    if (loading || banners.length === 0) {
        return (
            <section className="relative min-h-screen flex items-center pt-20 bg-slate-800">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-yellow-400 text-xl">Loading...</div>
                </div>
            </section>
        )
    }

    const currentBanner = banners[currentIndex]
    const bannerImage = imageErrors[currentBanner?.maBanner] ? "/generic-movie-banner.png" : currentBanner?.hinhAnh

    return (
        <section className="relative min-h-screen flex items-center pt-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bannerImage || "/placeholder.svg?height=1080&width=1920&query=movie+banner"}
                    alt={currentBanner?.tenPhim || "Banner"}
                    fill
                    className="object-cover"
                    priority
                    onError={() => handleImageError(currentBanner?.maBanner)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent" />
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/50 hover:bg-slate-900/80 text-white p-3 rounded-full transition-all"
                aria-label="Previous banner"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/50 hover:bg-slate-900/80 text-white p-3 rounded-full transition-all"
                aria-label="Next banner"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl">
                    <p className="text-yellow-400 font-semibold mb-4">Movflix</p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        {currentBanner?.tenPhim || "Unlimited Movies"}
                    </h1>

                    <p className="text-gray-300 text-lg mb-8 line-clamp-3">
                        {currentBanner?.moTa || "Watch unlimited movies, TV shows, and more."}
                    </p>

                    {/* CTA Button */}
                    <Button className="flex items-center gap-3 px-8 py-6 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full font-semibold text-lg">
                        <Play className="w-5 h-5 fill-current" />
                        WATCH NOW
                    </Button>
                </div>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-yellow-400 w-8" : "bg-white/50"
                            }`}
                        aria-label={`Go to banner ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
