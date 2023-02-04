const { getCompanyObjects, getSectors, saveCompaniesFromSectors } = require('../utils/company.utils');

const saveCompanies = async (url) => {
    const companiesToSave = await getCompanyObjects(url);
    const sectorList = await getSectors(companiesToSave);
    await saveCompaniesFromSectors(sectorList);
}

module.exports = {
    saveCompanies,
};