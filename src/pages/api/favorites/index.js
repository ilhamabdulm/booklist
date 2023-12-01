import dbConnect from '../../../lib/mongodb';
import Favorite from '../../../models/Favorite';

export default async function handler(req, res) {
  const { method } = req;

  console.log({ method });
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const favorites = await Favorite.find(
          {}
        ).lean(); /* find all the data in our database */
        res.status(200).json({ success: true, data: favorites });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const founded = await Favorite.findOne({ id: req.body.id });

        if (founded) {
          res.status(200).json({
            success: true,
            data: {},
            message: 'Sudah ada di dalam list favorit kamu',
          });

          return;
        }
        const favorite = await Favorite.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: favorite });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        await Favorite.findOneAndDelete({ id: req.query.id });

        res.status(200).json({ success: true, data: null });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
