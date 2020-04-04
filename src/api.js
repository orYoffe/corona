const API =
  process.env.NODE_ENV === 'production'
    ? '/api/data'
    : 'http://localhost:5000/api/data';

const getData = async () => {
  const j = await fetch(API, {
    method: 'post',
    body: {},
  });
  const d = j.json();
  return d;
};

export default getData;
