import AppLayout from "components/AppLayout/AppLayout";
import Devit from "components/Devit";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [timeline, setTimeline] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline);
  }, []);

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {!timeline ? (
            <img src="/spinner.gif" alt="spinner" />
          ) : (
            timeline.map(({ id, username, avatar, message }) => {
              return (
                <Devit
                  avatar={avatar}
                  id={id}
                  key={id}
                  message={message}
                  username={username}
                />
              );
            })
          )}
        </section>
        <nav>Nav</nav>
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
      `}</style>
    </>
  );
}
