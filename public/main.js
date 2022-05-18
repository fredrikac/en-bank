//KONTON
const listOfAccounts = document.getElementById('accountsList');
const form = document.getElementById('addAccount');
const newTitle = document.getElementById('title');
const newBalance = document.getElementById('balance');

//INLOGGNING
const loginform = document.getElementById('login');
const loginName = document.getElementById('loginname');
const loginPass = document.getElementById('loginpass');
const div = document.getElementById('messageDiv');

const logoutform = document.getElementById('logout');
const registerform = document.getElementById('register');
const newUsername = document.getElementById('registerName');
const newUserpass = document.getElementById('registerPass');

//INLOGGNINGSFORMULÄR
loginform.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('/api/login', {
    method: 'POST', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      loginName : loginName.value, 
      loginPass : loginPass.value
    }
  )});

  const data = await res.json(); 
  console.log(data);
  location.reload();
});

//UTLOGGNINGSFORMULÄR
logoutform.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('/api/logout', {
    method: 'POST', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      loginName : loginName.value, 
      loginPass : loginPass.value
    })
  });
  console.log(res);
  location.reload();
});

//REGISTRERINGSFORMULÄR
registerform.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('/api/users', {
    method: 'POST', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      user : newUsername.value, 
      pass : newUserpass.value
    })
  });

  const data = await res.json(); 

  let hello = document.createElement('h2');
  hello.innerHTML = `Thank you for becoming a member!`
  div.append(hello);
});

//dölj logout & register
const hideLogout = ()=> {
  logoutform.classList.add('hidden');
}


//dölj konton 
const hideAccounts = ()=> {
  document.getElementById('allAccounts').classList.add('hidden');
  document.getElementById('createAccount').classList.add('hidden');
}

//dölj login & visa välkomsttext
const welcomeMessage = () => {
  loginform.classList.add('hidden');
  document.getElementById('loginHeading').classList.add('hidden');
  document.getElementById('registerHeading').classList.add('hidden');
  div.innerHTML = `Välkommen till banken!`
  registerform.classList.add('hidden');
}


//HÅLL KOLL PÅ INLOGGAD ELLER EJ
const getUser = async () => {
  const res = await fetch('/api/loggedin'); //vanlig fetch mot url:en
  const user = await res.json();
  console.log(user);
  if(user.error === 'Unauthorized'){
    hideLogout();
    hideAccounts();
  }else{
    welcomeMessage();
    getAllAccounts();
  }
}
getUser();




//hämta alla konton från API:et 
const getAllAccounts = async ()=> {
  const res = await fetch('/api/accounts');
  const data = await res.json();
  renderAccounts(data);
}


//och skriv ut namn i li-taggar i listOfAccounts - kortar ner id till 10 siffror pga ser snyggare ut
const renderAccounts = (data) => {
  data.forEach(account => {
    listOfAccounts.innerHTML += `<li><a href="/account.html?account=${account._id}">${account.title}</a> <br> Kontonummer ${account._id.slice(0, 10)} <br> Saldo ${account.balance} kr</li>`
    //länken tar en till account.html med användarens ID som query-string. Se account.js!

  })  
}


//länk från listan med konton till separat kontosida där man kan ta ut & sätta in pengar samt radera kontot helt. Användarvänligt
//funktionalitet för att lägga till och ta ut pengar samt ta bort konto



//formulär för att lägga till konto
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('/api/accounts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify({
      title: newTitle.value,
      balance: newBalance.value
    })
  });

  const data = await res.json();
  console.log(data);
  location.reload();
});



