const db = require('../../db/models');
const axios = require('axios');
const { getCompanyObjects, getCompanyScore } = require('../utils/company.utils');

const COMPANYURL = 'http://54.167.46.10/company/';
const SCOREURL = 'http://54.167.46.10/sector?name='

const saveCompanies = async (url) => {
    const response = await axios.get(url);
    const companies = response.data;
    const companiesToSave = getCompanyObjects(companies);
    const companySectorsSet = new Set();
    companiesToSave.forEach((company) => {
        companySectorsSet.add(company.companySector);
    });
    companySectorsSet.forEach(async (sector) => {
        const sectorResponse = await axios.get(SCOREURL + sector);
        const sectorScore = sectorResponse.data;
        sectorScore.forEach(async (company) => {
            const companyScore = getCompanyScore(company.performanceIndex);
            try {
                const companyDataResponse = await axios.get(COMPANYURL + company.companyId);
                const companyData = companyDataResponse.data;
                const companyToSave = {
                    id: company.companyId,
                    name: companyData.name,
                    ceo: companyData.ceo,
                    score: companyScore,
                    sector: sector,
                };
                await db.Companies.create(companyToSave);
            }
            catch (error) {
                return;
            }
        });
    });
};

module.exports = {
    saveCompanies,
};