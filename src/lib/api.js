import axios from "axios"
const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY",
  },
  timeout: 100000, // Added 10 second timeout
})

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("USER_TOKEN")
  }
  return null
}

api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    console.log("test API Response:", response.status, response.config.url)
    return response
  },
  (error) => {
    console.error("test API Response Error:", error.message)
    if (error.response) {
      console.error("test Error Status:", error.response.status)
      console.error("test Error Data:", error.response.data)
    }
    return Promise.reject(error)
  },
)

// API endpoints
export const movieAPI = {
  // Get all movies
  getMovies: async (maNhom = "GP01") => {
    const response = await api.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`)
    return response.data
  },

  // Get movie by ID
  getMovieById: async (id) => {
    const response = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
    return response.data
  },

  // Get banner list
  getBanners: async () => {
    const response = await api.get("/QuanLyPhim/LayDanhSachBanner")
    return response.data
  },

  // Get movie list by type (upcoming, showing, etc.)
  getMoviesByType: async (type = "GP01") => {
    const response = await api.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${type}`)
    return response.data
  },

  getMovieSchedule: async (maPhim) => {
    const response = await api.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    return response.data
  },

  addMovie: async (formData) => {
    const response = await api.post("/QuanLyPhim/ThemPhimUploadHinh", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  updateMovie: async (formData) => {
    const response = await api.post("/QuanLyPhim/CapNhatPhimUpload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  deleteMovie: async (maPhim) => {
    const response = await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    return response.data
  },
}

export const bookingAPI = {
  getRoomSeats: async (maLichChieu) => {
    const response = await api.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    return response.data
  },

  bookTicket: async (bookingData) => {
    const response = await api.post("/QuanLyDatVe/DatVe", bookingData)
    return response.data
  },

  createShowtime: async (showtimeData) => {
    const response = await api.post("/QuanLyDatVe/TaoLichChieu", showtimeData)
    return response.data
  },
}

export const userAPI = {
  register: async (userData) => {
    const response = await api.post("/QuanLyNguoiDung/DangKy", userData)
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post("/QuanLyNguoiDung/DangNhap", credentials)
    return response.data
  },

  getUserInfo: async () => {
    const response = await api.post("/QuanLyNguoiDung/ThongTinTaiKhoan")
    return response.data
  },

  updateUserInfo: async (userData) => {
    const response = await api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userData)
    return response.data
  },

  getUsers: async (maNhom = "GP01", keyword = "") => {
    const response = await api.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${keyword}`)
    return response.data
  },

  addUser: async (userData) => {
    const response = await api.post("/QuanLyNguoiDung/ThemNguoiDung", userData)
    return response.data
  },

  deleteUser: async (taiKhoan) => {
    const response = await api.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    return response.data
  },
}

export default api
