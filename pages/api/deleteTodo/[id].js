import { table, getMinifiedRecord } from '@/pages/api/utils/airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  if (req.method === 'DELETE') {
    const { id } = req.query;
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
});
