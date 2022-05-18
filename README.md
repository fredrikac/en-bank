# en-bank
Kravspecifikation

Din uppgift är att programmera en enkel “bank”, där en användare kan skapa konton, och sätta in, ta ut. 
Projektet skall bestå av ett REST-API, samt en frontend som kommunicerar med API:et via Javascript.
Kommunikationen mellan API:et och frontend skall vara med JSON.  

Ett konto på banken har följande egenskaper:
- Kontonummer
- Kontonamn
- Mängden pengar på kontot

Din frontend skall ha följande:
- Ett formulär för att lägga till ett nytt konto, med namn och mängd pengar. Kontonumret skall skapas automatiskt. 
- En lista på alla konton med namn, nummer och mängden pengar. 
- För varje konto skall det vara möjligt att lägga till pengar. 
- För varje konto skall det vara möjligt att ta bort pengar. OBS! Det skall inte gå att ta bort mer pengar än det finns på kontot!
- Det skall gå att ta bort konton.

Banken skall vara skyddad så att man måste logga in för att använda den. 
Det räcker med att alla användare kan hantera samma, alltså alla konton.

Kontofunktioner:
- Det skall gå att skapa nya användare.
- Lösenord skall vara krypterade i databasen. 
- Man skall kunna logga in. 
- Man ska inte kunna se konto-information om man inte är inloggad. 
