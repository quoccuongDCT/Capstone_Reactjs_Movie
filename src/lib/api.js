import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// API endpoints
export const movieAPI = {
  // Get all movies
  getMovies: async () => {
    try {
      const response = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
      return response.data
    } catch (error) {
      console.error("[v0] Error fetching movies:", error)
      throw error
    }
  },

  // Get movie by ID
  getMovieById: async (id) => {
    try {
      const response = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
      return response.data
    } catch (error) {
      console.error("[v0] Error fetching movie by ID:", error)
      throw error
    }
  },

  // Get banner list
  getBanners: async () => {
    try {
      const response = await api.get("/QuanLyPhim/LayDanhSachBanner")
      return response.data
    } catch (error) {
      console.error("[v0] Error fetching banners:", error)
      throw error
    }
  },

  // Get movie list by type (upcoming, showing, etc.)
  getMoviesByType: async (type = "GP01") => {
    try {
      const response = await api.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${type}`)
      return response.data
    } catch (error) {
      console.error("[v0] Error fetching movies by type:", error)
      throw error
    }
  },
}

export default api
