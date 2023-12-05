const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { addAccount, getAccounts, checkAccount } = require('../postgre/account');

/**
 * Account root get mapping
 */
router.get('/', async (req, res) => {
  try {
    res.json(await getAccounts());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Account root post mapping. Supports urlencoded and multer
router.post('/register', upload.none(), async (req, res) => {
  const { username, email, pw } = req.body;

  // Check if the username is already taken
  const existingAccount = await checkAccount(uname);
  if (existingAccount) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(pw, 10);

  // Add the new account to the database
  try {
    await addAccount(username, email, hashedPassword);
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', upload.none(), async (req, res) => {
  // Your login route logic
});

router.get('/private', async (req, res) => {
  // Your private route logic
});

module.exports = router;
