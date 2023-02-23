const db = require('../../db/models');
const scoreUtils = require('./score.utils');
const axios = require('axios');

const COMPANYURL = 'http://54.167.46.10/company/';

const saveCompanies = async (sectorData, sector) => {
    await sectorData.forEach(async (company) => {
        const companyId = company.companyId;
        try {
            const companyDataResponse = await axios.get(COMPANYURL + companyId);
            const companyData = companyDataResponse.data;
            const companyScore = scoreUtils.getCompanyScore(company.performanceIndex);
            await db.Companies.create({
                id: companyData.id,
                name: companyData.name,
                ceo: companyData.ceo,
                score: companyScore,
                sector: sector
            });
        }
        catch (error) {
            throw new Error(error);
        }
    });
};

module.exports = {
    saveCompanies
}