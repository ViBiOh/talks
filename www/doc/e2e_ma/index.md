# Tests e2e chez MA

[Vincent Boutour](https://vibioh.fr)


## Comment ça marche

* [Selenium](http://docs.seleniumhq.org)
* [Browserstack](https://browserstack.com)
* [NightwatchJS](http://nightwatchjs.org)
* Le cahier de recette du Produit


### Selenium

* ✅ Répandu
* ✅ Rapide
* ✅ Docker 🐳 local pour le dev via VNC
* 🔴 IE, Safari (desktop / mobile), Android
* 🔴 Difficile à débugger


### NightwatchJS

* ✅ Javascript (plutôt répandu côté front)
* ✅ Exécutions en parallèle
* ✅ Extensible
* 🔴 Un peu *verbose*


### Browserstack

* ✅ Ferme de *devices* pilotés via Selenium
* ✅ Replay vidéo
* ✅ Fonctionnement en mode *proxy*
* 🔴 Lent


## Qu'est-ce qu'on teste ?

* Le fonctionnel (présence des éléments et interactions)
* Le *tagging* Google et Web Analytics (via `localStorage`)


## Qu'est-ce qu'on ne fait pas encore ?

* La non régression visuelle, via *screenshots*
* Le monitoring de la production


## Qu'est-ce qu'on ne peut pas tester ?

* Le rendu (IE10, alignements, etc.)
* La présence des *scroll-bars*
* Le *touch* sur mobile


## Qu'est-ce que ça nous apporte ?

* Tous les avantages et inconvénients des tests
* Détecter les anomalies avant l'utilisateur


## Merci

> Questions ?
