import React from 'react';
export default function StarRating({ rating, max = 5 }) {
  return (
    <span className="star-rating">
      {Array.from({ length: max }, (_, i) => (
        <i key={i} className={'fas fa-star ' + (i < rating ? 'star-filled' : 'star-empty')} />
      ))}
    </span>
  );
}
