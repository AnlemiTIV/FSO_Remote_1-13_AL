# Otsikko - Notes/Muistiinpano Sekvenssikaavio - FSO 0 Tehtävä 0.4

## Tarkempi kuvaus FSO 0, 0.4 tehtävän sekvenssikaaviosta 

#1 - Sivustossa "https://studies.cs.helsinki.fi/exampleapp/notes" lisätään haluttu teksti
formin (lomakkeen) input kenttään ja painetaan Save -painikkeesta, tämän jälkeen selain
tekee POST pyynnön palvelimelle, osoitteeseen "/new_notes", lomakkeen "action" ja "post" 
attribuuttien ansiosta

#1.5 - On mahdollista että tässä vaiheessa palvelin tallentaa saadun tiedon selaimesta, mutta
tämän sivuston suhteen tietoa ei tallenneta ollenkaan, täten tieto häviää kun palvelin käynnistetään uudelleen

#2 - Palvelin vastaa selaimen tekemään POST pyyntöön HTTP statuskoodilla 302 mikä on uudelleenohjauspyyntö eli
redirect. Kehottaa selainta tekemään automaattisen, uuden HTTP GET ‑pyynnön osoitteeseen /notes.

#3 - Uudellenohjauspyynnön kautta selain hakee palvelimelta sivun sisällön
HTML-koodin HTTP GET ‑pyynnöllä. Saa aikaan myös kolme muuta HTTP pyyntöä:
/main.css, /main.js ja /data.json, lataamisen

#4 - Palvelin vastaa päivitetyllä sivulla

Lopuksi selain renderöi päivitetyn /notes sivun
