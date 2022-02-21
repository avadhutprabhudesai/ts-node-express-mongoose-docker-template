import express from 'express';

const app = express();

const prom = new Promise((res) => {
  res('Hello');
});

app.get('/', async (req, res) => {
  const result = await prom;
  res.status(200).send(result);
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
