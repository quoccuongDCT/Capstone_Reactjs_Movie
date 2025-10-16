
import './App.css'
import BestTVSeries from './components/best-tv-series'
import Footer from './components/footer'
import Header from './components/header'
import Hero from './components/hero'
import ServicesSection from './components/services-section'
import TopRatedMovies from './components/top-rated-movies'
import TrialCTA from './components/trial-cta'
import UpcomingMovies from './components/upcoming-movies'

function App() {

  return (
    <>
      <Header />
      <Hero />
      <UpcomingMovies />
      <TopRatedMovies />
      <ServicesSection />
      <BestTVSeries />
      <TrialCTA />
      <Footer />
    </>
  )
}

export default App
