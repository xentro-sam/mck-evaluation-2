const express = require('express');
const app = express();
const CompanyRoutes = require('./src/routers/company.routes');
const PORT = 3000;

app.use(express.json());

app.use(CompanyRoutes);

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});