import Head from "next/head";
import AppLayout from "../components/AppLayout/AppLayout";
import Button from "../components/AppLayout/Button";
import GitHub from "../components/AppLayout/icons/Github";
import { colors } from "../styles/theme";
import {
  loginWithGitHub,
  onAuthStateChangedFunction,
} from "../firebase/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChangedFunction(setUser);
  }, [user]);

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        const { avatar, username, email } = user;
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Head>
        <title>dev-twitter 🦅</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/dev-twitter-logo.png" alt="logo" />
          <h1>Dev-twitter</h1>
          <h2>Talk about development with developers 👥</h2>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={32} height={24} /> Login with Github
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <img src={user.avatar} />
                <strong>{user.username}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>
      <style jsx>{`
        section {
          display: grid;
          place-items: center;
          place-content: center;
          height: 100%;
        }
        img {
          width: 120px;
        }
        h1 {
          font-size: 24px;
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}
