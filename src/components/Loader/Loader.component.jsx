import React from 'react';
import { ClipLoader } from 'react-spinners';
import "./loader.styles.scss"
const Loader = ({ loading }) => {
  return (
    <div className='loader_container'>
      <ClipLoader
        size={50}
        color={'#123abc'}
        loading={loading}
      />
    </div>
  );
}

export default Loader;