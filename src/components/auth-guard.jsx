"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export function AuthGuard({ children, requireAuth = true, requireAdmin = false }) {
    const navigate = useNavigate()
    const { user, token } = useSelector((state) => state.auth)

    useEffect(() => {
        if (requireAuth && !token) {
            navigate("/login")
        }

        if (requireAdmin && user?.maLoaiNguoiDung !== "QuanTri") {
            navigate("/")
        }
    }, [token, user, requireAuth, requireAdmin, navigate])

    if (requireAuth && !token) {
        return null
    }

    if (requireAdmin && user?.maLoaiNguoiDung !== "QuanTri") {
        return null
    }

    return <>{children}</>
}
