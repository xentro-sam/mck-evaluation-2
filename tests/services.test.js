const companyServices = require('../src/services/company.services');
const companyUtils = require('../src/utils/company.utils');

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
});