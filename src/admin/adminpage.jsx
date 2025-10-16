import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AuthGuard } from "../././components/auth-guard"
import Header from "../././components/header"
import Footer from "../././components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../././components/ui/tabs"
import { Button } from "../././components/ui/button"
import { Input } from "../././components/ui/input"
import { Label } from "../././components/ui/label"
import { Textarea } from "../././components/ui/textarea"
import { Film, Users, Trash2, Edit, Plus } from "lucide-react"
import { movieAPI, userAPI } from "../././lib/api"
import Image from "next/image"

function AdminContent() {
  const { user } = useSelector((state) => state.auth)
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddingMovie, setIsAddingMovie] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [movieForm, setMovieForm] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: true,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
    maNhom: "GP01",
  })

  useEffect(() => {
    fetchMovies()
    fetchUsers()
  }, [])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const data = await movieAPI.getMovies()
      setMovies(data)
    } catch (error) {
      console.error("Error fetching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const data = await userAPI.getUserList()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleMovieFormChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setMovieForm({
      ...movieForm,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    })
  }

  const handleAddMovie = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.keys(movieForm).forEach((key) => {
        if (movieForm[key] !== null) {
          formData.append(key, movieForm[key])
        }
      })

      await movieAPI.addMovie(formData)
      alert("Movie added successfully!")
      setIsAddingMovie(false)
      resetMovieForm()
      fetchMovies()
    } catch (error) {
      alert("Failed to add movie: " + (error.response?.data?.content || error.message))
    }
  }

  const handleUpdateMovie = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("maPhim", editingMovie.maPhim)
      Object.keys(movieForm).forEach((key) => {
        if (movieForm[key] !== null) {
          formData.append(key, movieForm[key])
        }
      })

      await movieAPI.updateMovie(formData)
      alert("Movie updated successfully!")
      setEditingMovie(null)
      resetMovieForm()
      fetchMovies()
    } catch (error) {
      alert("Failed to update movie: " + (error.response?.data?.content || error.message))
    }
  }

  const handleDeleteMovie = async (maPhim) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      try {
        await movieAPI.deleteMovie(maPhim)
        alert("Movie deleted successfully!")
        fetchMovies()
      } catch (error) {
        alert("Failed to delete movie: " + (error.response?.data?.content || error.message))
      }
    }
  }

  const handleDeleteUser = async (taiKhoan) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await userAPI.deleteUser(taiKhoan)
        alert("User deleted successfully!")
        fetchUsers()
      } catch (error) {
        alert("Failed to delete user: " + (error.response?.data?.content || error.message))
      }
    }
  }

  const startEditMovie = (movie) => {
    setEditingMovie(movie)
    setMovieForm({
      tenPhim: movie.tenPhim,
      trailer: movie.trailer || "",
      moTa: movie.moTa,
      ngayKhoiChieu: movie.ngayKhoiChieu.split("T")[0],
      sapChieu: movie.sapChieu,
      dangChieu: movie.dangChieu,
      hot: movie.hot,
      danhGia: movie.danhGia,
      hinhAnh: null,
      maNhom: movie.maNhom || "GP01",
    })
  }

  const resetMovieForm = () => {
    setMovieForm({
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: true,
      hot: false,
      danhGia: 0,
      hinhAnh: null,
      maNhom: "GP01",
    })
  }

  // Check if user is admin
  if (user?.maLoaiNguoiDung !== "QuanTri") {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You do not have permission to access this page.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

          <Tabs defaultValue="movies" className="w-full">
            <TabsList className="bg-slate-800 border-slate-700 mb-6">
              <TabsTrigger
                value="movies"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900"
              >
                <Film className="w-4 h-4 mr-2" />
                Movies
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900"
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
            </TabsList>

            {/* Movies Tab */}
            <TabsContent value="movies">
              <div className="bg-slate-800 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Movie Management</h2>
                  {!isAddingMovie && !editingMovie && (
                    <Button
                      onClick={() => setIsAddingMovie(true)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Movie
                    </Button>
                  )}
                </div>

                {/* Add/Edit Movie Form */}
                {(isAddingMovie || editingMovie) && (
                  <form onSubmit={editingMovie ? handleUpdateMovie : handleAddMovie} className="mb-8 space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {editingMovie ? "Edit Movie" : "Add New Movie"}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tenPhim" className="text-white">
                          Movie Title *
                        </Label>
                        <Input
                          id="tenPhim"
                          name="tenPhim"
                          value={movieForm.tenPhim}
                          onChange={handleMovieFormChange}
                          required
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="trailer" className="text-white">
                          Trailer URL
                        </Label>
                        <Input
                          id="trailer"
                          name="trailer"
                          value={movieForm.trailer}
                          onChange={handleMovieFormChange}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="moTa" className="text-white">
                          Description *
                        </Label>
                        <Textarea
                          id="moTa"
                          name="moTa"
                          value={movieForm.moTa}
                          onChange={handleMovieFormChange}
                          required
                          rows={4}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ngayKhoiChieu" className="text-white">
                          Release Date *
                        </Label>
                        <Input
                          id="ngayKhoiChieu"
                          name="ngayKhoiChieu"
                          type="date"
                          value={movieForm.ngayKhoiChieu}
                          onChange={handleMovieFormChange}
                          required
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="danhGia" className="text-white">
                          Rating (0-10)
                        </Label>
                        <Input
                          id="danhGia"
                          name="danhGia"
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={movieForm.danhGia}
                          onChange={handleMovieFormChange}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hinhAnh" className="text-white">
                          Movie Poster
                        </Label>
                        <Input
                          id="hinhAnh"
                          name="hinhAnh"
                          type="file"
                          accept="image/*"
                          onChange={handleMovieFormChange}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Status</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-white">
                            <input
                              type="checkbox"
                              name="dangChieu"
                              checked={movieForm.dangChieu}
                              onChange={handleMovieFormChange}
                              className="w-4 h-4"
                            />
                            Now Showing
                          </label>
                          <label className="flex items-center gap-2 text-white">
                            <input
                              type="checkbox"
                              name="sapChieu"
                              checked={movieForm.sapChieu}
                              onChange={handleMovieFormChange}
                              className="w-4 h-4"
                            />
                            Coming Soon
                          </label>
                          <label className="flex items-center gap-2 text-white">
                            <input
                              type="checkbox"
                              name="hot"
                              checked={movieForm.hot}
                              onChange={handleMovieFormChange}
                              className="w-4 h-4"
                            />
                            Hot
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900">
                        {editingMovie ? "Update Movie" : "Add Movie"}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setIsAddingMovie(false)
                          setEditingMovie(null)
                          resetMovieForm()
                        }}
                        variant="outline"
                        className="border-slate-600 text-gray-300 hover:bg-slate-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}

                {/* Movies List */}
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-yellow-400 text-xl">Loading movies...</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {movies.map((movie) => (
                      <div key={movie.maPhim} className="bg-slate-700 rounded-lg p-4 flex items-start gap-4">
                        <Image
                          src={movie.hinhAnh || "/placeholder.svg?height=120&width=80"}
                          alt={movie.tenPhim}
                          width={80}
                          height={120}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg mb-2">{movie.tenPhim}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-2">{movie.moTa}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {movie.dangChieu && (
                              <span className="px-2 py-1 bg-green-600 text-white rounded">Now Showing</span>
                            )}
                            {movie.sapChieu && (
                              <span className="px-2 py-1 bg-blue-600 text-white rounded">Coming Soon</span>
                            )}
                            {movie.hot && <span className="px-2 py-1 bg-yellow-400 text-slate-900 rounded">Hot</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => startEditMovie(movie)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteMovie(movie.maPhim)}
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left text-white font-semibold py-3 px-4">Username</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Full Name</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Email</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Phone</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Type</th>
                        <th className="text-left text-white font-semibold py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.taiKhoan} className="border-b border-slate-700">
                          <td className="text-gray-300 py-3 px-4">{user.taiKhoan}</td>
                          <td className="text-gray-300 py-3 px-4">{user.hoTen}</td>
                          <td className="text-gray-300 py-3 px-4">{user.email}</td>
                          <td className="text-gray-300 py-3 px-4">{user.soDT || user.soDt}</td>
                          <td className="text-gray-300 py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                user.maLoaiNguoiDung === "QuanTri"
                                  ? "bg-yellow-400 text-slate-900"
                                  : "bg-slate-600 text-white"
                              }`}
                            >
                              {user.maLoaiNguoiDung === "QuanTri" ? "Admin" : "User"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              onClick={() => handleDeleteUser(user.taiKhoan)}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function AdminPage() {
  return (
    <AuthGuard requireAuth={true}>
      <AdminContent />
    </AuthGuard>
  )
}
