import AppLayout from 'components/AppLayout/AppLayout';
import Devit from 'components/Devit';
import { fetchLatestDevits } from '../../firebase/client';
import useUser from 'hooks/useUser';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Create from 'components/Icons/Create';
import Home from 'components/Icons/Home';
import Search from 'components/Icons/Search';
import { colors } from 'styles/theme';
import Head from 'next/head';

export default function HomePage() {
  const [timeline, setTimeline] = useState(false);
  const user = useUser();

  useEffect(() => {
    user &&
      fetchLatestDevits().then((result) =>
        setTimeline(result.sort((a, b) => b.createdAt - a.createdAt))
      );
  }, [user]);

  return (
    <>
      <AppLayout>
        <Head>
          <title>Inicio / Devter</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {!timeline ? (
            <img src='/spinner.gif' alt='spinner' />
          ) : (
            timeline.map(
              ({ userId, userName, img, avatar, content, createdAt }) => {
                return (
                  <Devit
                    createdAt={createdAt}
                    avatar={avatar}
                    img={img}
                    userId={userId}
                    key={userId}
                    content={content}
                    userName={userName}
                  />
                );
              }
            )
          )}
        </section>
        <nav>
          <Link href='/'>
            <a>
              <Home width={32} height={32} stroke='#09f' />
            </a>
          </Link>
          <Link href='/'>
            <a>
              <Search width={32} height={32} stroke='#09f' />
            </a>
          </Link>
          <Link href='/compose/tweet'>
            <a>
              <Create width={32} height={32} stroke='#09f' />
            </a>
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          backdrop-filter: blur(0.5px);
          background: #ffffffee;
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        section {
          position: relative;
          flex: 1;
          min-height: 100vh;
        }
        img {
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        nav {
          align-items: center;
          background-color: #fff;
          border-top: 1px solid #eee;
          bottom: 0;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
          z-index: 1;
        }
        nav a {
          display: flex;
          align-items: center;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  );
}
