import { table, minifyRecords } from './utils/airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  if (req.method === 'GET') {
    try {
      const records = await table
        .select({
          filterByFormula: `userid = '${user.sub}'`,
        })
        .firstPage();

      const minifiedRecords = minifyRecords(records);
      res.status(200).json(minifiedRecords);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'something went wrong' });
    }
  } else {
    res.status(405).json({ msg: 'Method not allowed' });
  }
});
