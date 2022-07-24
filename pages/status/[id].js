import Devit from 'components/Devit';
import { useRouter } from 'next/router';

export default function DevitPage(props) {
  const router = useRouter();
  if (router.isFallback) return 'Loading...';
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'iilyZT8tPtJH6ymca2Jw' } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // params, req, res, query -> lo que tenemosen el context
  const { params } = context;
  const { id } = params;
  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`);
  if (apiResponse.ok) {
    const props = await apiResponse.json();
    return { props: props };
  }
}

// export async function getServerSideProps(context) {
//   // params, req, res, query -> lo que tenemosen el context
//   const { params, res } = context;
//   const { id } = params;
//   const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`);
//   if (apiResponse.ok) {
//     const props = await apiResponse.json();
//     return { props: props };
//   } else {
//     res.writeHead(404).end();
//   }
// }

// DevitPage.getInitialProps = (context) => {
//   const { query, res } = context;
//   const { id } = query;
//   return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
//     if (apiResponse.ok) {
//       return apiResponse.json();
//     } else {
//       res.writeHead(404).end();
//     }
//   });
// };
