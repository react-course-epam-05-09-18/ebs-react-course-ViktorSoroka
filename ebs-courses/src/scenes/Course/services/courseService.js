export const updateCourse = payload => {
  return fetch(`/courses`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  }).then(response => {
    if (!response.ok) {
      const msg = 'Network issues. Try later.';

      throw Error(msg);
    }

    return response;
  });
};
