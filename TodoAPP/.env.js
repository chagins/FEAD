const fs = require('fs');

const API_URL = process.env.REACT_APP_API_URL || '';
const API_KEY = process.env.REACT_APP_API_KEY || '';
const content = `
REACT_APP_API_URL=${API_URL}
REACT_APP_API_KEY=${API_KEY}
`;

fs.writeFile('.env', content, (err) => {
  if (err) {
    console.error(err);
  }
});
