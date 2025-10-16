"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "./../redux/slices/authSlice"
import { userAPI } from "./../lib/api"
import { AuthGuard } from "./../components/auth-guard"
import Header from "./../components/header"
import Footer from "./../components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./../components/ui/tabs"
import { Button } from "./../components/ui/button"
import { Input } from "./../components/ui/input"
import { Label } from "./../components/ui/label"
import { User, Ticket, Edit } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

function ProfileContent() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  })
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const data = await userAPI.getUserInfo()
        setUserInfo(data.content || data)
        setFormData({
          taiKhoan: data.content?.taiKhoan || data.taiKhoan || "",
          matKhau: "",
          email: data.content?.email || data.email || "",
          soDt: data.content?.soDT || data.soDt || "",
          maNhom: data.content?.maNhom || data.maNhom || "GP01",
          maLoaiNguoiDung: data.content?.maLoaiNguoiDung || data.maLoaiNguoiDung || "",
          hoTen: data.content?.hoTen || data.hoTen || "",
        })
      } catch (error) {
        console.error("Error fetching user info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [dispatch])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await userAPI.updateUserInfo(formData)
      alert("Profile updated successfully!")
      setIsEditing(false)
      dispatch(getUserInfo())
    } catch (error) {
      alert("Failed to update profile: " + (error.response?.data?.content || error.message))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-yellow-400 text-xl">Loading profile...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="bg-slate-800 border-slate-700 mb-6">
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900"
              >
                <User className="w-4 h-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="bookings"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Booking History
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="info">
              <div className="bg-slate-800 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hoTen" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="hoTen"
                          name="hoTen"
                          value={formData.hoTen}
                          onChange={handleChange}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="taiKhoan" className="text-white">
                          Username
                        </Label>
                        <Input
                          id="taiKhoan"
                          name="taiKhoan"
                          value={formData.taiKhoan}
                          disabled
                          className="bg-slate-700 border-slate-600 text-gray-400"
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
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="soDt" className="text-white">
                          Phone Number
                        </Label>
                        <Input
                          id="soDt"
                          name="soDt"
                          value={formData.soDt}
                          onChange={handleChange}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="matKhau" className="text-white">
                          New Password (leave blank to keep current)
                        </Label>
                        <Input
                          id="matKhau"
                          name="matKhau"
                          type="password"
                          value={formData.matKhau}
                          onChange={handleChange}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900">
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-slate-600 text-gray-300 hover:bg-slate-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Full Name</p>
                        <p className="text-white text-lg">{userInfo?.hoTen || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Username</p>
                        <p className="text-white text-lg">{userInfo?.taiKhoan || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Email</p>
                        <p className="text-white text-lg">{userInfo?.email || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Phone Number</p>
                        <p className="text-white text-lg">{userInfo?.soDT || userInfo?.soDt || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Account Type</p>
                        <p className="text-white text-lg">
                          {userInfo?.maLoaiNguoiDung === "QuanTri" ? "Admin" : "User"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Booking History Tab */}
            <TabsContent value="bookings">
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Booking History</h2>

                {userInfo?.thongTinDatVe && userInfo.thongTinDatVe.length > 0 ? (
                  <div className="space-y-4">
                    {userInfo.thongTinDatVe.map((booking, index) => (
                      <div key={index} className="bg-slate-700 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <Image
                            src={booking.hinhAnh || "/placeholder.svg?height=120&width=80"}
                            alt={booking.tenPhim}
                            width={80}
                            height={120}
                            className="rounded"
                          />
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg mb-2">{booking.tenPhim}</h3>
                            <div className="text-gray-400 space-y-1 text-sm">
                              <p>
                                <span className="text-yellow-400">Date:</span>{" "}
                                {format(new Date(booking.ngayDat), "MMM dd, yyyy HH:mm")}
                              </p>
                              <p>
                                <span className="text-yellow-400">Theater:</span> {booking.tenHeThongRap}
                              </p>
                              <p>
                                <span className="text-yellow-400">Seats:</span>{" "}
                                {booking.danhSachGhe?.map((ghe) => ghe.tenGhe).join(", ") || "N/A"}
                              </p>
                              <p>
                                <span className="text-yellow-400">Total:</span>{" "}
                                {booking.giaVe?.toLocaleString() || "N/A"} VND
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No booking history yet</p>
                    <p className="text-gray-500 text-sm mt-2">Start booking tickets to see your history here</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard requireAuth={true}>
      <ProfileContent />
    </AuthGuard>
  )
}
