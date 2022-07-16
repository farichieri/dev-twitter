import AppLayout from "components/AppLayout/AppLayout";
import Devit from "components/Devit";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);

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
          {timeline.map(({ id, username, avatar, message }) => {
            return (
              <Devit
                avatar={avatar}
                id={id}
                key={id}
                message={message}
                username={username}
              />
            );
          })}
        </section>
        <nav>Nav</nav>
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 49px;
          position: fixed;
          top: 0;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
        }
        section {
          padding-top: 49px;
        }
        nav {
          display: flex;
          align-items: center;
          width: 100%;
          border-top: 1px solid #ccc;
          bottom: 0;
          height: 49px;
          position: fixed;
        }
      `}</style>
    </>
  );
}
