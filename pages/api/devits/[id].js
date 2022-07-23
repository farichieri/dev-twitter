import { firestore } from '../../../firebase/admin';

export default (request, response) => {
  const { query } = request;
  const { id } = query;
  firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;
      if (data) {
        response.json({ ...data, id, createdAt: +createdAt.toDate() });
      } else {
        response.status(404).end();
      }
    });
};
