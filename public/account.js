//KONTOTS ID FRÅN QUERYSTRING
const urlParams = new URLSearchParams(location.search);
const id = urlParams.get('account');

//TOM DIV ATT SKRIVA UT INFO I
const accountInfo = document.getElementById('accountInfo');

//FORMULÄR
const addForm = document.getElementById('addCash');
const withdrawForm = document.getElementById('withdrawCash');
const addAmount = document.getElementById('addAmount');
const withdrawAmount = document.getElementById('withdrawAmount');
const deleteAccount = document.getElementById('deleteAccount');

//TA BORT KONTO
deleteAccount.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(confirm('Är du säker? Det går inte att ångra.')){
    const res = await fetch(`/api/accounts/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-type': 'application/json'
      }
    });
    window.location.href = '/index.html';
  }
});

//SÄTT IN PENGAR
addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const currentAmount = entries.balance;
  const newBalance = parseFloat(addAmount.value) + parseFloat(currentAmount);
  console.log(currentAmount, newBalance)

  const res = await fetch(`/api/account/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      balance : newBalance, 
    }
  )});

  const data = await res.json(); 
  console.log(data);
  location.reload();
});

//TA UT PENGAR
withdrawForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const currentAmount = entries.balance;
  const newBalance = parseFloat(currentAmount) - parseFloat(withdrawAmount.value);

  if(newBalance<0){ 
    alert('Du kan inte ta ut mer pengar än du har på kontot.')
    return;
  }

  const res = await fetch(`/api/account/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      balance : newBalance, 
    }
  )});

  const data = await res.json(); 
  console.log(data);
  location.reload();
})

let entries = [];

//HÄMTA KONTOINFO
const getAccountInfo = async (id) => {
  const res = await fetch(`/api/accounts/${id}`);
  const data = await res.json();
  renderAccount(data);
  entries = data;
}
getAccountInfo(id);

//RENDERA KONTOINFO
const renderAccount = (data) => {
  accountInfo.innerHTML = `<p>${data.title} <br> Kontonummer ${data._id.slice(0, 10)} <br> Saldo ${data.balance} kr</p>`;
}