import React from 'react';
import { useState } from 'react';
import { dbService } from '../fbase';

const Home = () => {
  const [jweet, setJweet] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('jweets').add({
      text: jweet,
      createdAt: Date.now(),
    });
    setJweet('');
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setJweet(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={jweet}
        onChange={onChange}
        type='text'
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type='submit' value='Jweet' />
    </form>
  );
};

export default Home;
