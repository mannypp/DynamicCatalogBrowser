var http = require('../ocapi');
var Shop = require('../Shop');
var utils = require('../utils');
exports.search = function(queryString, handler) {
	//http.request('product_search', "GET", {q: queryString, expand: "availability,images,prices,variations"}, handler);
	Shop.getProductSearch({
			$queryParameters: {},
		  q: queryString,
			expand: "availability,images,prices,variations"
	})
	.done(function(res){
		handler.onload(res.body);
	})
	.fail(function(res){
		handler.onerror(res.response);
	})

};
