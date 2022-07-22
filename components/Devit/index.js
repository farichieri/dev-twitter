import Avatar from 'components/Avatar';
import useTimeAgo from 'hooks/useTimeAgo';

export default function Devit({
  avatar,
  userId,
  img,
  content,
  userName,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt);
  return (
    <>
      <article>
        <div>
          <Avatar alt={avatar} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <time className='date'>{timeago}</time>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
          display: flex;
          padding: 10px 15px;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        header {
          display: flex;
          gap: 0.5rem;
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        .date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
