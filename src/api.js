export const BASEURL = "http://localhost:8085/";

// CallApi
export function callApi(reqmethod, url, data, responseHandler) {
  let option;
  if (reqmethod === "GET" || reqmethod === "DELETE") {
    option = { method: reqmethod, headers: { 'Content-Type': 'application/json' } };
  } else {
    option = { method: reqmethod, headers: { 'Content-Type': 'application/json' }, body: data };
  }
  fetch(url, option)
    .then(response => {
      if (!response.ok) throw new Error(response.status + " " + response.statusText);
      return response.text();
    })
    .then(data => responseHandler(data))
    .catch(error => alert(error));
}

// Save session in cookie
export function setSession(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

// Get session from cookie
export function getSession(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return "";
}
