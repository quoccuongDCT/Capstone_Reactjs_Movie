"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchRoomSeats, resetBooking } from "./../redux/slices/bookingSlice"
import { AuthGuard } from "./../components/auth-guard.jsx"
import Header from "./../components/header.jsx"
import Footer from "./../components/footer.jsx"
import SeatSelection from "./../components/seat-selection.jsx"

function TicketRoomContent() {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const { roomInfo, loading, error, bookingSuccess } = useSelector((state) => state.booking)

  useEffect(() => {
    if (params.idShowTime) {
      dispatch(fetchRoomSeats(params.idShowTime))
    }

    return () => {
      dispatch(resetBooking())
    }
  }, [dispatch, params.idShowTime])

  useEffect(() => {
    if (bookingSuccess) {
      alert("Booking successful!")
      navigate("/profile")
    }
  }, [bookingSuccess, navigate])

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-20">
        {loading && (
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-yellow-400 text-xl">Loading seats...</div>
          </div>
        )}
        {error && (
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-red-500 text-xl">Error: {error}</div>
          </div>
        )}
        {roomInfo && <SeatSelection roomInfo={roomInfo} maLichChieu={params.idShowTime} />}
      </div>
      <Footer />
    </div>
  )
}

export default function TicketRoomPage() {
  return (
    <AuthGuard requireAuth={true}>
      <TicketRoomContent />
    </AuthGuard>
  )
}
