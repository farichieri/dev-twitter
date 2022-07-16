import Avatar from "components/Avatar";

export default function Devit({ avatar, id, message, username }) {
  return (
    <>
      <article>
        <Avatar alt={avatar} src={avatar} text={username} />
        <div>
          <strong>{username}</strong>
          <p>{message}</p>
        </div>
      </article>
      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
        }
      `}</style>
    </>
  );
}
