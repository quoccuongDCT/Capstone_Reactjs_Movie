"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { register } from "./../redux/slices/authSlice"
// import { Button } from "./../components/ui/button"
// import { Input } from "./../components/ui/input"
// import { Label } from "./../components/ui/label"
import { Film } from "lucide-react"

export default function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(register(formData))

    if (register.fulfilled.match(result)) {
      alert("Registration successful! Please login.")
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Film className="w-10 h-10 text-yellow-400" />
            <span className="text-3xl font-bold text-white">Movflix</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Sign up to start booking tickets</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                {error.content || "Registration failed. Please try again."}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="hoTen" className="text-white">
                Full Name
              </Label>
              <Input
                id="hoTen"
                name="hoTen"
                type="text"
                value={formData.hoTen}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taiKhoan" className="text-white">
                Username
              </Label>
              <Input
                id="taiKhoan"
                name="taiKhoan"
                type="text"
                value={formData.taiKhoan}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Choose a username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soDt" className="text-white">
                Phone Number
              </Label>
              <Input
                id="soDt"
                name="soDt"
                type="tel"
                value={formData.soDt}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="matKhau" className="text-white">
                Password
              </Label>
              <Input
                id="matKhau"
                name="matKhau"
                type="password"
                value={formData.matKhau}
                onChange={handleChange}
                required
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Create a password"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
