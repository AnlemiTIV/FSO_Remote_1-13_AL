# Phonebook App ohjelma

Phonebook app ohjelma, osa FSO kurssia. Sisältää frontend ja backend koodia. Apuna Node.js, Express, VSC, 
ja PaaS (platform as service) palveluna olen käyttänyt CodeSandBox palvelua.
Tämä tehty tehtävää FSO Osa 3, b:tä varten, 3.10, 3.11 
(Linkki pysynyt samana, mutta frontendiä ja backendiä on päivitetty FSO Osa 3 D aikana myös)

## Backend

The backend palvelin data, osoite:

**Uusin URL, päivitetty "D - Validointi ja ESLint" aikana**: [https://23gx5t-3001.csb.app/api/persons]

**Backend URL, koska menetin pääsyn aiempaan**: [https://23gx5t-3001.csb.app/api/persons]
**Vanha ja ensimmäinen Backend URL (Vanha, ei käytössä)**: [https://lnwlym-3001.csb.app/api/persons]
(Menetin pääsyn ensimmäiseen CodeSandBox.io tiliin koska palvelu jäi pyörimään liian monta tuntia)

## Frontend

Testasin käyttäen local, eli paikallista frontend osoitetta.
Sitä varten piti olla "phonebook-front" kansio, projekti, mikä on FSO-3-B:n ulkopuolella.
Se asennettiin käyttäen komentoa "npx create-react-app phonebook-front",
Tämän jälkeen siirryin itse phonebook-front sijaintiin, käynnistin komennolla "npm start"
(axios piti asentaa, npm install axios)

Frontend oli portissa 3000, paikallinen backend oli portissa 3001.
Muutaman muutoksen jälkeen frontend on tässä osoitteessa:

**Uusi URL, frontend**: [https://23gx5t-3001.csb.app]
**Frontend URL (Vanha, ei käytössä)** : [https://lnwlym-3001.csb.app] (https://lnwlym-3001.csb.app) 

## Muuta

Testasin Postmanin kautta myös, ja tuntui toimivan, uuden tiedon lisäys näkyi sekä backendeissä, että frontendissä,
myös CodeSandBox palvelussa.

+FSO-3-D:n jälkeen muutokset näkyvät myös MongoDB Atlaksessa, tietokannassa

**Käytän ilmaista codesandbox palvelua, joten palvelin ei pyöri 24/7, joten jos on tarkoitus testata**
**että toimii, on odotettava tai pyydettävä että laitan backend palvelimen käyntiin, muuten se ei toimi**
