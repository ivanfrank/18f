'use strict';

var DrugLabelModel = function (searchResponse) {
    var responseObject = JSON.parse(searchResponse);
    var hitCount = (responseObject.meta.results.limit < responseObject.meta.results.total) ? 
        responseObject.meta.results.limit : responseObject.meta.results.total;   //@TODO: handle 100+
    var brandNames = []; 
    var genericNames = [];
    var drugInfo = {};

    //take only the first drug matched
    if (responseObject.results[0].openfda !== undefined) {
        // has openFDA data
        drugInfo.brandName = responseObject.results[0].openfda.brand_name.toString();
        drugInfo.genericName = responseObject.results[0].openfda.generic_name.toString();
        drugInfo.indications = (responseObject.results[0].indications_and_usage) ? 
            responseObject.results[0].indications_and_usage.toString() : '';
        drugInfo.contraindications = (responseObject.results[0].contraindications) ? 
            responseObject.results[0].contraindications.toString() : '';
    } 

    return {
        drugInfo: drugInfo
    };
};

module.exports = DrugLabelModel;
