# Industrialisation des tests *end-to-end*

> Vincent Boutour

> Front-end developper chez [MeilleursAgents](https://www.meilleursagents.com)



## De quels tests parle-t-on ?

![](test-pyramid.png)

> [TestPyramid by Martin Flower](https://martinfowler.com/bliki/TestPyramid.html)


## Que veut-on tester ?

> Que notre site fonctionne sur tous les navigateurs dans toutes les résolutions


## Que teste-on ?

L'intégralité de la *stack* applicative dans une configuration au plus proche de celle de production

![](popcorn.gif)



## Comment ?


### Selenium

![](selenium-logo.png)


> Pourquoi pas `cypress`, `puppeteer` ou `Ranorex` ?

![](browsers.png)


![](nightwatch.png)


* Simplification de l'interface W3C WebDriver
* *Framework* i.e. "tout inclus"
* Facile à étendre

> alternatives : `webdriver.io`, `CodeceptJS`


#### Page & Section


* Décrire sa page (url, éléments)
    * Syntaxe des `querySelector`
    * Ajout de variables utilisable lors des tests
* Décrire les sections de la même façon


[`pages/Home.js`](nightwatch_page.js)

![](nightwatch_page.png)


[`tests/HomeTest.js`](nightwatch_test.js)

![](nightwatch_test.png)


[`assertions/urlParameter.js`](nightwatch_assertion.js)

![](nightwatch_assertion.png)


[`commands/typeValue.js`](nightwatch_command.js)

![](nightwatch_command.png)


Autres commandes ajoutées

* `backToFirstWindow`
* `changeDispatcher`
* `clearCookieBanner`
* `compareScreenshot`
* `goLastWindow`
* `isResponsive`
* `scrollToElement`
* `signin`
* `waitFor`


![](docker.png)


* Chrome et Firefox dans une *sandbox*
* Debug via VNC

```
open vnc://localhost:secret@localhost:5900
```


* Permet de tester en tâche de fond
* Permet de tester différentes tailles d'écran
  * ⚠ version utilisée (`3.7` ok)


### Browserstack

* "Ferme" de navigateurs requêtables via Selenium
* Plus lent que du local mais plus riche en possibilités


### CI Jenkins

* Parallélisation maximale des tests avec Docker

* Découpage des tests par fonctionnalités mais avec une approche durée d'exécution
  * Notre formulaire d'estimation est découpé en 5 fichiers de tests



# Bénéfices

![](bump.gif)


Détection des régressions en *staging* plutôt qu'en production


Moins de régression, moins de bugs bloquant

Rédaction des tests d'après le cahier de recette


Plus grosse confiance dans les déploiements

> si c'est vert, c'est que c'est bon


# Inconvénients

> spoiler : infrastructure et coût


Ce sont les tests les plus instables possibles.

* avoir un environnement stable et proche de la prod
* avoir des cas de tests stables et pertinents
* définir un *retry* pessimiste


Lent même en parallélisant

* En moyenne 8 minutes
* Environ 150 tests
* 20 *jobs* en parallèle
* Près de 2 000 vérifications effectuées


Instabilité des navigateurs dans des conteneurs

![](chrome-ram.jpg)


Traverser les sécurités réseaux sans heurts

Gérer les A/B Tests proprement



# Est-ce que ça vaut le coup ?

![](yes.gif)


# Apprentissage


* Les navigateurs ont chacun leur vision du monde, même via Selenium
* Utilisez les **data-attribute** comme sélecteur


* C'est une culture à propager plutôt qu'un effort de code
  * Modifier une API peut casser le site
  * Bumper une dépendance peut casser un comportement


* On ne peut pas tout tester (*scrollbar*, rendu, *touch*)

* On peut tester plein de choses quand même (analytics, non-régression visuelle)


Vous pouvez vous en servir pour monitorer la prod



# Littérature

* [Why e2e testing is important for your team ?](https://medium.freecodecamp.org/why-end-to-end-testing-is-important-for-your-team-cb7eb0ec1504)
* [NightwatchJS](http://nightwatchjs.org)
* [Google Testing Blog](https://testing.googleblog.com)
* [TestPyramid by Martin Flower](https://martinfowler.com/bliki/TestPyramid.html)


## Merci

![](minions_applause.gif)

Des questions ?
