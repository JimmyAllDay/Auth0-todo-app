import { table, getMinifiedRecord } from './utils/airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);

  if (req.method === 'PUT') {
    const {
      updatedTodo: {
        id,
        fields: { completed, description, timecreated },
      },
    } = req.body;

    const { timecreated: removedTimeCreated, ...updatedFields } =
      req.body.updatedTodo.fields;

    try {
      const updatedRecords = await table.update([
        { id, fields: updatedFields },
      ]);
      res.status(200).json(getMinifiedRecord(updatedRecords[0]));
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'something went wrong' });
    }
  } else {
    res.status(405).json({ msg: 'Method not allowed' });
  }
});
