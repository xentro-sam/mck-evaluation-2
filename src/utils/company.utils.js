const axios = require('axios');

const COMPANYURL = 'http://54.167.46.10/company/';

const getCompanyObjects = (company) => {
    const companyData = company.split('\n');
    let companyObjects = companyData.map((company) => {
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


module.exports = {
    getCompanyObjects,
    getCompanyScore,
}