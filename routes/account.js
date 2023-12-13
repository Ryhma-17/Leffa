const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { addAccount, getAccount, checkAccount } = require('../postgre/account');

/**
 * Account root get mapping
 */
router.get('/', async (req, res) => {
  try {
    res.json(await getAccount());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Account root post mapping. Supports urlencoded and multer
router.post('/register', upload.none(), async (req, res) => {
  const { username, email, password } = req.body;

  // Tarkistetaan onko käyttäjänimi olemassa
  const existingAccount = await checkAccount(username);
  if (existingAccount) {
    return res.status(400).json({ error: 'Username already exists' });
  }


  // Lisätään uusi käyttäjä tietokantaan
  try {
    await addAccount(username, email, password);
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', upload.none(), async (req, res) => {
  const { username, password } = req.body;

  // Tarkistetaan onko käyttäjänimi olemassa
  const existingAccount = await checkAccount(username);
  if (!existingAccount) {
    return res.status(401).json({ message: 'Username not found' });
  }

  // Käytetään bcrypt.compare vertaamaan salasanoja
  bcrypt.compare(password, existingAccount.pw, (err, result) => {
    if (err) {
      console.log('Väärin');
      console.error(err);
      return res.status(500).json({ error: err.message });
    } else if (result) {
      console.log('Oikein');

      // Jos molemmat käyttäjänimi ja salasana täsmäävät, luodaan JWT-token
      const token = jwt.sign({ username: existingAccount.username }, 'your_secret_key', { expiresIn: '1h' });

      // Lähetetään tokeni clientille
      res.status(200).json({ message: 'Login successful', token });
    }
  });
}
);




router.get('/private', async (req, res) => {
  // Your private route logic
});

module.exports = router;
