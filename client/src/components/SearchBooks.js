import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'

const SearchBooks = () => {
  
  const handleChange = (e) => {
      onSearch(e.target.value)
  }
  
  const [searchBook, setSearchBook] = useState('')

  const onSearch = (input) => {
    setSearchBook(input)
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