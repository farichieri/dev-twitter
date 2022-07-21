import AppLayout from 'components/AppLayout/AppLayout';
import Button from 'components/Button';
import { addDevit, uploadImage } from '../../../firebase/client';
import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

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
        console.log('onComplete');
        getDownloadURL(ref(storage, `/images/${file}`)).then(setImgURL);
      };
      // task.on('state_changed', onProgress, onError, onComplete);
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

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onChange={handleChange}
            placeholder={`What's happening?`}
          ></textarea>
          {imgURL && <img src={imgURL} alt={imgURL} />}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border-radius: 10px;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '3px dashed transparent'};
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  );
}
