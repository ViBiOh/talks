# Industrialisation des tests *end-to-end*

> Vincent Boutour

> Front-end developper chez [MeilleursAgents](https://www.meilleursagents.com)



## De quels tests parle-t-on ?

![](test-pyramid.png)

> [TestPyramid by Martin Flower](https://martinfowler.com/bliki/TestPyramid.html)


## Que veut-on tester ?

> Que notre site fonctionne sur tous les navigateurs dans toutes les résolutions


## Que teste-on ?

L'intégralité de la *stack* applicative dans une configuration et une utilisation au plus proche de la production.

![](popcorn.gif)



## Comment ?


### Selenium

![](selenium-logo.png)

* Open-source et proche du W3C
* Très largement répandu
* Produit mature


Pourquoi pas [`cypress`](https://docs.cypress.io/guides/guides/launching-browsers.html#Unsupported-Browsers) ou `puppeteer` ?

![](browsers.png)


[![](nightwatch.png)](http://nightwatchjs.org)


* Simplification de l'interface W3C WebDriver
* *Framework* i.e. "tout inclus"
* Facile à étendre


Alternatives possibles

* [`webdriver.io`](http://webdriver.io)
* [`CodeceptJS`](https://codecept.io)
* [`RobotFramework`](http://robotframework.org)


#### NightwatchJS Key Feature : Page & Section


* Décrire sa page (url, éléments)
    * Syntaxe des `querySelector`
    * Ajout de variables utilisables lors des tests
* Décrire les sections de la même façon
* Utilisation très simple de ces références ensuite


[`pages/EstimaForm.js`](nightwatch_page.js)

![](nightwatch_page.png)


[`tests/EstimaFormTest.js`](nightwatch_test.js)

![](nightwatch_test.png)


[`assertions/urlParameter.js`](nightwatch_assertion.js)

![](nightwatch_assertion.png)


[`commands/typeValue.js`](nightwatch_command.js)

![](nightwatch_command.png)


Autres commandes ajoutées

* `backToFirstWindow`
* `goToLastWindow`
* `changeDispatcher`
* `clearCookieBanner`
* `compareScreenshot`
* `isResponsive`
* `scrollToElement`
* `signin`
* `waitFor`


![](docker.png)

&

![](selenium-logo.png)


* *Sandboxing* local de votre navigateur
* Debug via VNC

```
open vnc://localhost:secret@localhost:5900
```


* Permet de tester en tâche de fond
* Permet de tester différentes tailles d'écran
  * ⚠ version utilisée, e.g. la `3.7` est ok


[![](browserstack.png)](https://www.browserstack.com)

* "Ferme" de navigateurs requêtables via Selenium
* Plus lent que du local mais plus riche en navigateurs


* Fourni un replay vidéo du test pour du debug
* Le [Local Testing](https://www.browserstack.com/local-testing) offre la possibilité de router tout votre traffic par votre machine


### CI Jenkins

* Parallélisation maximale des tests avec Docker, GCP et les pipelines

* Découpage des tests par fonctionnalités mais avec une approche durée d'exécution
  * Notre formulaire d'estimation est découpé en 5 fichiers de tests


![](jenkins_e2e.png)


![](jenkins_pipeline.png)



## Bénéfices

![](bump.gif)


Détection des régressions en *staging* plutôt qu'en production


Moins de régression, moins de bugs bloquant

Rédaction des tests d'après le cahier de recette


> On va plus vite en production, la QA est plus rapide côté produit

> Christopher Parola, Lead Product Manager


Plus grosse confiance dans les déploiements

> si c'est vert, c'est que c'est bon


## Inconvénients

> spoiler : infrastructure et coût


Ce sont les tests les plus instables possibles.

* avoir un environnement stable et proche de la prod
* avoir des cas de tests stables et pertinents
* définir un *retry* pessimiste


Lent même en parallélisant

* En moyenne **8 minutes**
* Environ **150 tests**
* Test **3 parcours utilisateur** critiques
* **20 *jobs*** en parallèle
* Près de **2 000 vérifications** effectuées


Instabilité des navigateurs dans des conteneurs

![](chrome-ram.jpg)


Traverser les sécurités réseaux sans heurts

Gérer les A/B Tests proprement



## Est-ce que ça vaut le coup ?

![](yes.gif)


## Apprentissage


* Les navigateurs ont chacun leur vision du monde, même via Selenium
* Utilisez les **data-attribute** comme sélecteur


* C'est une culture à propager plutôt qu'un effort de code
  * Modifier une API peut casser le site
  * Bumper une dépendance peut casser un comportement


* On ne peut pas tout tester (*scrollbar*, rendu, *touch*)

* On peut tester plein de choses quand même (analytics, non-régression visuelle)


Vous pouvez vous en servir pour monitorer la prod



## Littérature

* [Why e2e testing is important for your team ?](https://medium.freecodecamp.org/why-end-to-end-testing-is-important-for-your-team-cb7eb0ec1504)
* [Google Testing Blog](https://testing.googleblog.com)
* [Jenkins & GCP](https://cloud.google.com/solutions/using-jenkins-for-distributed-builds-on-compute-engine)


## Merci

![](minions_applause.gif)

Des questions ?
