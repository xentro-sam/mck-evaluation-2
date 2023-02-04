const companyServices = require('../src/services/company.services');
const companyUtils = require('../src/utils/company.utils');
const db = require('../db/models');

describe('Company services', () => {
    describe('saveCompanies', () => {
        it('should save companies', async () => {
            const spy = jest.spyOn(companyServices, 'saveCompanies');
            const spyUtilsCompanies = jest.spyOn(companyUtils, 'getCompanyObjects');
            const spyUtilsSectors = jest.spyOn(companyUtils, 'getSectors');
            const spyUtilsSave = jest.spyOn(companyUtils, 'saveCompaniesFromSectors');
            spyUtilsCompanies.mockImplementation(() => {
                return Promise.resolve();
            });
            spyUtilsSectors.mockImplementation(() => {
                return Promise.resolve();
            });
            spyUtilsSave.mockImplementation(() => {
                return Promise.resolve();
            });
            await companyServices.saveCompanies('http://example.com');
            expect(spy).toHaveBeenCalled();
        });
        it('should not save companies', async () => {
            const spy = jest.spyOn(companyServices, 'saveCompanies');
            const spyUtilsCompanies = jest.spyOn(companyUtils, 'getCompanyObjects');
            const spyUtilsSectors = jest.spyOn(companyUtils, 'getSectors');
            const spyUtilsSave = jest.spyOn(companyUtils, 'saveCompaniesFromSectors');
            spyUtilsCompanies.mockImplementation(() => {
                return Promise.reject();
            });
            spyUtilsSectors.mockImplementation(() => {
                return Promise.reject();
            });
            spyUtilsSave.mockImplementation(() => {
                return Promise.reject();
            });
            await companyServices.saveCompanies('http://example.com');
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('getCompanies', () => {
        it('should get companies', async () => {
            const spy = jest.spyOn(companyServices, 'getCompanies');
            const spyUtilsCompanies = jest.spyOn(companyUtils, 'insertRanking');
            const spyDb = jest.spyOn(db.Companies, 'findAll');
            spyDb.mockResolvedValue([{
                dataValues: {
                    id: 1,
                    name: 'Company 1',
                    ceo: 'CEO 1',
                    sector: 'sector',
                    score: 1
            }}]);
            spyUtilsCompanies.mockImplementation(() => {
                return Promise.resolve();
            });
            await companyServices.getCompanies('sector');
            expect(spy).toHaveBeenCalled();
            expect(spyDb).toHaveBeenCalled();
            const mockResolvedValue = await spy.mock.results[0].value;
            expect(mockResolvedValue[0].dataValues).toEqual({
                id: 1,
                name: 'Company 1',
                ceo: 'CEO 1',
                sector: 'sector',
                score: 1,
                ranking: 1
            });
        });
        it('should not get companies', async () => {
            const spy = jest.spyOn(companyServices, 'getCompanies');
            const spyDb = jest.spyOn(db.Companies, 'findAll');
            spyDb.mockResolvedValue([]);
            try {
                await companyServices.getCompanies('sector');
                expect(spy).toHaveBeenCalled();
                expect(spyDb).toHaveBeenCalled();
            }
            catch (err) {
                expect(err).toEqual(new Error('No companies found'));
            }
        });
    });
    describe('updateCompany', () => {
        it('should update company', async () => {
            const spy = jest.spyOn(companyServices, 'updateCompany');
            const spyDb = jest.spyOn(db.Companies, 'findAll');
            const spyDbUpdate = jest.spyOn(db.Companies, 'update');
            const data = [{
                dataValues: {
                    id: 1,
                    name: 'Company 1',
                    ceo: 'CEO 1',
                    sector: 'sector',
                    score: 1
            }}];
            spyDb.mockResolvedValue(data);
            spyDbUpdate.mockResolvedValue([1]);
            await companyServices.updateCompany(1, {
                ceo: 'CEO 2',
            });
            expect(spy).toHaveBeenCalled();
            expect(spyDb).toHaveBeenCalled();
            expect(spyDbUpdate).toHaveBeenCalled();
            data[0].dataValues.ceo = 'CEO 2';
            const mockResolvedValue = await spy.mock.results[0].value;
            expect(mockResolvedValue[0].dataValues).toEqual({
                id: 1,
                name: 'Company 1',
                ceo: 'CEO 2',
                sector: 'sector',
                score: 1
            });
        });
        it('should not update company', async () => {
            const spy = jest.spyOn(companyServices, 'updateCompany');
            const spyDb = jest.spyOn(db.Companies, 'findAll');
            spyDb.mockResolvedValue([]);
            try {
                await companyServices.updateCompany(1, {
                    name: 'Company 1',
                    ceo: 'CEO 1',
                    sector: 'sector',
                    score: 1
                });
                expect(spy).toHaveBeenCalled();
                expect(spyDb).toHaveBeenCalled();
            }
            catch (err) {
                expect(err).toEqual(new Error('Company not found'));
            }
        });
    });
});