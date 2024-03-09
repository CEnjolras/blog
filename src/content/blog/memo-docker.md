---
title: Memo docker
author: Clément Enjolras
pubDatetime: 2023-11-06T11:18:00.000+00:00
postSlug: memo-docker
featured: false
draft: true
tags:
  - Mémo
  - DevOps
  - Docker
description: "Reccueil de notes et snippets Docker, référence pour mes etudiants"
---

J'ai rédigé ce mémo pendant mon apprentissage de Docker. Ce sont les notes que j'ai prises pour m'aider à comprendre les concepts et les commandes de Docker.

Je partage également ce mémo avec mes étudiants, pour les aider à comprendre Docker et à l'utiliser dans leurs projets.

## Sommaire

- [Theorie: Qu'est-ce que Docker ?](#qu-est-ce-que-docker)
- [Theorie: Volumes](#volumes)
- [Theorie: Docker network](#docker-network)
- [Theorie: Principaux éléments de Docker](#principaux-éléments-de-docker)
- [Installation de Docker](#installation-de-docker)
- [Pratique : Récupérer et lancer une image Docker de base pre-existante](#pratique--récupérer-et-lancer-une-image-docker-de-base-pre-existante)
- [Pratique : Lister les conteneurs Docker en cours d'exécution](#lister-les-conteneurs-docker-en-cours-d-exécution)
- [Pratique : Création d'une image Docker (Dockerfile)](#création-d-une-image-docker-dockerfile)
- [Exemple concret 1 : Conteneuriser une application NodeJS qui affiche "Hello World"](#exemple-concret-1--conteneuriser-une-application-nodejs-qui-affiche--hello-world-)
- [Exemple concret 2 : Conteneuriser d'une API REST NodeJS avec Express](#exemple-concret-2--conteneuriser-d-une-api-rest-nodejs-avec-express)

## Qu'est-ce que Docker ?

Une application web est généralement composée de plusieurs éléments : une base de données, une server nodeJS qui fait office d'API, un serveur web pour servir les fichiers statiques du front etc. Pour lancer une application web, on doit donc s'assurer que tous ces éléments sont bien installés et configurés sur la machine.

Cela pose plusieurs problèmes :

- **Perte de temps** : Il faut installer et configurer chaque élément à la main. Sur le poste de chaque développeur, sur les serveurs de production, etc.
- **Source de bug** : "Ca marche sur ma machine" est une phrase que l'on entend souvent. Les différences de configuration entre les environnements de développement et de production peuvent causer des bugs difficiles à reproduire. Par exemple un developpeur utilise la version 21 de NodeJS, alors que le serveur de production utilise la version 18.
- **Difficulté à reproduire l'environnement de production** : Pour tester une nouvelle fonctionnalité, il faut reproduire l'environnement de production. Cela peut être compliqué si l'on ne sait pas exactement quels éléments sont installés sur le serveur de production.

Docker est une solution à ces problèmes. Docker permet de créer des conteneurs, qui sont des environnements isolés et légers. Chaque conteneur contient tout ce dont une application a besoin pour fonctionner : le code, les librairies, les dépendances, la base de donnée, les variables d'environnement, etc. Les conteneurs sont portables, c'est-à-dire qu'ils fonctionnent de la même manière sur n'importe quelle machine.

Les avantages de Docker sont nombreux :

- **Facilité de déploiement** : Un conteneur est un fichier qui contient tout ce dont une application a besoin pour fonctionner. Il suffit de copier ce fichier sur un autre serveur pour déployer l'application.
- **Portabilité** : Un conteneur fonctionne de la même manière sur n'importe quelle machine. Cela permet de facilement déplacer ou reproduire une application dans sa globalité.
- **Isolation** : Chaque conteneur est isolé des autres. Cela permet de faire cohabiter plusieurs applications sur la même machine sans qu'elles ne se gênent. Par exemple on peut maintenir la version courrante de l'application qui utilise NodeJS 16 et PostgreSQL 13, tout en développant une nouvelle version de l'application qui utilise NodeJS 18 et PostgreSQL 14 et passer de l'un a l'autre en un seul clic.
- **Rollback facile** : Si une mise à jour d'une application provoque un bug, il est facile de revenir à la version précédente en relançant le conteneur précédent.

## Volumes

Les volume sont des répertoires qui sont partagés entre le conteneur et la machine hôte. Cela permet l'échange de données entre le conteneur et la machine hôte (par exemple le code source de l'application, ainsi il est possible de modifier le code source directement sur la machine hôte et de voir les modifications directement dans le conteneur).

## Docker network

Les conteneurs peuvent communiquer entre eux grâce à un réseau interne. Par défaut, les conteneurs sont isolés les uns des autres, mais il est possible de les connecter à un réseau pour qu'ils puissent communiquer entre eux.

## Principaux éléments de Docker

Il y a trois éléments principaux dans Docker :

1. Le "client" Docker : C'est l'outil en ligne de commande (ou graphique) qui permet de gérer les conteneurs. On peut l'installer sur n'importe quelle machine, et il permet de gérer les conteneurs qui tournent sur cette machine, ou sur une autre machine distante. C'est notre interface de communication avec le moteur Docker.

2. "Docker Daemon" : C'est le moteur Docker. Il tourne en arrière-plan sur la machine hôte, et c'est lui qui gère les conteneurs. Il est responsable de lancer, arrêter, et gérer les conteneurs. Il est aussi responsable de télécharger les images Docker depuis le Docker Hub.

3. "Docker Hub" : C'est un service en ligne qui permet de stocker et partager des images Docker. C'est un peu comme GitHub, mais pour les images Docker. On peut y trouver des images prêtes à l'emploi, ou bien y stocker nos propres images.

En résumé, on communique avec le moteur Docker via le client Docker, le moteur Docker intèprète nos commandes et gère les conteneurs (Création, démarrage, arrêt, suppression, etc), si besoin il télécharge des images depuis le Docker Hub.

## Installation de Docker

Cf: google

## Pratique : Récupérer et lancer une image Docker de base pre-existante

Pour se familiariser avec Docker, on peut commencer par récupérer une image Docker de base, et la lancer en local. Par exemple, on peut récupérer une image d'ubuntu, et la lancer en local. Cette image contient une installation minimale d'Ubuntu, et elle est prête à l'emploi et nous permettra d'executer des commandes dans un environnement Ubuntu "conteneurisé".

Pour récupérer une image Docker, on utilise la commande `docker pull` :

```bash
docker pull ubuntu
```

Cette commande va télécharger l'image `ubuntu` depuis le Docker Hub. Une fois l'image téléchargée, on peut la lancer en utilisant la commande `docker run` :

```bash
docker run -it ubuntu
```

- `-i` : Mode interactif
- `-t` : Mode terminal

Cela va lancer un conteneur Ubuntu en mode interactif. Suite à cette commande, on se retrouve dans un terminal Ubuntu, et on peut exécuter des commandes comme si on était sur une machine Ubuntu (exit pour quitter le conteneur).

## Lister les conteneurs Docker en cours d'exécution

Pour lister les conteneurs Docker en cours d'exécution, on utilise la commande `docker ps` (sur le terminal de la machine hôte) :

```bash
docker ps
```

## Création d'une image Docker (Dockerfile)

Nous avons vu comment récupérer et lancer une image Docker existante. Mais dans la pratique, on va souvent avoir besoin de créer notre propre image Docker. Pour cela, on utilise un fichier appelé `Dockerfile`.

Un Dockerfile est un fichier qui contient les instructions pour créer notre propre image Docker. Voici un exemple de Dockerfile pour une application NodeJS qui va nous permettre de comprendre concrètement comment ça marche :

```Dockerfile
# Utiliser une image de base avec NodeJS
FROM node:18

# Créer un répertoire pour notre application
WORKDIR /usr/src/app

# Copier les fichiers de notre application dans le conteneur
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port 3000
EXPOSE 3000

# Volumes
VOLUME /usr/src/app

# Lancer l'application
CMD ["node", "index.js"]
```

- `FROM node:18` : 99% des images Docker sont basées sur d'autres images. Ici, on utilise l'image officielle de NodeJS, qui est basée sur une image de Linux. Cela signifie que notre image Docker contiendra NodeJS et Linux. L'instruction `FROM` permet de spécifier l'image de base que l'on veut utiliser, ici `node:18`, elle sera téléchargée depuis Docker Hub. Pour trouver une image de base, on peut chercher sur le Docker Hub : https://hub.docker.com/. Si par exemple nous voulions une image de base avec Wordpress, on pourrait chercher "Wordpress" sur le Docker Hub, et on trouverait l'image `wordpress:latest`.

- `WORKDIR /usr/src/app` : On définit le répertoire de travail. C'est le répertoire dans lequel les commandes `COPY`, `RUN`, `CMD`, etc, seront exécutées. C'est un peu comme si on se déplaçait dans ce répertoire avec la commande `cd` au sein du conteneur.

- `COPY . .` : On copie tous les fichiers depuis la machine hôte vers le conteneur. Les fichiers seront copiés dans le répertoire de travail du conteneur, c'est-à-dire `/usr/src/app` car on a défini ce répertoire avec l'instruction `WORKDIR`.

- `RUN npm install` : La commande `RUN` permet d'exécuter une commande dans le conteneur. Ici, on exécute `npm install` pour installer les dépendances de notre application.

- `EXPOSE 3000` : Cela signifie simplement que le conteneur est capable de recevoir des requêtes sur le port 3000. Par défaut, les conteneurs sont isolés du réseau extérieur, c'est-à-dire qu'ils ne peuvent pas recevoir de requêtes HTTP. L'instruction `EXPOSE` permet de dire au moteur Docker que le conteneur est capable de recevoir des requêtes sur un port donné.

- `VOLUME /usr/src/app` : On définit un volume pour notre application. Cela signifie que le répertoire `/usr/src/app` sera partagé entre le conteneur et la machine hôte. Cela permet par exemple de modifier le code source de l'application directement sur la machine hôte, et de voir les modifications directement dans le conteneur.

- `CMD ["node", "index.js"]` : C'est la commande qui sera exécutée lorsque le conteneur sera démarré. Ici, on exécute `node index.js` pour lancer notre application NodeJS.

## Exemple concret 1 : Conteneuriser une application NodeJS qui affiche "Hello World"

Pour illustrer la création d'une image Docker, nous allons créer une application NodeJS qui affiche "Hello World", et nous allons la conteneuriser.

### Etape 1 : Création de l'application NodeJS

Mobilisons toute notre expertise pour créer une application NodeJS qui affiche "Hello World". Dans un fichier `index.js` :

```javascript
console.log("Hello World");
```

### Etape 2 : Création du Dockerfile

Nous souhaitons créer une image Docker qui contient notre application NodeJS. Pour cela, nous allons créer un fichier `Dockerfile` (sans extension) et partir d'une image de base avec NodeJS.

```Dockerfile
# Utiliser une image de base avec NodeJS
# 20-alpine signifie que l'on utilise la version 20 de NodeJS, et que l'on utilise une version allégée d'Alpine Linux (En général, on préfère utiliser des images allégées pour réduire la taille de l'image, alpine est un choix populaire pour cela)
FROM node:20-alpine

# On définit le répertoire de travail
WORKDIR /app

# On copie les fichiers de notre application dans le conteneur
# la commande COPY . . signifie que l'on copie tous les fichiers depuis le répertoire courant de la machine hôte vers le répertoire de travail du conteneur
COPY . .

# On lance l'application
CMD ["node", "index.js"]
```

### Etape 3 : Création de l'image Docker

A partir du Dockerfile, on peut créer une image Docker avec la commande `docker build`. On se place dans le répertoire qui contient le Dockerfile, et on exécute la commande suivante :

```bash
docker build -t hello-world .
```

- `-t` : Permet de nommer l'image
- `.` : Chemin du répertoire contenant le Dockerfile

On peut vérifier que l'image a bien été créée avec la commande `docker images` :

```bash
docker images
```

On constate que nous avons bien une image nommée `hello-world` ainsi que l'image 'ubuntu' que nous avons téléchargée précédemment :

```bash
REPOSITORY   TAG       IMAGE ID       CREATED           SIZE
hello-world  latest    3e3c4b4f6d9e   16 seconds ago    114MB
ubuntu       latest    1318b700e415   2 weeks ago       72.8MB
```

### Etape 4 : Lancer le conteneur

Pour lancer le conteneur, on utilise la commande `docker run` :

```bash
docker run hello-world
```

Cette fois-ci, on ne précise pas les options `-i` et `-t` car l'application ne nécessite pas d'interaction. On peut voir que l'application affiche bien "Hello World" dans le terminal.

Pour comprendre, on peut ouvrir un terminal dans le conteneur avec la commande `docker run -it hello-world sh` et vérifier que le fichier `index.js` est bien présent dans le dossier `/app`(WORKDIR) du conteneur.

Il peut être utile de nommer le conteneur avec l'option `--name` pour le retrouver plus facilement :

```bash
docker run --name myContainer hello-world
```

## Exemple concret 2 : Conteneuriser d'une API REST NodeJS avec Express

Nous allons maintenant créer une application NodeJS qui expose une API REST avec Express, et nous allons la conteneuriser. Pour cela, nous allons créer une application NodeJS qui expose une route `/hello` qui renvoie "Hello World".

### Etape 1 : Création de l'application NodeJS

Nous allons créer une application NodeJS qui expose une route `/hello` qui renvoie un objet hello world. Pour cela, nous allons utiliser le framework Express. Nous allons créer un fichier `index.js` :

```bash
npm init -y
npm install express
```

```javascript
// Import dependencies
const express = require("express");
const app = express();
const { Router } = require("express");

app.use(
  Router().get("/hello", async (req, res) => {
    res.json({
      hello: "world",
    });
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Etape 2 : Création du Dockerfile

Nous souhaitons créer une image Docker qui contient notre application NodeJS. Pour cela, nous allons créer un fichier `Dockerfile` (sans extension) et partir d'une image de base avec NodeJS.
La différence avec l'exemple précédent est que nous devons exposer le port 3000 pour que notre application puisse recevoir des requêtes HTTP depuis l'exterieur.

```Dockerfile
# Utiliser une image de base avec NodeJS
FROM node:20-alpine

# On définit le répertoire de travail
WORKDIR /app

# On copie les fichiers de notre application dans le conteneur
# la commande COPY . . signifie que l'on copie tous les fichiers depuis le répertoire courant de la machine hôte vers le répertoire de travail du conteneur
COPY . .

# On installe les dépendances
RUN npm install

# On expose le port 3000
EXPOSE 3000

# On lance l'application
CMD ["node", "index.js"]
```

### Etape 3 : Création de l'image Docker

A partir du Dockerfile, on peut créer une image Docker avec la commande `docker build`. On se place dans le répertoire qui contient le Dockerfile, et on exécute la commande suivante :

```bash
docker build -t hello-world-api .
```

### Etape 4 : Lancer le conteneur

Pour lancer le conteneur, on utilise la commande `docker run` mais on doit préciser l'option `-p` pour mapper le port 3000 du conteneur sur le port 3000 de la machine hôte :

```bash
docker run -p 3000:3000 hello-world-api
```

On peut maintenant accéder à l'API REST depuis un navigateur ou un client HTTP (comme Postman) en se rendant à l'adresse `http://localhost:3000/hello`.

### Bonnes pratiques

#### Optimisation n°1 : Utilisation du cache pour les dépendances

- Optimisation du cache : Une pratique courante est de copier d'abord les fichiers package.json et package-lock.json, puis d'installer les dépendances, puis de copier le reste des fichiers. Cela permet de profiter du cache de Docker, en effet, si le fichier package.json n'a pas changé, Docker réutilisera le cache pour éviter de réinstaller les dépendances à chaque build.

```Dockerfile
FROM node:20-alpine
WORKDIR /app

# On copie les fichiers package.json et package-lock.json dans un premier temps pour profiter du cache de Docker
COPY package*.json ./

# On installe les dépendances
RUN npm install

# On copie le reste des fichiers
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
```

Pourquoi ça fonctionne ? Docker utilise un système de "layers" pour construire les images. Chaque instruction dans le Dockerfile crée un layer. Lorsque l'on exécute une commande `docker build`, Docker va vérifier si les layers ont déjà été créés. Si c'est le cas, Docker va réutiliser les layers existants, et ne va pas exécuter les instructions correspondantes. Cela permet de gagner du temps lors des builds, car on évite de ré-exécuter des instructions qui n'ont pas changé. Ainsi, en executant `COPY package*.json ./` et `RUN npm install` a part, si le fichier package.json n'a pas changé, Docker réutilisera le "layer" construit lors du dernier build, et ne ré-exécutera pas `RUN npm install`. Il construira en revanche un nouveau layer pour `COPY . .` car le contenu du répertoire courant aura (probablement) changé.

#### Optimisation n°2 : Gestion des droits
