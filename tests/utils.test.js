const companyUtils = require('../src/utils/company.utils');
const axios = require('axios');
const db = require('../db/models');

describe('Company utils', () => {
    describe('getCompanyObjects', () => {
        it('should get company objects', async () => {
            const spy = jest.spyOn(companyUtils, 'getCompanyObjects');
            const spyAxios = jest.spyOn(axios, 'get');
            spyAxios.mockImplementation(() => {
                return Promise.resolve({
                    data:
                        "company_id,company_sector\n" +
                        "95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile\n" +
                        "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc,Software\n" +
                        "728ae3b7-89dd-41eb-9608-4fc20c839d4c,Automobile\n" +
                        "8727cc61-8c4b-4285-8853-2db808392c04,Software\n" +
                        "e90a7bc7-47fa-49af-bfa1-391fe7768b56,Software"
                });
            });
            await companyUtils.getCompanyObjects('http://example.com');
            expect(spy).toHaveBeenCalled();
            expect(spyAxios).toHaveBeenCalled();
            const mockResponse = await spy.mock.results[0].value;
            expect(mockResponse).toEqual([
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
    describe('getCompanyScore', () => {
        it('should get company score', () => {
            const performanceIndex = [
                {
                    key: 'cpi',
                    value: 10,
                },
                {
                    key: 'mau',
                    value: 10,
                },
                {
                    key: 'cf',
                    value: 10000,
                },
                {
                    key: 'roic',
                    value: 10,
                },
            ];
            const companyScore = companyUtils.getCompanyScore(performanceIndex);
            expect(companyScore).toBe(52.75);
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
            const spy = jest.spyOn(companyUtils, 'saveCompaniesFromSectors');
            const spyAxios = jest.spyOn(axios, 'get');
            spyAxios.mockImplementation(() => {
                return Promise.resolve({
                    data:
                        [{
                            "companyId": "8888888888-888888-009900-999999999",
                            "performanceIndex": [{
                                "key": "cpi",
                                "value": 0.2
                            }, {
                                "key": "cf",
                                "value": 30000
                            }, {
                                "key": "mau",
                                "value": 0.1
                            }, {
                                "key": "roic",
                                "value": 20
                            }],
                        },
                        {
                            "companyId": "9999999999-999998-009900-999999999",
                            "performanceIndex": [{
                                "key": "cpi",
                                "value": 0.2
                            }, {
                                "key": "cf",
                                "value": 50000
                            }, {
                                "key": "mau",
                                "value": 0.1
                            }, {
                                "key": "roic",
                                "value": 20
                            }],
                        }]
                });
            });
            await companyUtils.saveCompaniesFromSectors(['Automobile', 'Software']);
            expect(spy).toHaveBeenCalled();
            expect(spyAxios).toHaveBeenCalled();
        });
    });
    describe('saveCompanies', () => {
        it('should save companies', async () => {
            const spy = jest.spyOn(companyUtils, 'saveCompanies');
            const spyAxios = jest.spyOn(axios, 'get');
            const spyDb = jest.spyOn(db.Companies, 'create');
            spyAxios.mockImplementation(() => {
                return Promise.resolve({
                    data:
                        {
                            "id": "b6472c52-732a-4fd2-a463-ae604c0a2c79",
                            "name": "Microsoft",
                            "description": "Sapiente earum molestiae molestias maxime numquam rem esse quos excepturi. Nihil accusamus sequi ipsa. Harum cupiditate ipsa. Eveniet corporis est nemo officia numquam non fugiat. Incidunt mollitia atque officia doloribus voluptatem. Sint repellendus velit.",
                            "ceo": "Gary Hauck",
                            "tags": [
                                "dynamic",
                                "front-end",
                                "24/7",
                                "front-end",
                                "dynamic",
                                "user-centric"
                            ]
                        }
                });
            });
            const sectorData = [{
                "companyId": "8888888888-888888-009900-999999999",
                "performanceIndex": [{
                    "key": "cpi",
                    "value": 0.2
                }, {
                    "key": "cf",
                    "value": 30000
                }, {
                    "key": "mau",
                    "value": 0.1
                }, {
                    "key": "roic",
                    "value": 20
                }],
            },
            {
                "companyId": "9999999999-999998-009900-999999999",
                "performanceIndex": [{
                    "key": "cpi",
                    "value": 0.2
                }, {
                    "key": "cf",
                    "value": 50000
                }, {
                    "key": "mau",
                    "value": 0.1
                }, {
                    "key": "roic",
                    "value": 20
                }],
            }]
            const sector = 'Automobile';
            await companyUtils.saveCompanies(sectorData, sector);
            expect(spy).toHaveBeenCalled();
            expect(spyAxios).toHaveBeenCalled();
            expect(spyDb).toHaveBeenCalled();
        });
    });
    describe('insertRanking', () => {
        it('should insert ranking', async () => {
            const spy = jest.spyOn(companyUtils, 'insertRanking');
            const data = [{
                dataValues: {
                    "id": "8888888888-888888-009900-999999999",
                    "name": "Microsoft",
                    "ceo": "Gary Hauck",
                    "score": 52.75,
                    "sector": "Automobile",
                    "updatedAt": "2020-05-18T12:00:00.000Z",
                    "createdAt": "2020-05-18T12:00:00.000Z"
                }
            }];
            await companyUtils.insertRanking(data);
            expect(spy).toHaveBeenCalled();
            const mockResponse = await spy.mock.results[0].value;
            expect(mockResponse).toEqual([{
                dataValues: {
                    "id": "8888888888-888888-009900-999999999",
                    "name": "Microsoft",
                    "ceo": "Gary Hauck",
                    "score": 52.75,
                    "sector": "Automobile",
                    "updatedAt": "2020-05-18T12:00:00.000Z",
                    "createdAt": "2020-05-18T12:00:00.000Z",
                    "ranking": 1
                }
            }]);
        });
    });
});
