import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userAPI } from "../../lib/api"

const getFromLocalStorage = (key, defaultValue = null) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key)
    if (key === "USER_INFO" && item) {
      try {
        return JSON.parse(item)
      } catch {
        return defaultValue
      }
    }
    return item || defaultValue
  }
  return defaultValue
}

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await userAPI.login(credentials)
    if (typeof window !== "undefined") {
      localStorage.setItem("USER_TOKEN", response.accessToken)
      localStorage.setItem("USER_INFO", JSON.stringify(response))
    }
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed")
  }
})

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await userAPI.register(userData)
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data || "Registration failed")
  }
})

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await userAPI.getUserInfo()
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to get user info")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getFromLocalStorage("USER_INFO"),
    token: getFromLocalStorage("USER_TOKEN"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      if (typeof window !== "undefined") {
        localStorage.removeItem("USER_TOKEN")
        localStorage.removeItem("USER_INFO")
      }
    },
    restoreAuth: (state) => {
      state.user = getFromLocalStorage("USER_INFO")
      state.token = getFromLocalStorage("USER_TOKEN")
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.accessToken
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logout, restoreAuth, clearError } = authSlice.actions
export default authSlice.reducer
