import axios from "axios";

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWM3NDA1YzUwNjY3YjQ1OGFmMTYzNmJhMjIyYzhhMSIsInN1YiI6IjY1ODE4Y2U5ODc1ZDFhMDdiYmFmMWNiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LikD9N7m2XZ-yQabZejEFYVH9t2yFAzY9aQWarNuIu4'

const tmdbAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
})

export async function fetchPopularMovies() {
    const { data } = await tmdbAPI.get('/movie/popular')
    return data
}


export async function fetchMovieBySearch(query) {
    const { data } = await tmdbAPI.get(`/search/movie?query=${query}&include_adult=false&language=en-US`)
    return data
}

export async function getMoviesByFilter(filter, page = 1) {
    const { data } = await tmdbAPI.get(`/movie/${filter}?page=${page}`)
    return data
}

export async function getMovies({
    filter,
    query,
    page
}) {
    if (query) return await fetchMovieBySearch(query, page)
    if (filter) return await getMoviesByFilter(filter, page)
    return fetchPopularMovies()
}
