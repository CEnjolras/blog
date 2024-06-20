---
title: Algo - tips utiles
author: Clément Enjolras
pubDatetime: 2024-06-14T11:18:00.000+00:00
postSlug: blind75-tricks
featured: false
draft: true
tags:
  - Algo
  - Javascript
  - Blind75
description: "Tricks généraux d'algo"
---

## Array.sort() time complexity

`Array.sort()` utilise un algorithme de tri hybride, qui combine un tri rapide et un tri par insertion. La complexité temporelle de `Array.sort()` est de O(n log n) dans le meilleur et le pire des cas.

## Ajouter un element au milieux d'un tableau

```javascript
arr.splice(index, 0, value);
```

## Dernier index d'un tableau

```javascript
const lastIndex = arr.length - 1;
```

## Parcourir un tableau et obtenir un index et une valeur for of

```javascript
for (const [index, value] of arr.entries()) {
  console.log(index, value);
}
```

## Splitter
