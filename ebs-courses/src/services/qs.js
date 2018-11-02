export const extractQueryString = qs => {
  return qs
    .replace(/\?/, '')
    .split('&')
    .reduce((res, query) => {
      const [key, value] = query.split('=');

      if (!key) {
        return res;
      }

      return {
        ...res,
        [key]: value,
      };
    }, {});
};
