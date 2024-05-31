const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};
// you can try using axios interceptors approach which will get the user token by default when u use custom fetch 72) axios interceptor approach
export default authHeader;
