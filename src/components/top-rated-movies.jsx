import MovieGrid from "./movie-grid"

export default function TopRatedMovies() {
  const movies = [
    {
      title: "Women's Day",
      poster: "/women-s-day-movie-poster-red-orange-silhouette.jpg",
      quality: "HD",
      duration: "128 min",
      rating: "3.5",
      year: "2022",
    },
    {
      title: "The Perfect Match",
      poster: "/the-perfect-match-movie-poster-woman-volleyball.jpg",
      quality: "2K",
      duration: "128 min",
      rating: "3.5",
      year: "2022",
    },
    {
      title: "The Dog Woof",
      poster: "/dog-movie-poster-yellow-background-happy-dog.jpg",
      quality: "4K",
      duration: "128 min",
      rating: "3.5",
      year: "2021",
    },
    {
      title: "The Easy Reach",
      poster: "/kerala-beach-cartoon-character-coconut-tree.jpg",
      quality: "4K",
      duration: "128 min",
      rating: "3.5",
      year: "2021",
    },
  ]

  return (
    <img
      title="Top Rated Movies"
      subtitle="ONLINE STREAMING"
      categories={["TV SHOWS", "MOVIES", "DOCUMENTARY", "SPORTS"]}
      movies={movies}
      buttonVariant="border-left"
    />
  )
}
