/* eslint-disable prettier/prettier */
import React from 'react';

type Props = {
  content: string;
};

const Content: React.FC<Props> = ({ content }) => {
  return <p>{content}</p>;
};

export default Content;
