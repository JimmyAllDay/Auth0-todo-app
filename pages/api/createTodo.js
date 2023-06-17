import { table, getMinifiedRecord } from './utils/airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);

  if (req.method === 'POST') {
    const { description } = req.body;
    try {
      const createdRecords = await table.create([
        { fields: { description, userid: user.sub } },
      ]);
      const createdRecord = {
        id: createdRecords[0].id,
        fields: createdRecords[0].fields,
      };
      res.status(200).json(getMinifiedRecord(createdRecord));
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'something went wrong' });
    }
  } else {
    res.status(405).json({ msg: 'Method not allowed' });
  }
});
