import { TIMEOUT_SEC } from './config';
import { async } from 'regenerator-runtime';
/**
 *
 * @param {number} s
 * @returns {Promise}
 * timout function
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
/**
 *
 * @param {string} url
 * @param {Object} uploadData to upload
 * @returns
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    // console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
// export const getJSON = async function (url) {};

// export const sendJSON = async function (url, uploadData) {};
// 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd034 '
// 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
