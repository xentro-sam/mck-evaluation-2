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

module.exports = {
    saveCompanies,
    getCompanies
};