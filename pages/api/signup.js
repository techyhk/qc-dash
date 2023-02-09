import { createUser } from '../../lib/user';

export default async function signup(req, res) {
  try {
    if (req.method === 'POST') {
      await createUser(req.body);
      res.status(200).send({ done: true });
    } else {
      res.status(400).json({ message: 'Invalid request method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}