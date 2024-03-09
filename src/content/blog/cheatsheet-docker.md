---
title: Memo docker
author: Clément Enjolras
pubDatetime: 2024-03-11T11:18:00.000+00:00
postSlug: cheatsheet-docker
featured: false
draft: true
tags:
  - Mémo
  - DevOps
  - Docker
description: "Cheatsheet Docker"
---

# Cheatsheet Docker

## Docker CLI

### Récupérer une image Docker

```bash
docker pull <image-name>
```

### Lister les images Docker présentes sur la machine

```bash
docker images
```

### Lancer un conteneur Docker

```bash
docker run -it <image-name>
```

- `-i` : Mode interactif
- `-t` : Mode terminal

### Lister les conteneurs Docker en cours d'exécution

```bash
docker ps
```

### Build une image Docker depuis un Dockerfile

```bash
docker build -t <image-name> .
```

- `-t` : Permet de nommer l'image
- `.` : Chemin du répertoire contenant le Dockerfile

### Supprimer une image Docker

```bash
docker rmi <image-name>
```

### Lancer un conteneur Docker et mapper un port

```bash
docker run -p <port-local>:<port-conteneur> <image-name>
```
