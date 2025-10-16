 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { movieAPI } from "../../lib/api"

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async (maNhom = "GP01") => {
  const response = await movieAPI.getMovies(maNhom)
  return response.content || response
})

export const fetchBanners = createAsyncThunk("movie/fetchBanners", async () => {
  const response = await movieAPI.getBanners()
  return response.content || response
})

export const fetchMovieDetail = createAsyncThunk("movie/fetchMovieDetail", async (maPhim) => {
  const response = await movieAPI.getMovieSchedule(maPhim)
  return response.content || response
})

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    banners: [],
    movieDetail: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMovieDetail: (state) => {
      state.movieDetail = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload
      })
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false
        state.movieDetail = action.payload
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearMovieDetail } = movieSlice.actions
export default movieSlice.reducer
