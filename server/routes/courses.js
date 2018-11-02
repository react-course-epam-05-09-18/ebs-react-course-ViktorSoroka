const express = require('express');
const uuidv4 = require('uuid/v4');

const router = express.Router({});

let courses = [
  {
    id: '5ba7d98f53c989d6ee8dbb5b',
    name: 'name',
    duration: 62,
    description: 'asdf asdfas asdfasdf',
    createDate: 'Fri Jan 27 2018 21:07:35 GMT+0300',
  },
  {
    id: '5ba7d98f53c989d6ee8dbb5a',
    name: 'name1',
    duration: 70,
    description: 'asdf asdfas asdfasdf2',
    createDate: 'Fri Dec 28 2018 21:07:35 GMT+0300',
  },
];

const findCoursesByName = value => {
  return courses.filter(({ name }) => {
    return name.includes(value);
  });
};

const findCoursesById = value => {
  return courses.find(({ id }) => {
    return value === id;
  });
};

const deleteCoursesById = idToRemove => {
  courses = courses.filter(({ id }) => {
    return idToRemove !== id;
  });
};

const findCoursesByDate = value => {
  const [month, day, year] = value.split('/');
  const date = new Date(year, month - 1, day);

  return courses.filter(({ createDate }) => {
    const dateCreated = new Date(createDate);

    return date.toLocaleDateString() === dateCreated.toLocaleDateString();
  });
};

router.get('/', (req, res) => {
  const { search } = req.query;

  setTimeout(() => {
    if (!search) {
      return res.json(courses);
    }

    const isDate = /^\d\d?\/\d\d?\/\d{4}$/.test(search);

    if (isDate) {
      return res.json(findCoursesByDate(search));
    }

    return res.json(findCoursesByName(search));
  }, 1000);
});

router.put('/', (req, res) => {
  const course = req.body;
  const courseId = course.id;

  setTimeout(() => {
    const courseIndex = courses.findIndex(({ id }) => courseId === id);

    if (courseIndex === -1) {
      courses.push({ ...course, id: uuidv4() });
    } else {
      courses.splice(courseIndex, 1, course);
    }

    return res.status(201).end();
  }, 1000);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  setTimeout(() => {
    const course = findCoursesById(id);

    if (course) {
      return res.json(course);
    }

    res.status(404).end();
  }, 1000);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  setTimeout(() => {
    deleteCoursesById(id);

    res.end();
  }, 1000);
});

module.exports = router;
