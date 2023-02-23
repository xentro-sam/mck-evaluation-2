const dbUtils = require('../src/utils/db.utils');
const db = require('../db/models');
const axios = require('axios');

describe('saveCompanies', () => {
    it('should save companies', async () => {
        //const spy = jest.spyOn(dbUtils, 'saveCompanies');
        const spyAxios = jest.spyOn(axios, 'get');
        const spyDb = jest.spyOn(db.Companies, 'create');
        spyAxios.mockImplementation(() => {
            return Promise.resolve({
                data:
                {
                    'id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
                    'name': 'Microsoft',
                    'description': 'Sapiente earum molestiae molestias maxime numquam rem esse quos excepturi. Nihil accusamus sequi ipsa. Harum cupiditate ipsa. Eveniet corporis est nemo officia numquam non fugiat. Incidunt mollitia atque officia doloribus voluptatem. Sint repellendus velit.',
                    'ceo': 'Gary Hauck',
                    'tags': [
                        'dynamic',
                        'front-end',
                        '24/7',
                        'front-end',
                        'dynamic',
                        'user-centric'
                    ]
                }
            });
        });
        spyDb.mockImplementation(() => {
            return Promise.resolve();
        });
        const sectorData = [{
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
        }];
        const sector = 'Automobile';
        await dbUtils.saveCompanies(sectorData, sector);
        //expect(spy).toHaveBeenCalled();
        expect(spyAxios).toHaveBeenCalled();
        expect(spyDb).toHaveBeenCalled();
    });
});