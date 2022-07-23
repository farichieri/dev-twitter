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
      if (data) {
        response.json(data);
      } else {
        response.status(404).end();
      }
    });
};
