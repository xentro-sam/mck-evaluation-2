const express = require('express');
const companyControllers = require('../controllers/company.controllers');

const CompanyRoutes = express.Router();

CompanyRoutes.post('/api/save', companyControllers.saveCompanies);
CompanyRoutes.get('/api/companies', companyControllers.getCompanies);

module.exports = CompanyRoutes;