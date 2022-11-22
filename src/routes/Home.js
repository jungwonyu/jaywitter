import React from 'react';
import { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import Jweet from '../components/Jwitter';
import JweetFactory from '../components/JweetFactory';

const Home = ({ userObj }) => {
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

  return (
    <>
      <JweetFactory userObj={userObj} />
      <div>
        {jweets.map((jweet) => (
          <Jweet
            key={jweet.id}
            jweetObj={jweet}
            isOwner={jweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
