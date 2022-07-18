import AppLayout from "components/AppLayout/AppLayout";
import Button from "components/Button";
import { addDevit } from "../../../firebase/client";
import useUser from "hooks/useUser";
import { useState } from "react";

export default function ComposeTweet() {
  const user = useUser();
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.username,
    });
  };

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder={`What's happening?`}
          ></textarea>
          <div>
            <Button disabled={message.length === 0}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: 0;
          font-size: 21px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
          min-height: 100px;
        }
      `}</style>
    </>
  );
}
