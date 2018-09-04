export const apiRequest = (url, apiMethod, data, token) =>{
  let baseUrl = "http://localhost:41096";
  let params = {};
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if(apiMethod)
    params["method"] = apiMethod;

  if(data)
    params["body"] = JSON.stringify(data);

  if(token)
    headers['X-Auth-Token'] = token;

  params["headers"] = headers;

  return new Request(baseUrl + url, params);
}
