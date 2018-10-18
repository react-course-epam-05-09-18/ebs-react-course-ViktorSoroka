export const normalise = (data = []) => {
  return data.reduce((acc, item) => {
    return {
      ...acc,
      [item.id]: item,
    };
  }, {});
};
