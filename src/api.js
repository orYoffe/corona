const API =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

const getData = async () => {
  const j = await fetch(API);
  const d = j.json();
  return d;
};

export default getData;
