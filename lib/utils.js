var currency_symbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};
var host = "https://development-instore-dw.demandware.net";
var base = "/s/SiteGenesis/dw/shop/";
var version = "v15_9";
var client_id = "8d66a325-89ff-462e-8416-89dd49196c64";


exports.getShopAPIDomain = function(){
  return host + base + version;
};

exports.getAPIKey = function(){
  return client_id;
};

exports.getCurrencySymbol = function(currencyName) {
	if(currency_symbols[currencyName]!==undefined) {
	    return currency_symbols[currencyName];
	}
	return '';
};

exports.log = function(context, msg) {
   console.log(context + ": " + msg);
};

exports.error = function(context, msg) {
   console.log(context + ": ERROR: " + msg);
};

exports.warn = function(context, msg) {
   console.log(context + ": WARN: " + msg);
};

exports.trace = function(context, msg) {
   console.log(context + ": " + msg);
};
