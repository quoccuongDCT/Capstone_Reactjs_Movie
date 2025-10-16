"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { login } from "./../redux/slices/authSlice"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Film } from "lucide-react"

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login(formData))

    if (login.fulfilled.match(result)) {
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Film className="w-10 h-10 text-yellow-400" />
            <span className="text-3xl font-bold text-white">Movflix</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                {error.content || "Login failed. Please check your credentials."}
              </div>
            )}

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
                placeholder="Enter your username"
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
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
