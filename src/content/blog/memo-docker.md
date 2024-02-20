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

Ce mémo est destiné à mes étudiants, c'est les notes que je leur donne a la fin de mon cours sur Docker.
Ces notes sont un résumé des éléments essentiels à connaître pour commencer à utiliser Docker. Je m'en sers également comme référence personnelle.

## Sommaire

- [Qu'est-ce que Docker ?](#qu-est-ce-que-docker)

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

## Installation de Docker
