var utils = require("./utils");
var cache = require("./cache");
var _ = require('underscore');
var cacheExpiration = 1;
var cacheEnabled = true;


function request(requestObj, callback) {

  function assembleRequestUrl(uri , method, queryParams) {
    var url = '';
    if(method && uri){
      if(method === 'GET' && !_.isEmpty(queryParams)){
        queryParams.client_id = utils.getAPIKey();
        return uri +'?' + assembleRequestParameterString(queryParams);
      }else{
        return uri;
      }
    }

    utils.error("request", 'No method or uri was specified to generate a url');
    return ;
  }

  function assembleRequestParameterString(params) {
      var paramString = '';
      if (params) {
          for (var key in params) {
              paramString += encodeURI(key + '=' + params[key]) + "&";
          }
      }
      return paramString;
  }
	function handleRequestResult(e) {
    var obj = JSON.parse(e);
    cache.set(url, obj, cacheExpiration);
	}

  function checkCache(url) {
      if (!cacheEnabled){
          return false;
      }

      var obj = cache.get(url);
      if (obj !== undefined) {
          utils.log("request", "Cache hit: " + url);
          callback(null,obj.responseObj,obj.obj);
          return true;
      }
      utils.log("request", "Cache miss: " + url);
      return false;
  }

  function getRequestParams(req){
    var reqParams = {};
    if(req.method){
      reqParams.method = req.method;
    }else{
      utils.error("request", 'No method was specified for this request');
      return;
    }

    if(req.headers){
      reqParams.headers = req.headers;
    }

    if(req.method != 'GET' && req.method  != 'HEAD' ){
        req.qs.client_id = utils.getAPIKey();
        reqParams.body = JSON.stringify(req.qs);
    }

    return reqParams;
  }

  function sendRequest(url,req) {


      if(checkCache(url)){
        return;
      }
      utils.log("request", "Sending request: " + url);
      var currentResponse;
      fetch(url, req)
          .then((response) => {
              currentResponse = response;
              _.each(response.headers.map,function(value,key){
                  currentResponse.headers[key] = value.join(',')
              });
              currentResponse.statusCode = response.status;
              return response.text();
          })
          .then((responseText) => {
              cache.set(url, responseText, cacheExpiration, currentResponse);
              callback(null,currentResponse,responseText);
              return;
          })
          .catch((error) => {
              callback(error, currentResponse, null);
          })
          .done();
  }

  sendRequest(assembleRequestUrl(requestObj.uri,requestObj.method,requestObj.qs), getRequestParams(requestObj));
};

module.exports = request;
