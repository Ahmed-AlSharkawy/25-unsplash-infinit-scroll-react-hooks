import React, { useCallback, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'

import { usePhotosContext } from './PhotosContext'
import Photo from './Photo'
import loading from './assets/loading.gif'

function App() {
  const { isLoading, photos, errors, increasePage, setSearch } =
    usePhotosContext()

  const searchRef = useRef(null)

  const handlescroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      if (!isLoading) {
        increasePage()
        console.log('set page called')
      }
    }
  }, [increasePage, isLoading])

  useEffect(() => {
    if (!isLoading) {
      console.log('setpage effect triggered')
      const event = window.addEventListener('scroll', handlescroll)
      return () => {
        window.removeEventListener('scroll', event)
      }
    }
  }, [handlescroll, isLoading])

  const handlesubmit = (e) => {
    e.preventDefault()
    console.log('handle submit')
    const searchTerm = searchRef.current.value
    if (searchTerm) {
      console.log(searchTerm)
      setSearch(searchTerm)
    }
  }

  if (errors) {
    console.log(errors)
    return (
      <div className='error'>
        {errors.map((err, index) => {
          return <h3 key={index}>{err}</h3>
        })}
      </div>
    )
  }

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='searh'
            className='form-input'
            ref={searchRef}
          />
          <button type='submit' className='submit-btn' onClick={handlesubmit}>
            <FaSearch />
          </button>
        </form>
        <h4 style={{ color: 'darkcyan', marginTop: '1em' }}>
          <span style={{ color: 'red' }}>Search</span> for specific photos or
          <span style={{ color: 'red' }}> Scroll down </span>for new ones
        </h4>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos &&
            photos.length > 0 &&
            photos.map((img) => <Photo key={img.id} {...img} />)}
        </div>
        {isLoading && (
          <div className='loading-img'>
            <img src={loading} alt='Loading...' />
          </div>
        )}
      </section>
    </main>
  )
}

export default App
