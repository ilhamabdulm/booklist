import React from 'react';
import PropTypes from 'prop-types';
import { FaBoxOpen } from 'react-icons/fa';

function Empty({ text }) {
  return (
    <div className="mt-24">
      <div className="flex flex-col items-center gap-2">
        <FaBoxOpen size={44} />
        <h4 className="text-gray-500 text-sm">{text}</h4>
      </div>
    </div>
  );
}

Empty.propTypes = {
  text: PropTypes.string,
};

export default Empty;
