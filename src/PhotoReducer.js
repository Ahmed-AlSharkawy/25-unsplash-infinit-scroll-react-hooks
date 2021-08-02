const clientID = `client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainURL = `https://api.unsplash.com/photos/?${clientID}`
const searchURL = `https://api.unsplash.com/search/photos/?${clientID}&query=`
const pageTerm = '&per_page=30&page='

const PhotoReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_URL':
      return { ...state, url: setURL(state) }
    case 'LOADING':
      return { ...state, isLoading: true }
    case 'NOT_LOADING':
      return { ...state, isLoading: false }
    case 'SET_PHOTOS':
      return setPhotos(state, payload)
    case 'SET_ERROR':
      return { ...state, errors: [...payload] }
    case 'INCREASE_PAGE':
      return { ...state, page: state.page + 1 }
    case 'SET_SEARCH':
      return setSearch(state, payload)

    default:
      return { ...state, errors: ['Error: No matching type to dispatch'] }
  }
}

const setURL = (state) => {
  const basicURL = state.search ? `${searchURL}${state.query}` : mainURL
  return `${basicURL}${pageTerm}${state.page}`
}

const setPhotos = (state, data) => {
  console.log(state)
  if (data.errors) return { ...state, errors: data.errors }
  else if (data.results && state.page === 1)
    return { ...state, photos: data.results, errors: null }
  else if (data.results)
    return {
      ...state,
      photos: [...state.photos, ...data.results],
      errors: null,
    }

  return { ...state, photos: [...state.photos, ...data], errors: null }
}

const setSearch = (state, searchTerm) => {
  return {
    ...state,
    page: 1,
    search: true,
    query: searchTerm,
  }
}

export default PhotoReducer
