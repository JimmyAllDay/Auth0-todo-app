import { table } from './utils/airtable';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { description } = req.body;
    try {
      const createdRecords = await table.create([{ fields: { description } }]);
      const createdRecord = {
        id: createdRecords[0].id,
        fields: createdRecords[0].fields,
      };
      const minifiedRecords = minifyRecords(records);
      res.status(200).json(createdRecord);
    } catch {
      res.status(500).json({ msg: 'something went wrong' });
    }
  } else {
    res.status(405).json({ msg: 'Method not allowed' });
  }
}
