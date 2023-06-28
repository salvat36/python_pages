import React from 'react';
import Search from './Search';
import Book from './Book';

const Collection = ({ books }) => {
  return (
    <div>
      <Search />
      <div className="bookcase">
        {books.map((book) => (
          <Book key={book.id} title={book.title} spineImg={book.spineImg} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
