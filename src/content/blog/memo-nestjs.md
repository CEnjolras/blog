---
title: Memo NestJS
author: Clément Enjolras
pubDatetime: 2024-03-26T11:18:00.000+00:00
postSlug: nestjs-docker
featured: false
draft: true
tags:
  - Mémo
  - Backend
  - NestJS
description: "Reccueil de notes et snippets NestJS, référence pour mes etudiants"
---

# NestJS

## CLI

Si vous obtenez une erreur lorsque vous essayer de lancer une commande nest sur windows (ex: `nest new project-name`), se référer à la section [Bug windows](#bug-windows)

```
# Install
npm i -g @nestjs/cli

# Créer un nouveau projet
nest new project-name

# Créer un module
nest g module module-name

# Créer un controlleur pour un module
nest g controller module-name/controller-name

# Créer un service pour un module
nest g service module-name/service-name
```

## Définitions

- **Module**: Un module est un conteneur pour un groupe de composants liés. Un module peut contenir des contrôleurs, des services, des fournisseeurs, des etc.
- **Controller**: Un contrôleur est responsable de la gestion des requêtes entrantes et de renvoyer les réponses au client. C'est un peu l'équivalent du routeur dans Express.
- **Service ou Provider**: Un service est une classe qui peut contenir de la logique métier et peut être partagée entre plusieurs composants. Un service est injectable dans un contrôleur ou un autre service.

## Bug windows

1. Fermer tout les v
2. Ouvrir vscode en tant qu'administrateur
3. Dans le terminal de vscode, lancer la commande `Set-ExecutionPolicy Unrestricted`
4. Fermer vscode et réouvrir en tant qu'utilisateur normal
