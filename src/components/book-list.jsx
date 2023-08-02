import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import BookCard from './book-card';
import { getAllFavorites } from '@/services/favorites';

function BookList({ books, refetch = null }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    try {
      const response = await getAllFavorites();
      setFavorites(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 my-8 gap-6">
      {books.map((book) => {
        return (
          <BookCard
            book={book}
            key={book.id}
            refetch={refetch || _fetchData}
            favorites={favorites}
          />
        );
      })}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array,
  refetch: PropTypes.func,
};

export default BookList;
