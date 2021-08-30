/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Article from './components/Article';
// import TextInput from './components/TextInput';
// import Counter from './components/Counter';
// import ToggleButton from './components/ToggleButton';

function App() {
  // 第9回
  const [name, setName] = useState('');
  const [id, setId] = useState('NaritaShuto');
  const ids = ['deatigger', 'gaearon', 'aws', 'google', 'facebook'];
  const getRandomId = () => {
    const _id = ids[Math.floor(Math.random() * ids.length)];
    setId(_id);
  };

  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      {/* <Article
        title="新・日本一わかりやすいReact入門基礎編"
        content="今日のトピックはpropsのデータの受け渡しについて"
      />
      <Article
        title="新・日本一わかりやすいReact入門基礎編"
        content="今日のトピックは．．．"
      /> */}

      {/* 第7・8回 */}
      {/* <TextInput /> */}
      {/* <Counter /> */}
      {/* <ToggleButton /> */}

      {/* 第9回 */}
      <p>
        {id}の、Github上名前は{name}です。
      </p>
      <button onClick={getRandomId}>IDを変更</button>
    </div>
  );
}

export default App;
