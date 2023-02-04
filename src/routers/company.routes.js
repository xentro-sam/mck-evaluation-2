const express = require('express');
const companyControllers = require('../controllers/company.controllers');

const CompanyRoutes = express.Router();

CompanyRoutes.post('/api/save', companyControllers.saveCompanies);
CompanyRoutes.get('/api/companies', companyControllers.getCompanies);
CompanyRoutes.patch('/api/companies/:id', companyControllers.updateCompany);

module.exports = CompanyRoutes;