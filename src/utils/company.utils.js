const axios = require('axios');
const db = require('../../db/models');

const COMPANYURL = 'http://54.167.46.10/company/';
const SECTORURL = 'http://54.167.46.10/sector?name='

const getCompanyObjects = async (url) => {
    try {
        const response = await axios.get(url);
        const companies = response.data;
        const companiesData = companies.split('\n');
        let companyObjects = companiesData.map((company) => {
            const companyInfo = company.split(',');
            const companyObject = {
                companyId: companyInfo[0],
                companySector: companyInfo[1],
            };
            return companyObject;
        });
        companyObjects = companyObjects.slice(1);
        return companyObjects;
    }
    catch (error) {
        return error;
    }
}

const getCompanyScore = (performanceIndex) => {
    let companyScore = 0;
    performanceIndex.forEach((index) => {
        if(index.key === 'cpi' || index.key === 'mau') {
            companyScore += index.value * 10;
        }
        else if(index.key === 'cf') {
            companyScore += index.value / 10000;
        }
        else if(index.key === 'roic') {
            companyScore += index.value;
        }
    });
    companyScore /= 4;
    return companyScore;
}

const getSectors = async (companies) => {
    let sectorSet = new Set();
    companies.forEach((company) => {
        sectorSet.add(company.companySector);
    });
    return Array.from(sectorSet);
}

const saveCompaniesFromSectors = async (sectorList) => {
    await sectorList.forEach(async (sector) => {
        try {
            const response = await axios.get(SECTORURL + sector);
            const sectorData = response.data;
            await saveCompanies(sectorData, sector);
        }
        catch (error) {
            return error;
        }
    });
}

const saveCompanies = async (sectorData, sector) => {
    await sectorData.forEach(async (company) => {
        const companyId = company.companyId;
        try {
            const companyDataResponse = await axios.get(COMPANYURL + companyId);
            const companyData = companyDataResponse.data;
            const companyScore = getCompanyScore(company.performanceIndex);
            await db.Companies.create({
                id: companyData.id,
                name: companyData.name,
                ceo: companyData.ceo,
                score: companyScore,
                sector: sector
            });
        }
        catch (error) {
            return;
        }
    });
}

const insertRanking = async (companies) => {
    let ranking = 1;
    companies.forEach((company) => {
        company.dataValues.ranking = ranking;
        ranking++;
    });
    return companies;
}

module.exports = {
    getCompanyObjects,
    getCompanyScore,
    getSectors,
    saveCompaniesFromSectors,
    saveCompanies,
    insertRanking
}