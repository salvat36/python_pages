import React from 'react'
import { Input } from 'semantic-ui-react'

const SearchBooks = ( {searchBook, onSearch} ) => {
  
  const handleChange = (e) => {
      onSearch(e.target.value)
  }

  return(
      <div id="search-container">
          <Input
          value={searchBook}
          type='text'
          id='search'
          placeholder='Search for a book!'
          onChange={handleChange}
          />
      </div>
  )
}

export default SearchBooks