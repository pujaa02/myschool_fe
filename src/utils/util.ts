export const clearBrowserCookiesAndStorage = () => {
  const rememberMeData = localStorage.getItem('remember-me');
  const clientIp = localStorage.getItem('clientIp');

  localStorage.clear();
  if (clientIp) {
    localStorage.setItem('clientIp', clientIp);
  }
  if (rememberMeData) {
    localStorage.setItem('remember-me', rememberMeData);
  }
  document.cookie.split(';').forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
};
