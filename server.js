import express from 'express';
import session from 'express-session';
import { MongoClient, ObjectId } from 'mongodb';

const port = 3000;
const app = express();

const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();
const db = client.db('bank');
const accounts = db.collection('accounts');

app.use(express.static('public'));
app.use(express.json());

/*Session 
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret',
  cookie: {
    maxAge: 5 * 60 * 1000 // 5 minutes
  }
}));*/


//route för att hämta alla konton
app.get('/api/accounts', async (req, res) => {
  let allAccounts = await accounts.find({}).toArray();
  res.json(allAccounts);
})

//route för att hämta specifikt konto
app.get('/api/accounts/:id', async (req, res) => {
  const account = await accounts.findOne({ _id: ObjectId(req.params.id) });
  res.json(account);
})



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
})

//ta bort konto
app.delete('/api/accounts/:id', async (req, res) => {
  await accounts.deleteOne({ _id: ObjectId(req.params.id) });
  res.status(204).send();
})



app.listen(port, () => console.log(`Listening to port ${port}`));