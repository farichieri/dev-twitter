import Button from 'components/Button';
import { addDevit, uploadImage } from '../../../firebase/client';
import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import Head from 'next/head';
import Avatar from 'components/Avatar';

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [message, setMessage] = useState('');
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  const user = useUser();
  const router = useRouter();
  const storage = getStorage();

  useEffect(() => {
    if (task) {
      let onProgress = () => {};
      let onError = () => {};
      let onComplete = () => {
        getDownloadURL(task.snapshot.ref).then(setImgURL);
      };
      task.on('state_changed', onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgURL,
    })
      .then(() => {
        router.push('/home');
      })
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = event.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled =
    !message.length ||
    status === COMPOSE_STATES.LOADING ||
    (imgURL && !imgURL.length);

  return (
    <>
      <Head>
        <title>Crear un Devit / Devter</title>
      </Head>
      <section className='form-container'>
        <section className='avatar-container'>
          {user && <Avatar src={user.avatar} />}
        </section>
        <form onSubmit={handleSubmit}>
          <textarea
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onChange={handleChange}
            placeholder={`What's happening?`}
          ></textarea>
          {imgURL && (
            <section className='image'>
              <button onClick={() => setImgURL(null)}>x</button>
              {imgURL && <img src={imgURL} alt={imgURL} />}
            </section>
          )}

          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }
        form {
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .form-container{
          display: flex;
          align-items: flex-start;
        }
        .avatar-container {
          padding: 20px 0 0 10px;
        }
        .image {
          position: relative;
        }
        button {
          align-items: center;
          background: rgba(0, 0 ,0 , 0.3);
          border-radius: 999px;
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 15px;
          height: 32px;
          justify-content: center;
          position: absolute;
          right: 15px;
          top: 15px;
          width: 32px;
        }
        textarea {
          border-radius: 10px;
          border: ${
            drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? '3px dashed #09f'
              : '3px dashed transparent'
          };
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
        img {
          height auto: ;
          border-radius: 10px;
          width: 100%;
        }
      `}</style>
    </>
  );
}
