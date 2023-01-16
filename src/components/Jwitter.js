import React from 'react';
import { dbService, storageService } from '../fbase';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
    setEditing(false);
  };

  return (
    <div className='jweet'>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className='container jweetEdit'>
            <input
              onChange={onChange}
              value={newJweet}
              required
              placeholder='Edit your jweet'
              autoFocus
              className='formInput'
            />
            <input type='submit' value='Update Jweet' className='formBtn' />
          </form>
          <button onClick={toggleEditing} className='formBtn cancelBtn'>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {jweetObj.attachmentUrl && (
            <img
              src={jweetObj.attachmentUrl}
              width={50}
              height={50}
              alt='img'
            />
          )}

          {isOwner && (
            <div className='jweet__actions'>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;
