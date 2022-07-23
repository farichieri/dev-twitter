import { useEffect } from 'react';
import Head from 'next/head';
import Button from 'components/Button';
import GitHub from 'components/Icons/Github';
import { colors } from 'styles/theme';
import { loginWithGitHub } from '../firebase/client';
import { useRouter } from 'next/router';
import useUser, { USER_STATES } from 'hooks/useUser';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/home');
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Head>
        <title>dev-twitter 🦅</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section>
        <img src='/dev-twitter-logo.png' alt='logo' />
        <h1>Dev-twitter</h1>
        <h2>Talk about development with developers 👥</h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill='#fff' width={32} height={24} /> Login with Github
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src='/spinner.gif' />}
        </div>
      </section>
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
