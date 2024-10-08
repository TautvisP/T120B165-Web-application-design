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
Windows:
python venv\Scripts\Activate.ps1 
Unix: python venv\Scripts\activate

python manage.py runserver
