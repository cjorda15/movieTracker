import React, { Component } from 'react'
import { shallow, mount } from 'enzyme'
import fetchMock from 'fetch-mock'
import { browserHistory } from 'react-router'

import movieData from '../MovieList/movieData'
import MovieCard from './MovieCard'

describe('MovieCard functionality', () => {
  const mockCalls = () => {
    fetchMock.get('/api/users/favorites/new', {
      status: 200,
      ok: true,
      body: 'hello'
    })
    fetchMock.get('*', {
      status: 200,
      ok: true,
      body: 'hello'
    })
  }

  const firstMovie = movieData.movies[0]

  afterEach( () => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore()
  })
  const mockFn = jest.fn()

  const wrapper = shallow(
    <MovieCard
    isFavorite='not-favorite'
    movieInfo={'id: 12, title: "Apocalayse Now", overview: "goodmovie", release_date: "1978", vote_average: 4'}
    />)

  it('should render', () => {

    expect(wrapper.length).toEqual(1)
  })

  it("should have a class name",()=>{

    expect(wrapper.hasClass('not-favorite')).toEqual(true)
  })

  it('should have a class name that changes if it has been favorited',() => {

    const wrapper = shallow(
      <MovieCard
      isFavorite='favorite'
      movieInfo={'id: 12, title: "Apocalayse Now", overview: "goodmovie", release_date: "1978", vote_average: 4'}
      />)
      expect(wrapper.hasClass('favorite')).toEqual(true)
  })

  it('should have an image and a button', () => {
    const user = {id: 3}
    const wrapper = shallow(<MovieCard
                              changePath = {mockFn}
                              isFavorite = {"not-favorite"}
                              user={user}
                              handleAddFavorite={mockFn}
                              handleRemoveFavorite={mockFn}
                              key={7}
                              index={firstMovie.id}
                              movieInfo={firstMovie}/>)

    const image = wrapper.find('img')
    const btn = wrapper.find('button')

    expect(image.length).toEqual(7)
    expect(btn.length).toEqual(1)
  })

  it('should have an image with the right url', () => {
    const user = {id: 3}
    const wrapper = shallow(<MovieCard
                              changePath = {mockFn}
                              isFavorite = {"not-favorite"}
                              user={user}
                              handleAddFavorite={mockFn}
                              handleRemoveFavorite={mockFn}
                              key={7}
                              index={firstMovie.id}
                              movieInfo={firstMovie}/>)

    const image = wrapper.find('.movie-image')

    expect(image.props().src).toEqual("https://image.tmdb.org/t/p/original/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg")
  })

  it('should have a button with the right text', () => {
    const user = {id: 3}
    const wrapper = shallow(<MovieCard
                              changePath = {mockFn}
                              isFavorite = {"not-favorite"}
                              user={user}
                              handleAddFavorite={mockFn}
                              handleRemoveFavorite={mockFn}
                              key={7}
                              index={firstMovie.id}
                              movieInfo={firstMovie}/>)

    const btn = wrapper.find('button')

    expect(btn.text()).toEqual('favorite')
  })
})
