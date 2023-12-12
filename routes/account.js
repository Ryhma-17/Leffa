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
  const { username, email, password } = req.body;

  // Tarkistetaan onko käyttäjänimi olemassa
  const existingAccount = await checkAccount(username);
  if (existingAccount) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hashataan salasana bcryptillä
  console.log('Password: ', password);
  const hashedPassword = await bcrypt.hash(password, 10);

  // Lisätään uusi käyttäjä tietokantaan
  try {
    await addAccount(username, email, hashedPassword);
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
  console.log('Existing Account:', existingAccount);
  if (!existingAccount) {
    return res.status(401).json({ message: 'Username not found' });
  }

  // Käytetään bcrypt.compare vertaamaan salasanoja
  const correctPassword = await bcrypt.compare(password.trim(), existingAccount.pw.trim());
  console.log('Hashed Password:', existingAccount.pw.trim());
  console.log('Entered Password:', password.trim());
  console.log('Correct Password:', correctPassword);
  if (correctPassword) {
    console.log('Oikein');
    // Jos molemmat käyttäjänimi ja salasana täsmäävät, luodaan JWT-token
    const token = jwt.sign({ username: existingAccount.username }, 'your_secret_key', { expiresIn: '1h' });
    console.log(username, existingAccount.username);

    // Lähetetään tokeni clientille
    res.status(200).json({ message: 'Login successful', token });

  } else {

    console.log('Väärin');
    return res.status(401).json({ error: 'Password is incorrect' });
    
  
  }


});



router.get('/private', async (req, res) => {
  // Your private route logic
});

module.exports = router;
