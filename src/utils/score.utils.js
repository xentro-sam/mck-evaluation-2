const getCompanyScore = (performanceIndex) => {
    let companyScore = 0;
    performanceIndex.forEach((index) => {
        if (index.key === 'cpi' || index.key === 'mau') {
            companyScore += index.value * 10;
        }
        else if (index.key === 'cf') {
            companyScore += index.value / 10000;
        }
        else if (index.key === 'roic') {
            companyScore += index.value;
        }
    });
    companyScore /= 4;
    return companyScore;
};

module.exports = {
    getCompanyScore
}