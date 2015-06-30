'use strict';

var FDASearchModel = function (requestQueryData, apiKey, infoDetail) {
	var DEFAULT_LIMIT = 10;
    var term = requestQueryData.drug;
    var mode = requestQueryData.mode;

    function toSearchQueryString() {
    	var searchValue = '';
        var resultsLimit = (infoDetail === true) ? 1 : DEFAULT_LIMIT;

        if (!mode || mode === undefined) {
            mode = 'name';
        }

    	if (mode === 'name') {
			  searchValue = 'openfda.brand_name:' + term + '+' + 'openfda.generic_name:' + term;
    	} else if (mode === 'use') {
    		searchValue = 'purpose:' + term + '+' + 'indications_and_usage:' + term;
    	} else if (mode === 'all') {
            searchValue = 'purpose:' + term + '+' + 'indications_and_usage:' + term + '+' + 
                'openfda.brand_name:' + term + '+' + 'openfda.generic_name:' + term;    
    	} else {

        }

        var apiKeyValue = (apiKey !== undefined && apiKey !== '') ? '&api_key=' + apiKey : '';
    	return '?search=' + searchValue + '&limit=' + resultsLimit + apiKeyValue;
    }

    return {
        term: term,
        mode: mode,
        query: toSearchQueryString
    };
};

module.exports = FDASearchModel;
