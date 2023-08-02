import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ value, setValue }) {
  return (
    <div className="bg-white border border-gray-500 rounded-full overflow-hidden py-2 px-4 focus-within:outline focus-within:outline-1 flex items-center gap-4">
      <input
        className="w-full focus:outline-none"
        type="text"
        placeholder="Cari judul buku di sini"
        value={value}
        onChange={(e) => setValue(e.target.value || '')}
      />
      <FaSearch />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default SearchBar;
