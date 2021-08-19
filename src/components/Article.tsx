/* eslint-disable prettier/prettier */
import React, { useState, } from 'react';
import { Content, PublishButton, Title } from './index';

type Props = {
  title: string;
  content: string;
};

const Article: React.FC<Props> = ({ title, content }) => {
  const [isPublished, setisPublished] = useState(false);

  const Published = () => {
    setisPublished(true);
  };
  return (
    <div>
      {/* Titleがうまく読み込めていないので一時的に動かして画面表示できるようにしている（後で修正します） */}
      <Title content={title} />
      <Content content={content} />
      <PublishButton isPublished={isPublished} OnClick={Published} />
    </div>
  );
};

export default Article;