export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('loggedIn')
    ? JSON.parse(window.localStorage.getItem('loggedIn'))
    : {};

const setUser = user =>
  window.localStorage.setItem('loggedIn', JSON.stringify(user));

export const handleLogin = ({ password }) => {
  if (password === 'getexcited') {
    setUser({
      loggedIn: true,
    });
    return true;
  }

  return false;
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.loggedIn;
};

export const logout = callback => {
  setUser({ loggedIn: false });
  callback();
};
