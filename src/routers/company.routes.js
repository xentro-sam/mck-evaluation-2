const express = require('express');
const companyControllers = require('../controllers/company.controllers');

const CompanyRoutes = express.Router();

CompanyRoutes.post('/api/save', companyControllers.saveCompanies);

module.exports = CompanyRoutes;