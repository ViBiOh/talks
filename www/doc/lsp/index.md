# Language Server Protocol

> Vincent Boutour


## Le problème 🤬

> J'❤️ vim et le Go, il me faut `vim-go`. Mais il m'arrive d'utiliser Atom aussi, quel est le bon plugin ?


## La promesse 🤨

> *Utiliser n'importe quel éditeur pour n'importe quel langage : l'outillage est standard.*


## La solution 🤗

[Protocole ouvert poussé par Microsoft](https://microsoft.github.io/language-server-protocol/overview) pour fournir :

* auto-complétion
* *goto definition*
* références
* documentation


## L'implémentation 🧐

> Un mode client/server qui date de l'antiquité mais qui fonctionne très bien


Votre éditeur envoie vos actions à un **serveur local**, lequel retourne des informations de contexte.


Votre éditeur doit être compatible (via un plugin par exemple), mais bonne nouvelle, [ils le sont tous](http://langserver.org).


Votre langage doit pouvoir implémenter un *language server*, mais bonne nouvelle, [ils le sont presque* tous](http://langserver.org)

> * certains n'implémentent pas toutes les fonctionnalités, mais vous pouvez contribuez ! Il y a même COBOL 🙋‍♂️


## Example


VSCode utilise un mix de *language server protocol* et d'outils maisons pour fournir son **IntelliSense** vraiment abouti.


OniVim est un `vim` écrit en Electron (chromium) qui intègre de base LSP pour toutes les autocomplétions.


Regardons SublimeText ensemble...


## Avantages 🤙

* Pas de ralentissements de l'éditeur, tout est asynchrone
* Un éditeur sous stéroïdes à moindre coût
* Encourage à écrire de la documentation pour en bénéficier
* Comprend très bien les langages de scripts par défaut


## Inconvénients 🤷‍♂️

* Pas encore très sec sur tous les langages, il faut parfois fouiller dans les *issues* GitHub
* Pas aussi abouti que des IDE spécialisés (JetBrains, VSCode pour le JSX)


## Merci

![](minions_applause.gif)
