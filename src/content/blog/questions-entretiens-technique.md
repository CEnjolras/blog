---
title: Questions entretiens technique
author: Clément Enjolras
pubDatetime: 2024-06-19T11:18:00.000+00:00
postSlug: questions-entretiens-techique
featured: false
draft: true
tags:
  - Algo
  - Javascript
description: "Questions entretiens technique"
---

## Différence entre Shadow DOM et Virtual DOM ?

### Virtual DOM :

- **Représentation Virtuelle** : Utilisé dans des bibliothèques comme VueJS ou ReactJS, c'est une représentation allégée du DOM, stockée en mémoire sous forme d'objets.
- **Diffing** : Lorsqu'un changement dans l'UI doit intervenir, on recalcule un nouveau Virtual DOM et on le compare avec l'ancien.
- **Réconciliation** : On applique au DOM réel uniquement les changements nécessaires pour correspondre au Virtual DOM recalculé.
- **Bénéfice** : Optimisation des performances, car les modifications du DOM sont des opérations coûteuses.

### Shadow DOM :

- Element natif de javascript introduit par la W3C.
- Permet de créer un nouveau DOM isolé et de l'insérer dans un DOM hote
- Tout les elements du Shadow DOM sont isolé et n'impact pas le DOM hote. Par exemple le CSS
- Avantage :
  - Permet de créer des composants réutilisable et facilement transportable
  - Protège la logique et le DOM interne en cas de changement au niveau de l'application hote.
- Exmple concret : Création d'un date picker, exention navigateurs, design system

## Qu'est-ce que le concept de Flexbox :

Flexbox est une méthode de mise en page CSS qui permet de créer des interfaces "fluides" ou "flexibles" sans avoir à connaître à l'avance la taille des éléments. Le navigateur se charge de faire le rendu le plus cohérent en fonction de ce que nous lui avons décrit et du contenu des éléments.

- Flexbox : Abréviation de "Flexible Box Layout", Flexbox est un modèle de mise en page conçu pour disposer les éléments de manière flexible.
- Interfaces fluides : Flexbox permet de créer des interfaces réactives qui s'adaptent automatiquement aux différentes tailles d'écran et résolutions.
- Rendu cohérent : Le navigateur calcule et ajuste la disposition des éléments pour qu'ils soient correctement alignés et dimensionnés, même si leurs tailles ne sont pas spécifiées à l'avance.

## Qu'est-ce que le concept de hoisting en JavaScript ?

Le hoisting est un mécanisme qui permet de "remonter" les déclarations de fonctions et de variables au sommet de leur scope, ce qui permet d'appeler une fonction avant sa déclaration dans le code. Par exemple, une fonction déclarée à la ligne 2 peut être appelée à la ligne 1.

## Qu'est-ce que le concept de Closure en JavaScript ?

Une closure est une fonction qui se souvient du contexte dans lequel elle a été déclarée, même si ce contexte n'existe plus. Une closure se crée en déclarant une fonction interne dans une fonction externe. La fonction interne utilise des variables de la fonction externe, et la fonction externe retourne la fonction interne.

#### À quoi ça sert ?

- **Émuler des variables privées** : Les closures permettent de créer des variables privées accessibles uniquement par des fonctions internes.
- **Dans les callbacks pour se rappeler du contexte** : Par exemple, une fonction qui crée une carte en HTML/CSS avec un bouton déclenchant un appel API vers une URI dépendant de l'ID de la carte. Lorsqu'on fait `element.addEventListener("click", function() { fetch(URI + id); });`, au moment d'exécuter le onClick, la fonction de création de la carte a terminé son exécution, mais le onClick se souvient de l'ID de la carte grâce à la closure.

### Quelles sont les meilleures pratiques pour améliorer les performances d'une application web front-end ?

- Minimisation : Utilisez des outils comme Vite, Webpack, etc., pour minifier et optimiser vos fichiers CSS, JavaScript et HTML.
  Utilisation des CDNs : Utilisez des Content Delivery Networks (CDNs) autant que possible pour servir des bibliothèques et des ressources tierces, réduisant ainsi la charge sur votre serveur et améliorant le temps de chargement.
- Réduction de la taille du bundle : Minimisez la taille du bundle en réfléchissant bien avant d'introduire une nouvelle bibliothèque dans le projet et en utilisant des techniques comme le tree shaking pour éliminer le code mort.
- Lazy Loading : Implémentez le lazy loading pour charger les images, les composants et d'autres ressources uniquement lorsque cela est nécessaire, réduisant ainsi le temps de chargement initial de la page.
- Compression des assets : Activez la compression Gzip sur le serveur pour réduire la taille des fichiers transférés.
- Optimisation des images : Utilisez des formats d'image optimisés (comme WebP) et des techniques de compression pour réduire la taille des images sans sacrifier la qualité.
- Caching : Mettez en place des stratégies de mise en cache efficaces pour réduire les requêtes HTTP répétitives et accélérer le chargement des pages.
- Optimisation du rendu : Utilisez des techniques comme le Critical CSS pour charger d'abord les styles essentiels au rendu de la page, et déplacez les scripts non critiques à la fin du document ou utilisez l'attribut defer.
- Audit de performance : Utilisez des outils comme Google Lighthouse pour auditer et identifier les goulots d'étranglement de performance dans votre application web.

### Comment gérez-vous le lazy loading des images et des composants dans une application React ?

- Utilisation de l'attribut `loading="lazy"` qui est maintenant supporté par la plupart des navigateurs

```javascript
<img src="path/to/image.jpg" alt="description" loading="lazy" />
```

- Utilisation de bibliothèque externe tel que `react-lazyload`
- Utilisation de React.lazy et Suspense : React fournit une manière intégrée de faire du lazy loading de composants avec React.lazy et Suspense.

```javascript
import React, { Suspense, lazy } from "react";

// Import lazy component
const LazyComponent = lazy(() => import("./LazyComponent"));

const App = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  </div>
);

export default App;
```

### Comment implémenter du cache front end ?

### 1. Utiliser les En-têtes HTTP de Cache

Les en-têtes HTTP permettent de contrôler le comportement de mise en cache des ressources. Voici quelques en-têtes courants :

- **Cache-Control** : Permet de définir des directives de cache. Par exemple :

  ```http
  Cache-Control: max-age=3600, must-revalidate
  ```

- **ETag** : Permet de vérifier si une ressource a été modifiée depuis la dernière fois qu'elle a été téléchargée.

  ```http
  ETag: "12345"
  ```

- **Expires** : Spécifie une date après laquelle la ressource est considérée comme expirée.
  ```http
  Expires: Wed, 21 Oct 2024 07:28:00 GMT
  ```

### 2. Service Workers

Les Service Workers permettent de gérer les demandes de réseau de manière programmée et de mettre en cache des ressources dynamiquement.

**Exemple avec Workbox :**

```bash
npm install workbox-cli --global
```

**Service Worker (sw.js) :**

```javascript
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";

// Pré-cache des ressources statiques
precacheAndRoute(self.__WB_MANIFEST);

// Mise en cache des requêtes API
registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image",
  new CacheFirst({
    cacheName: "static-resources",
  })
);
```

**Enregistrement du Service Worker :**

```javascript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(registration => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(error => {
      console.log("Service Worker registration failed:", error);
    });
}
```

### 3. LocalStorage et SessionStorage

**LocalStorage** et **SessionStorage** permettent de stocker des données en paires clé/valeur.

**Exemple avec LocalStorage :**

```javascript
// Stocker des données
localStorage.setItem("username", "JohnDoe");

// Récupérer des données
const username = localStorage.getItem("username");
console.log(username); // JohnDoe
```

#### Qu'est ce qu'un service worker

#### Qu'est ce que le tree shaking ?

C'est une technique qui se base sur les import / export de fonctions javascript pour détecter le code mort dans une application

#### Qu'est ce que CSS font display

#### Explain higher order function in JS and give an example
