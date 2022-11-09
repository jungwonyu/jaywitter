import React from 'react';
import { useEffect, useState } from 'react';
import { dbService } from '../fbase';

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState('');
  const [jweets, setJweets] = useState([]);

  useEffect(() => {
    dbService.collection('jweets').onSnapshot((snapshot) => {
      const jweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJweets(jweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('jweets').add({
      text: jweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
    <>
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
      <div>
        {jweets.map((jweet) => (
          <div key={jweet.id}>
            <h4>{jweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
