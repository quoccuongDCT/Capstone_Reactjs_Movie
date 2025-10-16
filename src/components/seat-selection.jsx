"use client"

import { useDispatch, useSelector } from "react-redux"
import { selectSeat, bookTickets, clearSelectedSeats } from "../redux/slices/bookingSlice"
// import { Button } from "./ui/button"
import { Armchair, X } from "lucide-react"


export default function SeatSelection({ roomInfo, maLichChieu }) {
    const dispatch = useDispatch()
    const { selectedSeats } = useSelector((state) => state.booking)
    const { user } = useSelector((state) => state.auth)

    const handleSeatClick = (seat) => {
        if (!seat.daDat) {
            dispatch(selectSeat(seat))
        }
    }

    const handleBooking = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat")
            return
        }

        const bookingData = {
            maLichChieu: Number.parseInt(maLichChieu),
            danhSachVe: selectedSeats.map((seat) => ({
                maGhe: seat.maGhe,
                giaVe: seat.giaVe,
            })),
            taiKhoanNguoiDung: user.taiKhoan,
        }

        dispatch(bookTickets(bookingData))
    }

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.giaVe, 0)

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Movie Info */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                    <img
                        src={roomInfo.thongTinPhim?.hinhAnh || "/placeholder.svg?height=150&width=100"}
                        alt={roomInfo.thongTinPhim?.tenPhim}
                        width={100}
                        height={150}
                        className="rounded"
                    />
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white mb-2">{roomInfo.thongTinPhim?.tenPhim}</h1>
                        <div className="text-gray-400 space-y-1">
                            <p>
                                <span className="text-yellow-400">Theater:</span> {roomInfo.thongTinPhim?.tenCumRap}
                            </p>
                            <p>
                                <span className="text-yellow-400">Address:</span> {roomInfo.thongTinPhim?.diaChi}
                            </p>
                            <p>
                                <span className="text-yellow-400">Showtime:</span> {roomInfo.thongTinPhim?.ngayChieu} -{" "}
                                {roomInfo.thongTinPhim?.gioChieu}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-[1fr,350px] gap-8">
                {/* Seat Map */}
                <div>
                    {/* Screen */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 h-2 rounded-t-full mb-2" />
                        <p className="text-center text-gray-400 text-sm">SCREEN</p>
                    </div>

                    {/* Seats */}
                    <div className="space-y-2">
                        {roomInfo.danhSachGhe &&
                            Array.from(new Set(roomInfo.danhSachGhe.map((seat) => seat.stt))).map((row) => (
                                <div key={row} className="flex items-center gap-2">
                                    <span className="text-yellow-400 font-semibold w-8 text-center">{row}</span>
                                    <div className="flex gap-2 flex-wrap">
                                        {roomInfo.danhSachGhe
                                            .filter((seat) => seat.stt === row)
                                            .map((seat) => {
                                                const isSelected = selectedSeats.some((s) => s.maGhe === seat.maGhe)
                                                const isBooked = seat.daDat
                                                const isVIP = seat.loaiGhe === "Vip"

                                                return (
                                                    <button
                                                        key={seat.maGhe}
                                                        onClick={() => handleSeatClick(seat)}
                                                        disabled={isBooked}
                                                        className={`w-10 h-10 rounded-t-lg flex items-center justify-center transition-all ${isBooked
                                                            ? "bg-slate-600 cursor-not-allowed"
                                                            : isSelected
                                                                ? "bg-yellow-400 text-slate-900"
                                                                : isVIP
                                                                    ? "bg-pink-600 hover:bg-pink-500 text-white"
                                                                    : "bg-slate-700 hover:bg-slate-600 text-white"
                                                            }`}
                                                        title={`Seat ${seat.tenGhe} - ${seat.giaVe.toLocaleString()} VND`}
                                                    >
                                                        <Armchair className="w-5 h-5" />
                                                    </button>
                                                )
                                            })}
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Legend */}
                    <div className="mt-8 flex flex-wrap gap-6 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-700 rounded-t-lg flex items-center justify-center">
                                <Armchair className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-400">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-pink-600 rounded-t-lg flex items-center justify-center">
                                <Armchair className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-400">VIP</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-yellow-400 rounded-t-lg flex items-center justify-center">
                                <Armchair className="w-5 h-5 text-slate-900" />
                            </div>
                            <span className="text-gray-400">Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-600 rounded-t-lg flex items-center justify-center">
                                <Armchair className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-400">Booked</span>
                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-slate-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Booking Summary</h2>

                        {/* Selected Seats */}
                        <div className="mb-6">
                            <h3 className="text-yellow-400 font-semibold mb-2">Selected Seats</h3>
                            {selectedSeats.length > 0 ? (
                                <div className="space-y-2">
                                    {selectedSeats.map((seat) => (
                                        <div key={seat.maGhe} className="flex items-center justify-between text-gray-300">
                                            <span>
                                                {seat.tenGhe} ({seat.loaiGhe})
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span>{seat.giaVe.toLocaleString()} VND</span>
                                                <button onClick={() => dispatch(selectSeat(seat))} className="text-red-500 hover:text-red-400">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">No seats selected</p>
                            )}
                        </div>

                        {/* Total */}
                        <div className="border-t border-slate-700 pt-4 mb-6">
                            <div className="flex items-center justify-between text-lg">
                                <span className="text-white font-semibold">Total</span>
                                <span className="text-yellow-400 font-bold">{totalPrice.toLocaleString()} VND</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button
                                onClick={handleBooking}
                                disabled={selectedSeats.length === 0}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-6"
                            >
                                BOOK TICKETS
                            </Button>
                            <Button
                                onClick={() => dispatch(clearSelectedSeats())}
                                variant="outline"
                                className="w-full border-slate-600 text-gray-300 hover:bg-slate-700"
                            >
                                CLEAR SELECTION
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
