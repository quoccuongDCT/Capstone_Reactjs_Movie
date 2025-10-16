import './App.css'
import BestTVSeries from './components/best-tv-series.jsx'
import Footer from './components/footer.jsx'
import Header from './components/header.jsx'
import Hero from './components/hero.jsx'
import ServicesSection from './components/services-section.jsx'
import TopRatedMovies from './components/top-rated-movies.jsx'
import TrialCTA from './components/trial-cta.jsx'
import UpcomingMovies from './components/upcoming-movies.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './login/loginpage.jsx'
import RegisterPage from './register/registerpage.jsx'
import MovieDetailPage from './detail/detailpage.jsx'
import TicketRoomPage from './ticketroom/ticketroompage.jsx'
import AdminPage from './admin/adminpage.jsx'
import ProfilePage from './profile/profilepage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <UpcomingMovies />
              <TopRatedMovies />
              <ServicesSection />
              <BestTVSeries />
              <TrialCTA />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/detail/:id" element={<MovieDetailPage />} />
        <Route path="/ticketroom/:idShowTime" element={<TicketRoomPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
