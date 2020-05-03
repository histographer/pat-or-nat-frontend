export async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(`https://${url}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}

export async function getData(url = '') {
  const response = await (fetch(`https://${url}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }));
  return response;
}
