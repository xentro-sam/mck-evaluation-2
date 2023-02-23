const scoreUtils = require('../src/utils/score.utils');

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
        const companyScore = scoreUtils.getCompanyScore(performanceIndex);
        expect(companyScore).toBe(52.75);
    });
});