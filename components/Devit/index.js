import Avatar from 'components/Avatar';

export default function Devit({
  avatar,
  userId,
  content,
  userName,
  createdAt,
}) {
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
            <div className='date'>{createdAt}</div>
          </header>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
          display: flex;
          padding: 10px 15px;
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
