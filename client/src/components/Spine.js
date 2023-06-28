import React from 'react';

const Spine = ({ title, spineImg }) => {
  return (
    <div className="spine">
      <img src={spineImg} alt="Book Spine" />
      <span>{title}</span>
    </div>
  );
};

export default Spine;
