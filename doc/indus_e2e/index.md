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


### NightwatchJS

* Simplification de la syntaxe Selenium
* *Framework* "tout inclus"
* Facile à étendre


> alternatives : `webdriver.io`, `CodeceptJS`


`pages/Home.js`

```
module.exports = {
    url: `${process.env.E2E_URL}/`,
    commands: [],
    elements: {
        hero: '.home-hero',
    },
    sections: {},
};
```


`tests/HomeTest.js`

```
module.exports = {
    before: function(browser) {
        browser.maximizeWindow().deleteCookies();
    },
    'Page loads with analytics': function(browser) {
        const Home = browser.page.Home();

        Home.navigate().waitForElementVisible('body', browser.globals.pageLoadTimeout, true);
        browser.compareScreenshot();

        Home.expect.element('@hero').to.be.present;
        browser.verify.ga('send', 'pageview');
    },
    after: browser => browser.end(),
};
```


### Docker avec Selenium

* Chrome et Firefox dans une *sandbox*
* Contrôle via VNC

```
open vnc://localhost:secret@localhost:5900
```


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


Plus grosse confiance dans les déploiements

> si c'est vert, c'est que c'est bon


# Inconvénients


Ce sont les tests les plus instables possibles.

* environnement stable. *spoiler* : ça coute $$$
* cas de tests stables mais pertinents
* définir un *retry* pertinent


Lent même en parallélisant

* En moyenne 8 minutes
* Environ 150 tests
* 20 *jobs* en parallèle
* Près de 2 000 vérifications effectuées


Difficile d'avoir un taux de couverture


Instabilité des navigateurs dans des conteneurs

![](chrome-ram.jpg)


Traverser les sécurités réseaux sans heurts

Gérer les A/B Tests proprement



# Apprentissage


* C'est casse-tête pour remplir un simple champ texte sur tous les navigateurs

* C'est une culture à propager plutôt qu'un effort de code

  * Modifier une API peut casser le site

  * Bumper une dépendance peut casser un comportement


* On ne peut pas tout tester (*scrollbar*, rendu, *touch*)

* On peut tester plein de choses quand même (analytics, non-régression visuelle)


* Vous pouvez vous en servir pour monitorer la prod



# Conclusion

Est-ce que ça vaut le coût ?

![](yes.gif)


# Littérature

* [Why e2e testing is important for your team ?](https://medium.freecodecamp.org/why-end-to-end-testing-is-important-for-your-team-cb7eb0ec1504)
* [NightwatchJS](http://nightwatchjs.org)
* [Google Testing Blog](https://testing.googleblog.com)
* [TestPyramid by Martin Flower](https://martinfowler.com/bliki/TestPyramid.html)


## Merci

![](minions_applause.gif)

Des questions ?
