import fetch from 'cross-fetch';
import { serverURL } from '../config';

const request = async (endpoint) => {
  const url = serverURL + endpoint;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    if (response.ok) {
      const responseJson = await response.json();

      if (responseJson.success) {
        return responseJson;
      }

      return null;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export default request;
