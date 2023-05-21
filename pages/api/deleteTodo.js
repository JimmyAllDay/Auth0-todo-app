import { table, getMinifiedRecord } from './utils/airtable';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    console.log('API request body: ', req.body);
    const { id } = req.body;
    try {
      const deletedRecords = await table.destroy([id]);
      res.status(200).json(getMinifiedRecord(deletedRecords[0]));
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'something went wrong' });
    }
  } else {
    res.status(405).json({ msg: 'Method not allowed' });
  }
}
