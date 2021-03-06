/* eslint-disable prettier/prettier */
import React from 'react';

type Props = {
  title: string;
};

const Title: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex__row">
      <img src="/logo192.png" alt="Reactのロゴ" width={36} height={36} />
      <h2>{title}</h2>
    </div>
  );
};

export default Title;
