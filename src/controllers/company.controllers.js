const companyService = require('../services/company.services');

const saveCompanies = async (req, res) => {
    const url = req.body.urlLink;
    const response = await companyService.saveCompanies(url);
    res.status(200).json({ message: 'Companies saved successfully' });
};

module.exports = {
    saveCompanies,
};