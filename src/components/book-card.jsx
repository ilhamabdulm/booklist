import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaImage, FaTrash } from 'react-icons/fa';
import Rater from 'react-rater';
import Image from 'next/image';
import {
  deleteFavorite,
  getAllFavorites,
  saveFavorite,
} from '@/services/favorites';

function BookCard({ book, refetch = () => {}, favorites = [] }) {
  const isFavorited = useMemo(() => {
    if (favorites?.length && book) {
      return favorites.some((s) => s.id === book.id);
    }

    return false;
  }, [book, favorites]);

  const _handleSave = async (data) => {
    try {
      const response = await saveFavorite(data);
      refetch();
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const _handleDelete = async (id) => {
    try {
      const response = await deleteFavorite(id);
      refetch();
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg drop-shadow-lg">
      <figure className="flex justify-center">
        {book?.thumbnail ? (
          <Image
            className="w-[100px] h-[155px]"
            src={book.thumbnail}
            width={100}
            height={155}
            alt={book.title}
          />
        ) : (
          <div className="w-[100px] h-[155px] bg-slate-300 flex items-center justify-center flex-col">
            <FaImage />
            <p className="text-xs">No Image</p>
          </div>
        )}
      </figure>
      <div>
        <p className="font-semibold text-center text-sm">{book.title}</p>
        <p
          className="text-xs mt-2 italic text-center truncate"
          title={book.authors?.join(', ')}
        >
          By: {book.authors?.join(', ') || '-'}
        </p>
      </div>
      <div className="flex flex-col justify-end h-full">
        <div className="flex items-center gap-4 justify-between">
          <Rater
            total={5}
            rating={book.averageRating || 0}
            interactive={false}
          />
          {isFavorited ? (
            <button
              className="flex items-center justify-center gap-2 text-xs text-red-500 border border-red-500 hover:bg-slate-100 rounded-full px-2 py-1"
              onClick={() => {
                _handleDelete(book.id);
              }}
            >
              <FaTrash /> Hapus
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-2 text-xs bg-red-500 hover:bg-red-600 text-white rounded-full px-2 py-1"
              onClick={() => {
                _handleSave(book);
              }}
            >
              <FaHeart /> Favorit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.object,
  refetch: PropTypes.func,
};

export default BookCard;
