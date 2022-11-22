import React from 'react';
import { useEffect, useState } from 'react';
import { dbService, storageService } from '../fbase';
import Jweet from '../components/Jwitter';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState('');
  const [jweets, setJweets] = useState([]);
  const [attachment, setAttachment] = useState('');

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
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = await storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }

    await dbService.collection('jweets').add({
      text: jweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setJweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setJweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment('');

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
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Jweet' />
        {attachment && (
          <div>
            <img src={attachment} width={50} height={50} />
            <button onClick={onClearAttachment}> Clear</button>
          </div>
        )}
      </form>
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
