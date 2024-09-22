const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(helmet());
app.use(compression());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
