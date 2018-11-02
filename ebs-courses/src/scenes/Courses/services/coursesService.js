export const deleteCourse = id => {
  return fetch(`/courses/${id}`, {
    method: 'delete',
  }).then(response => {
    if (!response.ok) {
      const msg = 'Network issues. Try later.';

      throw Error(msg);
    }

    return response;
  });
};

export const fetchCourses = search => {
  return fetch(`/courses${search}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (!response.ok) {
      const msg = 'Network issues. Try later.';

      throw Error(msg);
    }

    return response.json();
  });
};
