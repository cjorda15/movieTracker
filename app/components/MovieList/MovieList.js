import React from 'react'

import MovieCard from '../MovieCard/MovieCard'

const MovieList = (props) => {

  const changePath = (route) => {
    props.history.replace(`/${route.id}`)
  }

  let moviesList = () => {
    return props.movies.map(( movie , i ) => {
      let classname = "not-favorite"

      if(props.favorites.length) {
        classname = props.favorites.includes(movie.id) ? "favorite" : "not-favorite"
      }

      return (
        <MovieCard
        changePath = {changePath}
        isFavorite = {classname}
        user={props.user}
        handleAddFavorite={props.handleAddFavorite}
        handleRemoveFavorite={props.handleRemoveFavorite}
        key={i}
        index={movie.id}
        movieInfo={movie}/>
      )
    })
  }

  let renderCard = props.movies ? moviesList() : <div>loading</div>

  return(
    <section className="movie-list">
      {renderCard}
    </section>
  )
}

export default MovieList
