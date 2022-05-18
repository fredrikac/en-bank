import express from 'express';
import session from 'express-session';
import { MongoClient, ObjectId } from 'mongodb';

const port = 3000;
const app = express();

const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();
const db = client.db('bank');
const accounts = db.collection('accounts');
const users = db.collection('users');

app.use(express.static('public'));
app.use(express.json());

//Session 
app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: 'shhhh, very secret',
  cookie: {
    maxAge: 5 * 60 * 1000 
  }
}));

//INLOGGNING
app.post('/api/login', async (req, res) => {
  const user = await users.findOne({ 
    user: req.body.loginName,
    pass: req.body.loginPass
  });

  if(user){
    req.session.user = user; 
    res.json({
      user: user.user
     
    });
  }else{
    res.status(401).send('Unauthorized');
  }
});

//GET SESSIONSINFO
app.get('/api/loggedin', (req, res) => {
  if(req.session.user){
    res.json({ user: req.session.user });
  }else {
    res.status(401).json({ error: 'Unauthorized' });
  } 
});

//LOGGA UT
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({
      loggedin: false
    });
  });
 });


/*API-ROUTES MOT DB*/

//HÄMTA ALLA KONTON
app.get('/api/accounts', async (req, res) => {
  let allAccounts = await accounts.find({}).toArray();
  res.json(allAccounts);
})

//HÄMTA SPECIFIKT KONTO
app.get('/api/accounts/:id', async (req, res) => {
  const account = await accounts.findOne({ _id: ObjectId(req.params.id) });
  res.json(account);
});

//SKAPA NYTT KONTO
app.post('/api/accounts', async (req, res) => {
  const account = {
    ...req.body
  };

  await accounts.insertOne(account);
  res.json({
    success: true, 
    account
  });
});

//SKAPA NY ANVÄNDARE
app.post('/api/users', async (req, res) => {
  const user = {
    ...req.body
  }

  await users.insertOne(user);
  res.json({
    success:true
  })
});

//TA BORT KONTO
app.delete('/api/accounts/:id', async (req, res) => {
  await accounts.deleteOne({ _id: ObjectId(req.params.id) });
  res.status(204).send();
});

//UPPDATERA SALDO PÅ SPECIFIKT KONTO
app.put('/api/account/:id', async (req, res) => {
  await accounts.updateOne({ _id: ObjectId(req.params.id) }, { $set: { balance: req.body.balance } } );
  res.json({
    success: true
  })
});

app.listen(port, () => console.log(`Listening to port ${port}`));