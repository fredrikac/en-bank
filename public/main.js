
const listOfAccounts = document.getElementById('accountsList');
const form = document.getElementById('addAccount');
const newTitle = document.getElementById('title');
const newBalance = document.getElementById('balance');


//hämta alla konton från API:et 
const getAllAccounts = async ()=> {
  const res = await fetch('/api/accounts');
  const data = await res.json();
  //console.log(data);
  renderAccounts(data);
}
getAllAccounts();


//och skriv ut namn i li-taggar i listOfAccounts - kortar ner id till 10 siffror pga ser snyggare ut
const renderAccounts = (data) => {
  data.forEach(account => {
    let li = document.createElement('li');
    li.innerHTML = `${account.title} <br> Kontonummer ${account._id.slice(0, 10)} <br> Saldo ${account.balance} kr`;
    listOfAccounts.append(li);
  })  
}

//funktionalitet för att lägga till och ta ut pengar samt ta bort konto
//länk från listan med konton till separat kontosida där man kan ta ut & sätta in pengar samt radera kontot helt. Användarvänligt



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
});



