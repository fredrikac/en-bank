const urlParams = new URLSearchParams(location.search);
const userId = urlParams.get('account');
const accountInfo = document.getElementById('accountInfo');


//kör en fetch mot API med kontots id
const getAccountInfo = async (id) => {
  const res = await fetch(`/api/accounts/${id}`);
  const data = await res.json();
  renderAccount(data);
}
getAccountInfo(userId);

//rendera datan i div:en accountInfo
const renderAccount = (data) => {
  accountInfo.innerHTML = `<p>${data.title} <br> Kontonummer ${data._id.slice(0, 10)} <br> Saldo ${data.balance} kr</p>`;
}