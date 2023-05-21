import { table, minifyRecords } from './utils/airtable';

export default async function handler(req, res) {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.status(200).json(records);
  } catch {
    res.status(500).json({ msg: 'something went wrong' });
  }
}
