---
title: Blind 75
author: Clément Enjolras
pubDatetime: 2024-06-14T11:18:00.000+00:00
postSlug: blind75-tricks
featured: false
draft: true
tags:
  - Algo
  - Javascript
  - Blind75
description: "Notes sur les 75 problèmes d'algo les plus fréquemment posés"
---

## Sommaire

- [Two Sum](#two-sum)

## Two Sum

> Etant donné un tableau d'entiers `nums` et un entier `target`, retourner les indices de deux éléments tels que la somme soit égale à `target`.

### Comment résoudre

- On s'appuit sur un hash map pour stocker les éléments déjà parcourus
- On parcourt le tableau et on vérifie si le complément de l'élément courant est déjà dans le hash map (complément = `target - nums[i]`)
- Si c'est le cas, on as trouvé
- Sinon, on ajoute l'élément courant au hash map

```javascript
function TwoSums(nums, target) {
  const visitedElements = new Map();

  for (const [index, value] of nums.entries()) {
    const complement = target - value;
    const complementIndex = visitedElements.get(complement);

    if (complementIndex !== undefined) {
      return [index, complementIndex];
    }

    visitedElements.set(value, index);
  }
}
```
