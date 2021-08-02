import React, { useCallback, useContext, useEffect, useReducer } from 'react'
import reducer from './PhotoReducer'

export const PhotosContext = React.createContext()

const initialState = {
  isLoading: true,
  photos: [],
  page: 1,
  search: false,
  query: '',
  errors: null,
  url: '',
}

export default function PhotosProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'SET_URL' })
  }, [state.page, state.search])

  const fetchPhotos = useCallback(async () => {
    if (state.url) {
      console.log(`state 1 : ${state.url}`)
      dispatch({ type: 'LOADING' })

      console.log(`state 2 : ${state.url}`)
      try {
        const response = await fetch(state.url)
        console.log(response)
        const data = await response.json()
        console.log(data)
        if (data) dispatch({ type: 'SET_PHOTOS', payload: data })
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: [error.name, error.message],
        })
      } finally {
        dispatch({ type: 'NOT_LOADING' })
      }
    }
  }, [state.url])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  const increasePage = () => dispatch({ type: 'INCREASE_PAGE' })

  const setSearch = (searchTerm) =>
    dispatch({ type: 'SET_SEARCH', payload: searchTerm })

  return (
    <PhotosContext.Provider value={{ ...state, increasePage, setSearch }}>
      {children}
    </PhotosContext.Provider>
  )
}

export const usePhotosContext = () => useContext(PhotosContext)
