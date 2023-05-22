import { table, minifyRecords } from './utils/airtable';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const records = await table.select({}).firstPage();
      const minifiedRecords = minifyRecords(records);
      res.status(200).json(records);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'something went wrong' });
    }
  } else {
    res.status(405).json({ msg: 'Method not allowed' });
  }
}
