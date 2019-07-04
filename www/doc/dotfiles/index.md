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

_ Infrastructure as code_


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

```bash
mkdir -p ${HOME}/code/src/github.com/ViBiOh/
cd ${HOME}/code/src/github.com/ViBiOh/
git clone git@github.com:ViBiOh/dotfiles.git
./dotfiles/install.sh
```


## Utilisation

> Quels sont les ports ouverts sur la machine ?


> Sur macOS

```bash
vboutour@MacBook-ViBiOh ~ open_ports
COMMAND   PID     USER NODE NAME
rapportd  327 vboutour  TCP *:53754 (LISTEN)
rapportd  327 vboutour  TCP *:53754 (LISTEN)
cupsd    2857     root  TCP [::1]:631 (LISTEN)
cupsd    2857     root  TCP 127.0.0.1:631 (LISTEN)
```


> Sur CoreOS

```bash
vibioh@docker-mark-i ~ open_ports 
Active Internet connections (only servers)
Proto Local Address           PID/Program name
tcp6  :::80                   858/dockerd
tcp6  :::22                   1/systemd
tcp6  :::443                  858/dockerd
udp   163.172.36.243:68       829/systemd-network
udp   10.91.132.248:68        829/systemd-network
udp6  fe80::207:cbff:fe03:546 829/systemd-network
```


> Comment synchroniser mon local avec le serveur dev ?

```bash
git_sync dev meilleursagents
```

`rsync` uniquement des modifications. Les deux dossiers doivent partir du même état git.

On peut également coupler cela à `fswatch` pour synchroniser à chaque modification de fichiers.


## Cool Things

```bash
vboutour@MacBook-ViBiOh ~ meteo
```

```bash
Error: sudo required
vboutour@MacBook-ViBiOh ~ fuck
```


## Merci

![](minions_applause.gif)
