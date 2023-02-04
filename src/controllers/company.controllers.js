const companyService = require('../services/company.services');

const saveCompanies = async (req, res) => {
  const url = req.body.urlLink;
  try {
    await companyService.saveCompanies(url);
    res.status(200).json({ message: 'Companies saved successfully' });
  } 
  catch (error) {
    res.status(400).json({ message: 'Error saving companies' });
  }
};

const getCompanies = async (req, res) => {
  const sector = req.query.sector;
  try {
    const companies = await companyService.getCompanies(sector);
    res.status(200).json(companies);
  }
  catch (error) {
    res.status(400).json({ message: 'Error getting companies' });
  }
};

const updateCompany = async (req, res) => {
  const { id }= req.params;
  const companyData = req.body;
  try {
    const updatedData = await companyService.updateCompany(id, companyData);
    res.status(200).json(updatedData);
  }
  catch (error) {
    res.status(400).json({ message: 'Error updating company' });
  }
};

module.exports = {
  saveCompanies,
  getCompanies,
  updateCompany
};