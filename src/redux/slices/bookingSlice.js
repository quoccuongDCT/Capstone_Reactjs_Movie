import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { bookingAPI } from "../../lib/api"

export const fetchRoomSeats = createAsyncThunk("booking/fetchRoomSeats", async (maLichChieu) => {
  const response = await bookingAPI.getRoomSeats(maLichChieu)
  return response.content || response
})

export const bookTickets = createAsyncThunk("booking/bookTickets", async (bookingData) => {
  const response = await bookingAPI.bookTicket(bookingData)
  return response
})

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    roomInfo: null,
    selectedSeats: [],
    loading: false,
    error: null,
    bookingSuccess: false,
  },
  reducers: {
    selectSeat: (state, action) => {
      const seat = action.payload
      const index = state.selectedSeats.findIndex((s) => s.maGhe === seat.maGhe)
      if (index >= 0) {
        state.selectedSeats.splice(index, 1)
      } else {
        state.selectedSeats.push(seat)
      }
    },
    clearSelectedSeats: (state) => {
      state.selectedSeats = []
    },
    resetBooking: (state) => {
      state.roomInfo = null
      state.selectedSeats = []
      state.bookingSuccess = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomSeats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRoomSeats.fulfilled, (state, action) => {
        state.loading = false
        state.roomInfo = action.payload
      })
      .addCase(fetchRoomSeats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(bookTickets.pending, (state) => {
        state.loading = true
      })
      .addCase(bookTickets.fulfilled, (state) => {
        state.loading = false
        state.bookingSuccess = true
        state.selectedSeats = []
      })
      .addCase(bookTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { selectSeat, clearSelectedSeats, resetBooking } = bookingSlice.actions
export default bookingSlice.reducer
