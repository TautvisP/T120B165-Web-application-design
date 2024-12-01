# T120B165-Web-application-design "TravelHub"

„TravelHub“ sprendžia poreikį turėti specializuotą platformą, kurioje vartotojai galėtų dalintis informacija, patarimais ir įspūdžiais apie keliones bei lankomus objektus. Forumo tikslas – sukurti bendruomenę, kur keliautojai gali ieškoti informacijos apie įvairias kelionių kryptis, užduoti klausimus ir gauti atsakymus iš kitų keliautojų. Problema, kurią forumas sprendžia – tai patikimų ir personalizuotų kelionės patarimų trūkumas bendrose kelionių svetainėse.

# Sprendžiamo uždavinio aprašymas

## 1. Sistemos paskirtis

   
„TravelHub“ yra keliautojų bendruomenės forumas, skirtas dalintis kelionių patirtimi ir padėti kitiems planuoti keliones. Sistema leidžia naudotojams užduoti klausimus apie kelionės kryptis, rašyti patarimus apie konkrečias šalis, miestus ar lankytinas vietas bei dalintis atsiliepimais apie kelionės patarimus. Pagrindinis tikslas – padėti keliautojams lengviau rasti naudingą ir personalizuotą informaciją, pagrįstą kitų vartotojų patirtimi.

## 2. Funkciniai reikalavimai

   
### Vartotojų autentifikacija ir autorizacija:
•	Naudotojai turi galimybę registruotis, prisijungti prie sistemos bei atsijungti.

•	Vartotojai skirstomi į tris roles: svečias (gali tik naršyti), narys (gali kurti turinį) ir administratorius (gali valdyti sistemą).

### Kelionės patarimai ir atsiliepimai:
•	Nariai gali kurti ir redaguoti kelionės patarimus susijusius su skirtingomis šalimis (pvz., ką veikti Paryžiuje, atsiliepimai ir patirtys Eifelio bokšte).

•	Kiekviename patarime gali būti pridėti atsiliepimai, kuriuos gali rašyti kiti vartotojai.


•	Naudotojai gali peržiūrėti visus kelionės patarimus, susietus su konkrečia šalimi ar miestu.


### Šalių sąrašas ir kategorijos:
•	Sistemoje pateikiamas šalių sąrašas, kur vartotojai gali pasirinkti šalį ir naršyti susijusius kelionės patarimus.

•	Kiekvienoje šalyje galima rasti įvairius kategorijų patarimus: apgyvendinimas, maistas, transportas, pramogos ir lankytinos vietos.


### Atsiliepimų ir patarimų valdymas:
•	Administratoriai gali peržiūrėti, redaguoti arba ištrinti netinkamus kelionės patarimus ar atsiliepimus.

•	Nariai gali redaguoti arba ištrinti tik savo sukurtą turinį.

### Paieškos funkcija:
•	Sistema turi paieškos funkciją, kuri leidžia vartotojams ieškoti patarimų pagal šalį, miestą, kategoriją ar specifinius raktinius žodžius.

## 3. Pasirinktų technologijų aprašymas
### Backend:

•	Django naudojamas kaip serverio pusės sprendimas, leidžiantis kurti greitą ir efektyvią REST API. Django suteikia puikų įrankių rinkinį greitam ir efektyviam taikomųjų programų kūrimui.

•	Django REST Framework (DRF) naudojamas kaip Django plėtinys, leidžiantis lengvai kurti RESTful paslaugas ir valdyti užklausas. DRF teikia daugybę naudingų funkcijų, tokių kaip automatizuotas API dokumentavimas ir išplėstos autentifikacijos galimybės.

•	Autentifikacija ir autorizacija įgyvendinama naudojant JWT (JSON Web Tokens), kad būtų užtikrinta saugi vartotojų autentifikacija bei atnaujinimo tokenų strategija. Šis metodas leidžia efektyviai tvarkyti vartotojų sesijas ir teises.

•	MySQL naudojama kaip duomenų bazė, sauganti informaciją apie šalis, kelionės patarimus, atsiliepimus ir vartotojus. MySQL teikia patikimą duomenų saugojimą ir užtikrina greitą prieigą prie duomenų.

### Frontend:

•	React.js naudojamas kurti interaktyvią ir greitą naudotojo sąsają. React leidžia kurti dinaminius komponentus, kurie gali efektyviai reaguoti į vartotojo veiksmus ir užtikrina sklandų vartotojo patirtį.

•	HTML5/CSS3 ir Bootstrap naudojami formuojant prisitaikančią ir patogią grafinę naudotojo sąsają. Šios technologijos leidžia sukurti modernią, patrauklią ir mobiliesiems pritaikytą sąsają, užtikrinančią gerą vartotojų patirtį.

## Paleidimas
Windows: `venv\Scripts\activate`
Unix: `source venv\bin\activate`

naudoti `python manage.py runserver` backend'ui
naudoti `npm start` frontend'ui

## 4. Naudotojo sąsajos projektas (wireframe)
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/09b7cde9-96d8-4722-8ba5-6c883639bab3" alt="Image 1" width="500" height="400"></td>
    <td><img src="https://github.com/user-attachments/assets/6106c35e-0bf6-454c-8dda-f864403fae49" alt="Image 2" width="500" height="400"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/5bb45d82-84be-44a9-8921-047eb31ff5ba" alt="Image 3" width="500" height="400"></td>
    <td><img src="https://github.com/user-attachments/assets/53bf7cdd-4c34-4d09-a45c-cfd2383e2578" alt="Image 4" width="500" height="400"></td>
  </tr>
</table>


## 5. Sistemos dizainas
### Sistemos langai
![image](https://github.com/user-attachments/assets/179efcfa-85d3-4d78-9190-fe6e1fbbd441)
![image](https://github.com/user-attachments/assets/12677336-bb4e-40f2-934b-83c5ec437b94)
![image](https://github.com/user-attachments/assets/5c354c11-26c2-44e0-807d-72456a4055cd)
![image](https://github.com/user-attachments/assets/ed0c694c-777d-41fa-a5f1-7b4ae4e7f4ff)


### Modaliniai langai
Jų yra ir daugiau, tačiau visi atrodo panašiai
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e7152a5f-a6da-400d-b92d-888ca6f49f2e"></td>
    <td><img src="https://github.com/user-attachments/assets/610a0b71-3909-430d-af83-61bc3c10183a"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/dbdaef1d-4a0a-4f48-b9d1-6bbcca8f6ba7"></td>
    <td><img src="https://github.com/user-attachments/assets/3f5a3898-dd42-41b3-89be-a53bbeccf109"></td>
  </tr>
</table>



## 6. UML "Deployment" Diagrama
„Nginx“ labai efektyviai pateikia statinius failus (pvz., CSS, ‚JavaScript‘, paveikslėlius) tiesiogiai klientams, kešuoja statinius failus, taip sumažina „backend“ serverio apkrovą ir krovimo laiką klientams. „Nginx“ prideda ir papildomą saugumo lygi, filtruoja ir blokuoja „DDoS“, SQL injekcijos ir kitas atakas. MySQL bendrauja su „backend“ serverio dalimi atliekant CRUD operacijas. „Backend“ su „Nginx“ bendrauja per „REST API“, o „React frontend“ su „Nginx“ bendrauja per HTTP užklausas. Statinius failus „Nginx“ pateikia „React frontend“. 
![image](https://github.com/user-attachments/assets/b678c455-2961-474a-bea6-c19c5530120d)

## 7. „OpenAPI" specifikacija
[TravelForumOpenapi.txt](https://github.com/user-attachments/files/17969905/TravelForum.OpenApi.txt)

```plaintext
openapi: 3.0.3
info:
  title: Travel Forum API
  version: 1.0.0
  description: This API allows users to interact with countries, posts, and comments
    in the travel forum.
paths:
  /api/comments/:
    get:
      operationId: comments_list
      tags:
      - comments
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Comment'
```
## 8. Išvada
Šis projektas apima „Django“ backend ir „React“ frontend programos kurimą ir diegimą naudojant „Docker“ ir „DigitalOcean“. 

### Pagrindiniai komponentai

### „Django Backend":
Naudojama „Django REST API“ sistema ir paprastas JWT autentifikavimas.
Duomenų saugojimui jungiasi prie MySQL duomenų bazės.

### „React Frontend":
Sukuriama taikomosios programos naudotojo sąsaja.
Su „Django“ galine dalimi bendrauja per „Nginx" sąsają.

### „Nginx":
Aptarnauja „React Frontend“ su statiniiai failai.
Veikia kaip atvirkštinis tarpininkas (angl. reverse proxy), perduodantis API užklausas į „Django backend“.

### „Docker":
Konteineriuose talpinami taikomosios programos komponentai (backend, frontend, duomenų bazė ir „Nginx“).
Užtikrina nuoseklumą skirtingose aplinkose.

### DigitalOcean:
Suteikia keičiamo dydžio (angl. scalable) debesijos infrastruktūrą talpinti programoms.
Debesų kompiuterijos pardavėja, turinti duomenų centrų visame pasaulyje ir siūlanti infrastruktūros kaip paslaugos (IaaS) platformą programinės įrangos kūrėjams. Didžiausias privalumas - programų diegimo paprastumas.
