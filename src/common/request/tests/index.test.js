import axios from 'axios';
import request from '../index';

jest.mock('axios');
beforeAll(() => {
  axios.defaults.transformResponse = [data => data];
});

describe('request', () => {
  const url = 'https://abc.com/api';

  describe('get', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('calls axios with expected parameters and performs transform on response to camel case', async () => {
      axios.mockImplementationOnce(({ transformResponse }) => {
        // Camelcase response
        expect(transformResponse[1]({
          some_object: { object_id: 9, object_name: 'objectname1' },
        })).toEqual({
          someObject: { objectId: 9, objectName: 'objectname1' },
        });
      });
      await request.get(url);
      expect(axios).toHaveBeenCalledWith({
        url,
        method: 'GET',
        headers: expect.any(Object),
        transformResponse: expect.any(Array),
      });
    });

    it('calls axios with authorization header', async () => {
      localStorage.setItem('tok', 'tok-123');

      axios.mockImplementationOnce(({ headers }) => {
        // Authorization header
        expect(headers.Authorization).toBe('tok-123');
      });
      await request.get(url);
    });
  });

  describe('post', () => {
    beforeAll(() => {
      axios.mockClear();
    });

    beforeEach(() => {
      localStorage.clear();
    });

    it('calls axios with expected parameters and headers and performs transform on response to camel case and no snake case on payload', async () => {
      axios.mockImplementation(({ data, url: _url, transformResponse }) => {
        // Camelcase
        expect(transformResponse[1]({
          some_object: { object_id: 9, object_name: 'objectname1' },
        })).toEqual({
          someObject: { objectId: 9, objectName: 'objectname1' },
        });
        // Payload untouched since transform is false
        expect(data).toEqual({ some_key: 'value' });
        Promise.resolve({ data: JSON.stringify({ [`${_url}_key`]: 'value' }) });
      });

      const payload = { some_key: 'value' };
      const headers = { 'Custom-Header': 'HeaderValue' };
      await request.post(url, payload, headers, false);

      expect(axios).toHaveBeenCalledWith({
        url,
        method: 'POST',
        data: payload,
        headers: expect.objectContaining({ 'Custom-Header': 'HeaderValue' }),
        transformResponse: expect.any(Array),
      });
    });

    it('calls axios and performs transform on payload to snake case', async () => {
      axios.mockImplementation(({ data, url: _url }) => {
        // Payload converted to snakecase
        expect(data).toEqual({ some_key: 'value' });
        Promise.resolve({ data: JSON.stringify({ [`${_url}_key`]: 'value' }) });
      });

      const payload = { someKey: 'value' };
      await request.post(url, payload);
    });
  });

  describe('patch', () => {
    beforeAll(() => {
      axios.mockClear();
    });

    beforeEach(() => {
      localStorage.clear();
    });

    it('calls axios with expected parameters and headers and performs transform on response to camel case and no snake case on payload', async () => {
      axios.mockImplementation(({ data, url: _url, transformResponse }) => {
        // Camelcase
        expect(transformResponse[1]({
          some_object: { object_id: 9, object_name: 'objectname1' },
        })).toEqual({
          someObject: { objectId: 9, objectName: 'objectname1' },
        });
        // Payload untouched since transform is false
        expect(data).toEqual({ some_key: 'value' });
        Promise.resolve({ data: JSON.stringify({ [`${_url}_key`]: 'value' }) });
      });

      const payload = { some_key: 'value' };
      const headers = { 'Custom-Header': 'HeaderValue' };
      await request.patch(url, payload, headers, false);

      expect(axios).toHaveBeenCalledWith({
        url,
        method: 'PATCH',
        data: payload,
        headers: expect.objectContaining({ 'Custom-Header': 'HeaderValue' }),
        transformResponse: expect.any(Array),
      });
    });

    it('calls axios and performs transform on payload to snake case', async () => {
      axios.mockImplementation(({ data, url: _url }) => {
        // Payload converted to snakecase
        expect(data).toEqual({ some_key: 'value' });
        Promise.resolve({ data: JSON.stringify({ [`${_url}_key`]: 'value' }) });
      });

      const payload = { someKey: 'value' };
      await request.patch(url, payload);
    });
  });

  describe('put', () => {
    beforeAll(() => {
      axios.mockClear();
    });

    beforeEach(() => {
      localStorage.clear();
    });

    it('calls axios with expected parameters and headers and performs transform on response to camel case and no snake case on payload', async () => {
      axios.mockImplementation(({ data, url: _url, transformResponse }) => {
        // Camelcase
        expect(transformResponse[1]({
          some_object: { object_id: 9, object_name: 'objectname1' },
        })).toEqual({
          someObject: { objectId: 9, objectName: 'objectname1' },
        });
        // Payload untouched since transform is false
        expect(data).toEqual({ some_key: 'value' });
        Promise.resolve({ data: JSON.stringify({ [`${_url}_key`]: 'value' }) });
      });

      const payload = { some_key: 'value' };
      const headers = { 'Custom-Header': 'HeaderValue' };
      await request.put(url, payload, headers, false);

      expect(axios).toHaveBeenCalledWith({
        url,
        method: 'PUT',
        data: payload,
        headers: expect.objectContaining({ 'Custom-Header': 'HeaderValue' }),
        transformResponse: expect.any(Array),
      });
    });

    it('calls axios and performs transform on payload to snake case', async () => {
      axios.mockImplementation(({ data, url: _url }) => {
        // Payload converted to snakecase
        expect(data).toEqual({ some_key: 'value' });
        Promise.resolve({ data: JSON.stringify({ [`${_url}_key`]: 'value' }) });
      });

      const payload = { someKey: 'value' };
      await request.put(url, payload);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('calls axios with expected parameters and performs transform on response to camel case', async () => {
      axios.mockImplementationOnce(({ transformResponse }) => {
        // Camelcase response
        expect(transformResponse[1]({
          some_object: { object_id: 9, object_name: 'objectname1' },
        })).toEqual({
          someObject: { objectId: 9, objectName: 'objectname1' },
        });
      });
      await request.delete(url);
      expect(axios).toHaveBeenCalledWith({
        url,
        method: 'DELETE',
        headers: expect.any(Object),
        transformResponse: expect.any(Array),
      });
    });

    it('calls axios with authorization header', async () => {
      localStorage.setItem('tok', 'tok-123');

      axios.mockImplementationOnce(({ headers }) => {
        // Authorization header
        expect(headers.Authorization).toBe('tok-123');
      });
      await request.delete(url);
    });
  });
});
