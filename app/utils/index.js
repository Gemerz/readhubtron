export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  throw error;
}

export function parseJSON(response) {
  return response.json();
}
