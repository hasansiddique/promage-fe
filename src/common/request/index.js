import axios from 'axios';
import { merge } from 'lodash';

import transformKeys from '../transformKeys';

const getHeaders = (headers) => {
  const defaultHeaders = {
    Accept: 'application/vnd.cia.v1+json',
    'Content-Type': 'application/vnd.cia.v1+json',
  };

  return merge({}, defaultHeaders, headers);
};

const getCompleteUrl = (endPointUrl) => {
  const baseURL = 'http://localhost:8000';
  return `${baseURL}${endPointUrl}`;
};

const request = {
  get: (url, headers = {}) => {
    return axios({
      method: 'GET',
      url: getCompleteUrl(url),
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
          .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
  post: (url, payload, headers = {}, transform = true) => {
    return axios({
      method: 'POST',
      url: getCompleteUrl(url),
      data: transform ? transformKeys.toSnakeCase(payload) : payload,
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
          .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
  patch: (url, payload, headers = {}, transform = true) => {
    return axios({
      method: 'PATCH',
      url: getCompleteUrl(url),
      data: transform ? transformKeys.toSnakeCase(payload) : payload,
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
          .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
  put: (url, payload, headers = {}, transform = true) => {
    return axios({
      method: 'PUT',
      url: getCompleteUrl(url),
      data: transform ? transformKeys.toSnakeCase(payload) : payload,
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
          .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
  delete: (url, headers = {}) => {
    return axios({
      method: 'DELETE',
      url: getCompleteUrl(url),
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
          .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
};

export default request;
