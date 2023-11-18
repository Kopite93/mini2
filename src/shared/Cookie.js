const setCookie = (key, name, exp = 3) => {
  let date = new Date();
  date.setDate(date.getTime() + exp * 1000 * 60 * 60 * 24);
  document.cookie = `${key}=${name}; expires=${date.toUTCString()};path=/`;
};

const getCookie = (key) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + key + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

const deleteCookie = (key) => {
  document.cookie = key + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

export { setCookie, getCookie, deleteCookie };
