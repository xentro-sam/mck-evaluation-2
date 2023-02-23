const axios = require('axios');
const dbUtils = require('./db.utils');

const SECTORURL = 'http://54.167.46.10/sector?name=';

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
};

const getSectors = async (companies) => {
  let sectorSet = new Set();
  companies.forEach((company) => {
    sectorSet.add(company.companySector);
  });
  return Array.from(sectorSet);
};

const saveCompaniesFromSectors = async (sectorList) => {
  await sectorList.forEach(async (sector) => {
    try {
      const response = await axios.get(SECTORURL + sector);
      const sectorData = response.data;
      await dbUtils.saveCompanies(sectorData, sector);
    }
    catch (error) {
      throw new Error(error);
    }
  });
};

const insertRanking = async (companies) => {
  let ranking = 1;
  companies.forEach((company) => {
    company.dataValues.ranking = ranking;
    ranking++;
  });
  return companies;
};

module.exports = {
  getCompanyObjects,
  getSectors,
  saveCompaniesFromSectors,
  insertRanking
};