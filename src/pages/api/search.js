import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { q } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes`,
      {
        params: { q },
      }
    );

    res.status(200).json({
      query: q,
      message: 'Sukses',
      status: 200,
      data: response.data.items,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
    console.log(err, 'ERROR');
  }
}
