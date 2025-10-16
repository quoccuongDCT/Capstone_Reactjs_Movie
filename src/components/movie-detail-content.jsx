"use client"


import { Link } from "react-router-dom"
import { Play, Star, Calendar } from "lucide-react"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { format } from "date-fns"

export default function MovieDetailContent({ movie }) {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-[60vh] flex items-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={movie.hinhAnh || "/placeholder.svg?height=1080&width=1920"}
                        alt={movie.tenPhim}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/50" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
                        {/* Movie Poster */}
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src={movie.hinhAnh || "/placeholder.svg?height=450&width=300"}
                                alt={movie.tenPhim}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Movie Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{movie.tenPhim}</h1>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="text-yellow-400 font-semibold text-lg">{movie.danhGia || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Calendar className="w-4 h-4" />
                                        <span>{format(new Date(movie.ngayKhoiChieu), "MMM dd, yyyy")}</span>
                                    </div>
                                    {movie.hot && (
                                        <span className="px-3 py-1 bg-yellow-400 text-slate-900 text-sm font-bold rounded">HOT</span>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed">{movie.moTa}</p>

                            <Button className="flex items-center gap-3 px-8 py-6 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full font-semibold text-lg">
                                <Play className="w-5 h-5 fill-current" />
                                WATCH TRAILER
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Showtimes Section */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-white mb-8">Showtimes & Tickets</h2>

                {movie.heThongRapChieu && movie.heThongRapChieu.length > 0 ? (
                    <Tabs defaultValue={movie.heThongRapChieu[0].maHeThongRap} className="w-full">
                        <TabsList className="bg-slate-800 border-slate-700 mb-6 flex-wrap h-auto">
                            {movie.heThongRapChieu.map((heThong) => (
                                <TabsTrigger
                                    key={heThong.maHeThongRap}
                                    value={heThong.maHeThongRap}
                                    className="data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900"
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={heThong.logo || "/placeholder.svg?height=30&width=30"}
                                            alt={heThong.tenHeThongRap}
                                            width={30}
                                            height={30}
                                            className="rounded"
                                        />
                                        <span>{heThong.tenHeThongRap}</span>
                                    </div>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {movie.heThongRapChieu.map((heThong) => (
                            <TabsContent key={heThong.maHeThongRap} value={heThong.maHeThongRap}>
                                <div className="space-y-6">
                                    {heThong.cumRapChieu &&
                                        heThong.cumRapChieu.map((cumRap) => (
                                            <div key={cumRap.maCumRap} className="bg-slate-800 rounded-lg p-6">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <Image
                                                        src={cumRap.hinhAnh || "/placeholder.svg?height=60&width=60"}
                                                        alt={cumRap.tenCumRap}
                                                        width={60}
                                                        height={60}
                                                        className="rounded"
                                                    />
                                                    <div>
                                                        <h3 className="text-white font-semibold text-lg">{cumRap.tenCumRap}</h3>
                                                        <p className="text-gray-400 text-sm">{cumRap.diaChi}</p>
                                                    </div>
                                                </div>

                                                {cumRap.lichChieuPhim && cumRap.lichChieuPhim.length > 0 ? (
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                                        {cumRap.lichChieuPhim.map((lichChieu) => (
                                                            <Link
                                                                key={lichChieu.maLichChieu}
                                                                href={`/ticketroom/${lichChieu.maLichChieu}`}
                                                                className="group"
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 bg-transparent"
                                                                >
                                                                    <div className="text-center">
                                                                        <div className="font-semibold">
                                                                            {format(new Date(lichChieu.ngayChieuGioChieu), "HH:mm")}
                                                                        </div>
                                                                        <div className="text-xs">
                                                                            {format(new Date(lichChieu.ngayChieuGioChieu), "dd/MM")}
                                                                        </div>
                                                                    </div>
                                                                </Button>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-400">No showtimes available</p>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                ) : (
                    <div className="bg-slate-800 rounded-lg p-8 text-center">
                        <p className="text-gray-400 text-lg">No showtimes available for this movie yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
