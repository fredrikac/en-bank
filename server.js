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
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret',
  cookie: {
    maxAge: 5 * 60 * 1000 // 5 minutes
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

//ny get-route som returnerar det som är sparat i sessionen
app.get('/api/loggedin', (req, res) => {
  if(req.session.user){
    res.json({ user: req.session.user });
  }else {
    res.status(401).json({ error: 'Unauthorized' });
  } 
});

//logga ut 
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({
      loggedin: false
    });
  });
 });

//API-ROUTES MOT DB
//route för att hämta alla konton
app.get('/api/accounts', async (req, res) => {
  let allAccounts = await accounts.find({}).toArray();
  res.json(allAccounts);
})

//route för att hämta specifikt konto
app.get('/api/accounts/:id', async (req, res) => {
  const account = await accounts.findOne({ _id: ObjectId(req.params.id) });
  res.json(account);
});

//route för att skapa nytt konto
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

//ta bort konto
app.delete('/api/accounts/:id', async (req, res) => {
  await accounts.deleteOne({ _id: ObjectId(req.params.id) });
  res.status(204).send();
});




//route till specifika html-sidor - ger error 500 - fortsätt med det här 
app.get("/api/account/:id", (req, res) => {
  res.sendFile("./public/account.html", { root: __dirname})
});

app.listen(port, () => console.log(`Listening to port ${port}`));