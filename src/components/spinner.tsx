import React from 'react';
import { css } from '@emotion/react';
import { HashLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color={'#7986cb'} css={override} size={80} />
    </div>
  );
};

export default Spinner;
