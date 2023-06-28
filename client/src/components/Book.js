import React from 'react';

const BookItem = ({ book }) => {
  const { title, author, spineImg } = book;

  return (
    <span>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <img src={spineImg} alt="Book Spine" />
      {/* Additional book details can be added here */}
    </span>
  );
};

export default BookItem;
