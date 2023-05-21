import { table, getMinifiedRecord } from './utils/airtable';

export default async function handler(req, res) {
  const { id, fields } = req.body;

  try {
    const updatedRecords = await table.update([{ fields: { id, fields } }]);
    res.status(200).json(getMinifiedRecord(updatedRecords[0]));
  } catch {
    res.status(500).json({ msg: 'something went wrong' });
  }
}
