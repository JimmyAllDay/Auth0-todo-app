import { table, getMinifiedRecord } from './utils/airtable';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const {
      updatedTodo: { id, fields },
    } = req.body;
    try {
      const updatedRecords = await table.update([{ id, fields }]);
      res.status(200).json(getMinifiedRecord(updatedRecords[0]));
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'something went wrong' });
    }
  } else {
    res.status(405).json({ msg: 'Method not allowed' });
  }
}
