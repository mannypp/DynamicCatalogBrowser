var http = require('../ocapi');
var Shop = require('../Shop');
var utils = require('../utils');
exports.find = function(id, handler) {
	//http.request('products/' + id, "GET", {expand: "availability,bundled_products,links,promotions,options,images,prices,variations,set_products"}, handler);
	Shop.getProductsByID({
			$queryParameters: {},
			id:id,
			expand: "availability,bundled_products,links,promotions,options,images,prices,variations,set_products"
	})
	.done(function(res){
		handler.onload(res.body);
	})
	.fail(function(res){
		handler.onerror(res.response);
	})

};
