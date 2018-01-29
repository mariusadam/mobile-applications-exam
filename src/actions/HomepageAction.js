import {
  LOCATION_CHANGED,
  TEXT_CHANGED,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_FAIL,
  PRODUCTS_FETCH_START,
  QUANTITY_CHANGED,
  PRODUCT_SELECTED,
  REPORT_CREATE_FAIL,
  REPORT_CREATE_START,
  REPORT_CREATE_SUCCESS,
  REPORT_FETCH_FAIL,
  REPORT_FETCH_START,
  REPORT_FETCH_SUCCESS,
} from './types';

const API_HOST = 'http://172.30.113.213:3000';

export const locationChanged = (text) => {
  return {
    type: LOCATION_CHANGED,
    payload: text,
  };
};

export const textChanged = (text) => {
  return {
    type: TEXT_CHANGED,
    payload: text,
  };
};

export const quantityChanged = (text) => {
  return {
    type: QUANTITY_CHANGED,
    payload: text,
  };
};

export const productsFetch = ({text}) => {
  return (dispatch) => {
    dispatch({type: PRODUCTS_FETCH_START});
    const requestUrl = `${API_HOST}/ProductDescription?q=${text}`;
    console.log('Requesting reports from server', requestUrl);
    fetch(requestUrl).
        then(response => {
          console.log('Raw response from server', response);
          return response.json();
        }).
        then(jsonResponse => {
          console.log('Json Response from server', jsonResponse);
          const {items} = jsonResponse;
          dispatch({
            type: PRODUCTS_FETCH_SUCCESS,
            payload: {items},
          });
        }).
        catch(({code, message}) => {
          console.log('Server error', message);
          dispatch({
            type: PRODUCTS_FETCH_FAIL,
            payload: message,
          });
        });
    console.log('Fetch promises created');
  };
};

export const reportFetch = (location) => {
  return (dispatch) => {
    dispatch({type: REPORT_FETCH_START});
    const requestUrl = `${API_HOST}/Product/report?location=${location}`;
    console.log('Requesting reports', requestUrl);
    fetch(requestUrl).
        then(res => res.text()).
        then(response => {
          console.log('Received reports', response);
          dispatch({
            type: REPORT_FETCH_SUCCESS,
            payload: response,
          });
        }).catch(({code, message}) => {
      dispatch({
        type: REPORT_FETCH_FAIL,
        payload: message,
      });
    });
  };
};

export const reportCreate = ({code, quantity, location}) => {
  return (dispatch) => {
    dispatch({type: REPORT_CREATE_START});

    const requestBody = JSON.stringify(
        {code, quantity: Number(quantity), location},
    );
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    };

    console.log('Creating report with', requestBody);

    fetch(`${API_HOST}/Product`, fetchOptions).
        then(response => response.json()).
        then(jsonResponse => {
          console.log('Product report created', jsonResponse);

          if (jsonResponse.hasOwnProperty('text')) {
            dispatch({
              type: REPORT_CREATE_FAIL,
              payload: jsonResponse.text,
            });
          } else {
            dispatch({type: REPORT_CREATE_SUCCESS});
          }
        }).
        catch(({code, message}) => {
          console.log('Report create error', message);
          dispatch({
            type: REPORT_CREATE_FAIL,
            payload: message,
          });
        });
  };
};

export const productSelected = ({code}) => {
  console.log('Selecting product', code);
  return {
    type: PRODUCT_SELECTED,
    payload: code,
  };
};