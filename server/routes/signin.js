const express = require('express');

const router = express.Router({});

router.post('/', (req, res) => {
  const { login, password } = req.body;

  if (login !== 'login' || password !== 'password') {
    return res.status(401).end();
  }

  return res.json({
    username: 'john_doe',
  });
});

module.exports = router;
