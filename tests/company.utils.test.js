const companyUtils = require('../src/utils/company.utils');
const dbUtils = require('../src/utils/db.utils');
const axios = require('axios');

describe('Company utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('getCompanyObjects', () => {
    it('should get company objects', async () => {
      //const spy = jest.spyOn(companyUtils, 'getCompanyObjects');
      const spyAxios = jest.spyOn(axios, 'get');
      spyAxios.mockImplementation(() => {
        return Promise.resolve({
          data:
                        'company_id,company_sector\n' +
                        '95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile\n' +
                        '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc,Software\n' +
                        '728ae3b7-89dd-41eb-9608-4fc20c839d4c,Automobile\n' +
                        '8727cc61-8c4b-4285-8853-2db808392c04,Software\n' +
                        'e90a7bc7-47fa-49af-bfa1-391fe7768b56,Software'
        });
      });
      const res = await companyUtils.getCompanyObjects('http://example.com');
      //expect(spy).toHaveBeenCalled();
      expect(spyAxios).toHaveBeenCalled();
      //const mockResponse = await spy.mock.results[0].value;
      expect(res).toEqual([
        {
          companyId: '95b5a067-808a-44a9-a490-b4ef8a045f61',
          companySector: 'Automobile',
        },
        {
          companyId: '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
          companySector: 'Software',
        },
        {
          companyId: '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
          companySector: 'Automobile',
        },
        {
          companyId: '8727cc61-8c4b-4285-8853-2db808392c04',
          companySector: 'Software',
        },
        {
          companyId: 'e90a7bc7-47fa-49af-bfa1-391fe7768b56',
          companySector: 'Software',
        },
      ]);
    });
  });
  describe('getSectors', () => {
    it('should get sectors', async () => {
      const companies = [
        {
          companySector: 'Automobile',
        },
        {
          companySector: 'Software',
        },
        {
          companySector: 'Automobile',
        },
        {
          companySector: 'Software',
        },
        {
          companySector: 'Software',
        },
      ];
      const sectorList = await companyUtils.getSectors(companies);
      expect(sectorList).toEqual(['Automobile', 'Software']);
    });
  });
  describe('saveCompaniesFromSectors', () => {
    it('should save companies from sectors', async () => {
      //const spy = jest.spyOn(companyUtils, 'saveCompaniesFromSectors');
      const spyAxios = jest.spyOn(axios, 'get');
      const spySaveCompanies = jest.spyOn(dbUtils, 'saveCompanies');
      spyAxios.mockImplementation(() => {
        return Promise.resolve({
          data:
                        [{
                          'companyId': '8888888888-888888-009900-999999999',
                          'performanceIndex': [{
                            'key': 'cpi',
                            'value': 0.2
                          }, {
                            'key': 'cf',
                            'value': 30000
                          }, {
                            'key': 'mau',
                            'value': 0.1
                          }, {
                            'key': 'roic',
                            'value': 20
                          }],
                        },
                        {
                          'companyId': '9999999999-999998-009900-999999999',
                          'performanceIndex': [{
                            'key': 'cpi',
                            'value': 0.2
                          }, {
                            'key': 'cf',
                            'value': 50000
                          }, {
                            'key': 'mau',
                            'value': 0.1
                          }, {
                            'key': 'roic',
                            'value': 20
                          }],
                        }]
        });
      });
      spySaveCompanies.mockImplementation(() => {
        return Promise.resolve();
      });
      await companyUtils.saveCompaniesFromSectors(['Automobile', 'Software']);
      //expect(spy).toHaveBeenCalled();
      expect(spyAxios).toHaveBeenCalled();
      expect(spySaveCompanies).toHaveBeenCalled();
    });
  });
  describe('saveCompaniesFromSectors', () => {
    it('should not save companies from sectors', async () => {
      const spyAxios = jest.spyOn(axios, 'get');
      const spySaveCompanies = jest.spyOn(dbUtils, 'saveCompanies');
      spyAxios.mockImplementation(() => {
        return Promise.reject(
          new Error('Error while fetching data from url')
        );
      });
      spySaveCompanies.mockImplementation(() => {
        return Promise.reject();
      });
      await expect(async () => await companyUtils.saveCompaniesFromSectors(['Automobile', 'Software'])).rejects.toThrow(Error);
      expect(spyAxios).toHaveBeenCalled();
      expect(spySaveCompanies).not.toHaveBeenCalled();
    });
  });
  describe('insertRanking', () => {
    it('should insert ranking', async () => {
      //const spy = jest.spyOn(companyUtils, 'insertRanking');
      const data = [{
        dataValues: {
          'id': '8888888888-888888-009900-999999999',
          'name': 'Microsoft',
          'ceo': 'Gary Hauck',
          'score': 52.75,
          'sector': 'Automobile',
          'updatedAt': '2020-05-18T12:00:00.000Z',
          'createdAt': '2020-05-18T12:00:00.000Z'
        }
      }];
      const response = await companyUtils.insertRanking(data);
      expect(response).toEqual([{
        dataValues: {
          'id': '8888888888-888888-009900-999999999',
          'name': 'Microsoft',
          'ceo': 'Gary Hauck',
          'score': 52.75,
          'sector': 'Automobile',
          'updatedAt': '2020-05-18T12:00:00.000Z',
          'createdAt': '2020-05-18T12:00:00.000Z',
          'ranking': 1
        }
      }]);
    });
  });
});
