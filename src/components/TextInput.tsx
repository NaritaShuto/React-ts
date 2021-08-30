/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

const TextInput = () => {
  const [name, setName] = useState('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!(event.target instanceof HTMLInputElement)){
      return
    };
    // eslint-disable-next-line no-console
    console.log(event.target.value)
    setName(event.target.value);
  };

  return (
    <input
    onChange={(event) => handleName(event)}
    type="text"
    value={name}
    />
  );
};

export default TextInput;
