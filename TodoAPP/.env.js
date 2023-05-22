const fs = require('fs');

const API_URL = process.env.REACT_APP_API_URL || '';
const API_KEY = process.env.REACT_APP_API_KEY || '';
const APP_ID = process.env.REACT_APP_ID || '';
const PROJECT_ID = process.env.PROJECT_ID || '';

const content = `
REACT_APP_API_URL=${API_URL}
REACT_APP_API_KEY=${API_KEY}
REACT_APP_ID=${APP_ID}
PROJECT_ID=${PROJECT_ID}
`;

fs.writeFile('.env', content, (err) => {
  if (err) {
    console.error(err);
  }
});
