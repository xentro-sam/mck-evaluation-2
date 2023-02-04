const { getCompanyObjects, getSectors, saveCompaniesFromSectors, insertRanking } = require('../utils/company.utils');
const db = require('../../db/models');

const saveCompanies = async (url) => {
    const companiesToSave = await getCompanyObjects(url);
    const sectorList = await getSectors(companiesToSave);
    await saveCompaniesFromSectors(sectorList);
}

const getCompanies = async (sector) => {
    let companies = await db.Companies.findAll({ where: { sector }, order: [['score', 'DESC']]});
    if(!companies.length) {
        throw new Error('No companies found');
    }
    companies = await insertRanking(companies);
    return companies;
}

const updateCompany = async (id, companyData) => {
    let company = await db.Companies.findAll({ where: { id }});
    if(!company) {
        throw new Error('Company not found');
    }
    company = {...company, ...companyData};
    await db.Companies.update(companyData, { where: { id }});
    company = await db.Companies.findAll({ where: { id }});
    return company;
}

module.exports = {
    saveCompanies,
    getCompanies,
    updateCompany
};