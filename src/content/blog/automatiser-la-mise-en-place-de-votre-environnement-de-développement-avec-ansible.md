---
author: Clément Enjolras
pubDatetime: 2023-11-04T17:39:00Z
title: Automatiser la mise en place de son environnement de dev avec Ansible
postSlug: automatiser-la-mise-en-place-de-votre-environnement-de-développement-avec-ansible
featured: false
draft: false
tags:
  - ansible
  - devops
  - linux
description: Découvrez comment Ansible peut simplifier la mise en place et la maintenance de votre environnement de développement, en particulier sous Linux.
---

Recevoir un tout nouveau PC flambant neuf ou décider de tester une nouvelle distribution Linux, c'est toujours un bon moment. Cependant, la réalité de devoir transférer tous ces outils, réconfigurer ces raccourcis clavier, retrouver son fond d'écran préféré, etc., peut rapidement devenir fastidieuse et gâcher le plaisir. J'ai cherché des solutions pour automatiser cette tâche, notamment la création de scripts personnalisés, qui sont chronophages et extrêmement compliqués à maintenir dans le temps. C'est à ce moment-là qu'entre en jeu Ansible, une solution que j'ai tout de suite adoptée.

## Qu'est-ce qu'Ansible ?

Ansible est traditionnellement un outil d'automatisation IT destiné au déploiement à grande échelle de systèmes homogènes. Cependant, il offre également une solution puissante pour préparer une sorte de "recette" applicable à chaque nouveau PC, permettant ainsi la réinstallation et la configuration automatique de tous les outils et logiciels que nous apprécions. Ansible utilise le langage YAML pour définir les tâches, le rendant simple et lisible. Voici pourquoi j'ai choisi Ansible :

- **Idempotence** : Les tâches Ansible sont idempotentes, ne modifiant le système que si nécessaire.
- **Portabilité** : Écrivez une fois, exécutez partout. Qu'il s'agisse d'Arch, d'Ubuntu, de MacOS ou d'un autre système, Ansible s'adapte.
- **Compétences transférables** : Les compétences acquises avec Ansible pour votre propre système peuvent également vous être utiles dans votre vie professionnelle.

## Comprendre Ansible avec un exemple basique

Ansible fonctionne autour de la notion de "playbooks". Un playbook est un ensemble de directives que vous souhaitez qu'Ansible exécute, spécifiées en YAML. Supposons que nous voulons automatiser l'installation d'un paquet :

**Étape 1** : Dans un fichier `playbook-example.yml`.

```yaml
- name: Installer un paquet
  hosts: localhost
  become: yes
  tasks:
    - name: S'assurer que le paquet est installé
      ansible.builtin.package:
        name: nom_du_paquet
        state: present
```

- `name` : C'est la description de la tâche.
- `hosts: localhost` : Indique que le playbook doit être exécuté localement.
- `become: yes` : Demande l'exécution des tâches avec des privilèges élevés (comme sudo).
- `ansible.builtin.package` : Détermine automatiquement le gestionnaire de paquets en fonction du système d'exploitation (apt, yum, pacman, etc.).
- `name: nom_du_paquet` : Spécifie le nom du paquet à installer.
- `state: present` : Indique que le paquet doit être installé.

**Étape 2** : Exécutez le playbook.

Une fois le playbook écrit, exécutez-le avec la commande suivante :

```bash
ansible-playbook playbook-example.yml --ask-become-pass
```

- `ask-become-pass` ou `-K` : Demande le mot de passe pour les privilèges d'élévation, généralement utilisé avec sudo, lors de l'exécution de tâches nécessitant des privilèges élevés.

## Exemple concret : Configuration du shell par défaut

J'utilise [Fish](https://fishshell.com/) comme shell. À chaque réinstallation du système, je dois définir Fish comme mon shell par défaut. Habituellement, cela nécessite une recherche sur Google ou la consultation de mes notes pour retrouver la fameuse commande `chsh -s /usr/bin/fish`. Voici comment automatiser cette tâche avec un playbook Ansible :

```yaml
- name: Installer Fish
  hosts: localhost
  become: yes
  tasks:
    - name: S'assurer que le paquet est installé
      ansible.builtin.package:
        name: fish
        state: present
    - name: Définir Fish comme shell par défaut
      ansible.builtin.command: chsh -s /usr/bin/fish
```

Bien que les exemples puissent sembler simples, imaginez l'impact positif lors de la configuration de plusieurs outils à chaque réinstallation du système. L'automatisation avec Ansible vous fait gagner du temps et améliore votre confort. Et ce n'est que le début : j'utilise également des playbooks pour des opérations plus complexes, comme la mise en place de tâches cron, la récupération de mes dotfiles, etc.
