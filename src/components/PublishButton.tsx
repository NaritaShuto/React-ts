/* eslint-disable prettier/prettier */
import React from 'react';

type Props = {
  isPublished: boolean;
  OnClick: () => void;
};

const PublishButton: React.FC<Props> = ({ isPublished, OnClick }) => {
  return (
    <button onClick={() => OnClick()} type="button">
      型: {String(isPublished)}
    </button>
  );
};

export default PublishButton;
