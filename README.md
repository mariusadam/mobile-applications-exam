Inventar

Pentru inventarierea rapida a produselor unui depozit, responsabilii acestuia s-au gandit la un sistem
client-server. Serverul expune prin http (localhost:3000) o lista cu descrierea produselor, fiecare element
din aceasta lista (ProductDescription) avand un cod (code) - numar intreg si o descriere (description) - sir de
caractere. Serverul permite de asemenea inregistrarea produselor (Product) existente in depozit si obtinerea unui
raport despre toate produsele existente. Dezvoltati o aplicatie mobila (client) dupa cum urmeaza.

1. Aplicatia permite angajatului sa introduca locul (location) in care se afla (ex. hala 1) intr-un input text.
Angajatul introduce intr-un alt input text o parte din descrierea produsului (ex. sur).
La intervale de o secunda, clientul prezinta alfabetic produsele care au in descriere textul
introdus de utilizator, dar nu mai mult de 10 produse (ex. surub, surubelnita).

2. Produsele prezentate la punctul 1 se pot aduce de pe server via HTTP GET /ProductDescription?q=text, unde text
este textul introdus de utilizator. Raspunsul de pe server este paginat si are formatul { count, page, items }, unde
count - reprezinta numarul total de produse ce contin acel text, page - numarul paginii, iar items - sir cu cel mult 10
elemente.

3. Pentru a inregistra produsele pe care le-a verificat, angajatul face click pe descrierea unui produs, iar aplicatia
schimba stilul acelui element din lista pentru a arata selectia facuta de utilizator (ex. prezentandu-l in bold sau
cu alta culoare). Apoi, introduce intr-un input text o cantitate (quantity) - numar si declanseaza un buton submit.
In timpul inregistrarii declansate de angajat, aplicatia va prezenta un dialog modal 'Saving...'.

4. Inregistrarea de la punctul 3 se poate trimite imediat pe server via HTTP POST /Product, incluzand in corpul
cererii { code, quantity, location }. Serverul valideaza codul si locatia, refuzand inregistrarea daca codul
este necumoscut de server sau cantitatea nu este numerica.

5. Daca trimiterea de la punctul 4 esueaza, aplicatia salveaza local datele introduse pentru a putea relua mai
tarziu operatia. Aplicatia va incerca retrimiterea la intervale de 5 secunde.

6. Cand angajatul se duce in locuri unde nu are conectivitate, aplicatia ii permite sa declanseze un buton
'download product descriptions' pentru a descarca toate descrierile de la server folosind mecanismul de paginare oferit.
In timpul descarcarii, aplicatia prezinta un dialog modal aratand angajatului progresul descarcarii 'Downloading m/n',
unde m este numarul paginii curente, iar n este numarul total de pagini.

7. Operatia de descarcare poate fi oprita (cancel explicit sau back/dismiss). Data viitoare cand va fi reluata manual
de angajat, aplicatia va descarca doar paginile ramase.

8. Operatiile de la punctul 1 sunt posibile si daca aplicatia nu are conectivittate sau serverul este picat.

9. Pentru a se verifica, angajatul poate declansa un buton 'report' care deschide un ecran nou in care aplicatia
prezinta un raport cu toate produsele introduse. Raportul { report } este un text returnat de pe server via HTTP GET
/Product/report?location=text, unde text este locatia introdusa de angajat la punctul 1.
Aplicatia prezinta un indicator de progress in timpul incarcarii raportului si informeaza angajatul daca operatia
esueaza.