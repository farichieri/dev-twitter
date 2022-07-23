import Avatar from 'components/Avatar';
import useTimeAgo from 'hooks/useTimeAgo';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Devit({
  avatar,
  img,
  content,
  userName,
  createdAt,
  id,
}) {
  const timeago = useTimeAgo(createdAt);
  const createdAtFormated = 'time detail'; //useDateTimeFormat(createdAt)
  const router = useRouter();

  const handleArticleClick = (event) => {
    event.preventDefault();
    router.push(`/status/${id}`);
  };
  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar alt={avatar} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeago}</time>
              </a>
            </Link>
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
        article:hover {
          background: #f5f8fa;
          cursor: pointer;
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
        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
