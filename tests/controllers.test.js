const companyControllers = require('../src/controllers/company.controllers');
const companyServices = require('../src/services/company.services');

describe('Company controllers', () => {
    describe('saveCompanies', () => {
        it('should save companies', async () => {
            const spy = jest.spyOn(companyControllers, 'saveCompanies');
            const spyServices = jest.spyOn(companyServices, 'saveCompanies');
            const req = {
                body: {
                    urlLink: 'http://example.com',
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            spyServices.mockImplementation(() => {
                return Promise.resolve();
            });
            await companyControllers.saveCompanies(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Companies saved successfully' });
        });
        it('should not save companies', async () => {
            const spy = jest.spyOn(companyControllers, 'saveCompanies');
            const spyServices = jest.spyOn(companyServices, 'saveCompanies');
            const req = {
                body: {
                    urlLink: 'http://example.com',
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            spyServices.mockImplementation(() => {
                return Promise.reject();
            });
            await companyControllers.saveCompanies(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error saving companies' });
        });
    });
    describe('getCompanies', () => {
        it('should get companies', async () => {
            const spy = jest.spyOn(companyControllers, 'getCompanies');
            const spyServices = jest.spyOn(companyServices, 'getCompanies');
            const req = {
                query: {
                    sector: 'test',
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            spyServices.mockImplementation(() => {
                return Promise.resolve();
            });
            await companyControllers.getCompanies(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });
        it('should not get companies', async () => {
            const spy = jest.spyOn(companyControllers, 'getCompanies');
            const spyServices = jest.spyOn(companyServices, 'getCompanies');
            const req = {
                query: {
                    sector: 'test',
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            spyServices.mockImplementation(() => {
                return Promise.reject();
            });
            await companyControllers.getCompanies(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error getting companies' });
        });
    });
});