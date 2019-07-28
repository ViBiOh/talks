# `~/.dotfiles`

[Vincent Boutour](https://vibioh.fr)


## Pourquoi ?

Avoir un environnement de travail consistant quel que soit le serveur :

* MacBook (macOS) 💻
* Raspberry (Raspbian ARM) 🍇
* Datacenter (CoreOS) 🏭
* Dev, etc... (Debian) 🚀


Avoir une configuration documentée quelque part, facile à partager.

Éviter le [_configuration snowflake_](https://martinfowler.com/bliki/SnowflakeServer.html).


Scripter mon environnement de développement.

*Infrastructure as code*


![](cat_fail.gif)

Être résilient face au crash d'une machine.

Éviter les _SPOF_.


## Quoi ?


### Fichiers de configuration `.file`

* `.bashrc` / `.tmux.conf`
* `.gitconfig` / `.gitignore_global`
* `.curlrc` / `.vimrc` / `.npmrc` / etc.


### Outils

* Fuzzy-finder dans le terminal `fzf`
* `$PS1` avec couleurs, affichage de la branche, suppression des *paths* trop longs
* Snippets et configuration éditeur de texte


### Productivité

* Completions (e.g. `bash`, `git`, `pass`, `pgcli`, etc.)
* Alias des commandes usuelles pour le `golang`, `js`, `docker`, etc.


## Où ?

Un repo Git sur lequel stocker tous les fichiers.

Les branches permettent de gérer des configurations distinctes (e.g. `master` vs `work`).


## Comment ?

Un mix entre des *symlinks*, des fichiers sourcés au démarrage du `shell` et des scripts d'installation.

![](science_clap.gif)


Un _snippet_ de démarrage et un script d'installation sont les bienvenus, idéalement idempotents.

```
mkdir -p "${HOME}/code"
pushd "${HOME}/code"
git clone git@github.com:ViBiOh/dotfiles.git
./dotfiles/init.sh
popd
```


Pour mettre à jour l'environnement ou les outils, relancer le script d'installation.


## Cool Things

```
vibioh@macbook ~ meteo
```

```bash
Error: sudo required
vibioh@macbook ~ fuck
```


## Merci

![](minions_applause.gif)
