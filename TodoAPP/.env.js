const fs = require('fs');

const API_URL = process.env.REACT_APP_API_URL || '';
const API_KEY = process.env.REACT_APP_API_KEY || '';
const APP_ID = process.env.APP_ID || '';
const PROJECT_ID = process.env.PROJECT_ID || '';
const SERVICE_NAME = process.env.SERVICE_NAME || '';
const DATABASE_NAME = process.env.DATABASE_NAME || '';
const DATABASE_COLLECTION = process.env.DATABASE_COLLECTION || '';

const content = `
REACT_APP_API_URL=${API_URL}
REACT_APP_API_KEY=${API_KEY}
APP_ID=${APP_ID}
PROJECT_ID=${PROJECT_ID}
SERVICE_NAME=${SERVICE_NAME}
DATABASE_NAME=${DATABASE_NAME}
DATABASE_COLLECTION=${DATABASE_COLLECTION}
`;

fs.writeFile('.env', content, (err) => {
  if (err) {
    console.error(err);
  }
});
