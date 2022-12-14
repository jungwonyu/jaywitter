import React from 'react';
import { dbService, storageService } from '../fbase';
import { useState } from 'react';

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('삭제하시겠습니까?');

    if (ok) {
      await dbService.doc(`jweets/${jweetObj.id}`).delete();
      if (jweetObj.attachmentUrl !== '')
        await storageService.refFromURL(jweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`jweets/${jweetObj.id}`).update({ text: newJweet });
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newJweet} required />
            <input type='submit' value='Update' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {jweetObj.attachmentUrl && (
            <img src={jweetObj.attachmentUrl} width={50} height={50} />
          )}

          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;
