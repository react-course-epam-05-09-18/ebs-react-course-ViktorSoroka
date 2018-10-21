export const loginUser = payload => {
  return fetch('/signin', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  }).then(response => {
    if (!response.ok) {
      const msg =
        response.status === 401
          ? 'Invalid login or password.'
          : 'Network issues. Try later.';

      throw Error(msg);
    }

    return response.json();
  });
};
