# Kubernetes - k8s



## Orchestrateur

Il déploie des conteneurs sur une ou plusieurs machines physiques qui partagent un même réseau.


Equivalent à Docker Swarm, Rancher, AWS ECS, etc.


## Auto-scaling - Proactivité


L'utilisation de conteneurs permet de limiter les ressources allouées et du coup de détecter aussi quand la limite risque d'être atteinte.


Kubernetes peut donc moduler le nombre d'instances en fonction des ressources consommées (et des limites qu'on lui donne).


## Auto-healing - Réactivité


*Oops! Something went wrong...* est quelque chose de la vie courante d'une infrastructure.

> Panne de signalisation sur le RER


Kubernetes surveille en permanence toutes les ressources qu'on lui demande de gérer et essaie de rebondir sur d'autres ressources quand l'une ne répond plus.

> Le RER A est en panne

> Allons sur la ligne 1



## Concepts


### Node

Un noeud sur lequel Kubernetes va pouvoir déployer des conteneurs.

Dit autrement, une machine physique dans le réseau.


### Namespace

Espace de nom supposé hermétique entre les objets Kubernetes.

Il en existe deux par défaut : `kube-system` et `default`


### Pod

Plus petite entité *scalable* possible.

Un pod peut regrouper plusieurs conteneurs mais c'est plutôt rare.


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
spec:
  containers:
  - name: hello
    image: alpine
    command: ['sh', '-c', 'echo "Hello, Kubernetes!"']
```


### ConfigMap / Secret

Ce sont des objets dans lequel stocker la configuration de votre *pod*.

On peut y stocker des variables d'environnements "clé/valeur" ou des fichiers de configuration


```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: front
data:
  PORT: "8000"
  config.json: |
    {"API_URL": "https://api.domain.com"}
```


### Deployment

Equivalent à un *pod* sur bien des points, sauf que :

* on peut définir une *RollingUpdate Strategy* lors des mises à jour
* on peut définir un nombre de *replicas*
* on peut rollback une version si la nouvelle n'est pas satisfaisante


### Service

Abstraction de *pods* que l'on utilise majoritairement comme *load-balancer*.

e.g. Les 3 *pods* de notre *deployment* sont accessibles via une seule URL qui est porté par le service.


```yaml
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: hello
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
```


### Probes

Règle propre à chaque conteneur permettant de savoir si un conteneur est *ready* ou *live*.

Dès que le conteneur est prêt, on peut lui envoyer du traffic.

Dès que le conteneur n'est plus vivant, Kubernetes le redémarre.


### Horizontal Pod Autoscaler

Règle de définition de la mise à l'échelle des pods en fonction des ressources (x% de CPU disponible) avec un min et un max.


### Job / CronJob

Lancement, périodique ou non, de *pods* avec des stratégies de restart et de rétention.

Un Job est immutable (une fois créé, il s'exécute et demeure en l'état). Un CronJob crée des Jobs.



## Impératif vs Déclaratif


L'impératif donne des ordres pour arriver à une finalité (e.g. bash, ansible).


Le déclaratif dit ce qu'il souhaite comme finalité mais ne précise pas comment.


Kubernetes est déclaratif. C'est pour ça qu'il répond vite.

> La demande est légale, je vais le faire.


Vous n'avez aucune garantie de "quand" il va le faire, c'est en fonction des ressources disponibles.
C'est ce qui donne l'illusion que le déploiement est instantanné.


C'est une notion importante quand on utilise des *CronJob*.


Il ne vérifie pas que votre image existe ni même qu'elle démarre avant de vous dire "je vais le faire".

Mais continuera pendant longtemps d'essayer...


## *Control Plane*


On déclare l'état souhaité (e.g. un *deployment* avec 3 *replicas* et un *service* devant) et Kubernetes le met en place.


Mais

> La carte n'est pas le territoire


Kubernetes compare donc en permanence l'état souhaité avec l'état réel et ajuste en conséquence.


e.g.

Si je détruis le *pod* d'un *deployment*, Kubernetes le voit, et en repop un autre aussitôt.


Ce *pod* sera peut-être sur le même noeud ou un autre. Il faut donc s'assurer que l'application respecte les 12factor App.

On ne peut pas dépendre d'un volume local, sauf à définir des affinités entre les pods et les noeuds.



## Références

* [kubernetes.io](https://kubernetes.io)
* [EggHead](https://egghead.io/lessons/docker-wtf-is-kubernetes-k8s)
