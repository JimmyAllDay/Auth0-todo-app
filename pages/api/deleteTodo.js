import { table, getMinifiedRecord } from './utils/airtable';

export default async function handler(req, res) {
  const { id, fields } = req.body;

  try {
    const deletedRecords = await table.destroy([id]);
    res.status(200).json(getMinifiedRecord(deletedRecords[0]));
  } catch {
    res.status(500).json({ msg: 'something went wrong' });
  }
}
