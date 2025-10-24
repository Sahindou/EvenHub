---
marp: true
---

---
title: Soutenance DEVOPS1 - EventHub
author: Abdallah & Sahindou
date: 24 Octobre 2025
---

# Soutenance DEVOPS1

## EventHub - Mise en place de l'environnement DevOps

**Projet:** EventHub - Plateforme de gestion d'événements et billetterie
**Objectif:** Introduction aux principes DevOps et outils collaboratifs

---

# Rappel des Objectifs

## Objectifs de la semaine

- Comprendre les principes et pratiques DevOps
- Maîtriser les outils collaboratifs et de gestion de versions
- Mettre en place son environnement de développement pour EventHub
- Containeriser l'application avec Docker
- Documenter l'ensemble du processus

---

# Environnement DevOps Configuré

## Configuration Git et GitHub

### Points clés
- Repository Git initialisé : `https://github.com/Sahindou/EvenHub.git`
- Configuration SSH fonctionnelle avec GitHub
- Structure du projet organisée et documentée
- Bonnes pratiques Git appliquées

### Workflow Git adopté

```
main (production stable)
  └── dev (développement)
       ├── feature/* (nouvelles fonctionnalités)
       └── fix/* (corrections urgentes)
```

### Convention de commits

Nous utilisons **Conventional Commits** avec validation automatique :

- `feat(scope):` Nouvelle fonctionnalité
- `fix(scope):` Correction de bug
- `docs:` Documentation
- `chore:` Tâches de maintenance
- `ci:` Configuration CI/CD

**Exemple de commits récents:**
```bash
chore(ci): configuration production complète avec Docker et Git workflow
docs(docs): tous les documentations pour le projet
feat(client): ajouter fichier de test
```

### Outils de qualité mis en place
- **Commitlint** : Validation des messages de commit
- **Husky** : Git hooks pour automatisation
- **Prettier** : Formatage du code

---

# Maîtrise de Docker

## Architecture multi-services

Notre application utilise Docker Compose avec 4 services :

| Service | Image/Build | Port | Description |
|---------|-------------|------|-------------|
| **client** | Node.js + Nginx | 8080:80 | Front-end React/Vite |
| **server** | Node.js | 3000 | API Backend TypeScript |
| **db** | PostgreSQL 15 | 5432 | Base de données |
| **cache** | Redis Alpine | 6379 | Cache distribué |

## Dockerfiles optimisés

### Client - Multi-stage build
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Avantages:**
- Image finale légère (80MB)
- Séparation build/runtime
- Utilisation de npm ci pour reproductibilité

### Server - Multi-stage build
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

**Avantages:**
- Compilation TypeScript dans le builder
- Image finale avec code compilé uniquement (236MB)
- Optimisation des layers Docker

## Concepts Docker maîtrisés

### Images Docker buildées
```bash
$ docker images | grep evenhub
evenhub-server   latest   981e7a7dac60   2 hours ago   236MB
evenhub-client   latest   f11882325d2b   2 hours ago   80MB
```

### Gestion des conteneurs
- `docker-compose build` : Construction des images
- `docker-compose up -d` : Lancement en arrière-plan
- `docker-compose logs -f` : Suivi des logs en temps réel
- `docker-compose down` : Arrêt et suppression des conteneurs

### Volumes et persistance
```yaml
volumes:
  data:  # Volume pour PostgreSQL
```

### Variables d'environnement
Fichier `.env.production` configuré avec :
- `DATABASE_URL` : Connexion PostgreSQL
- `REDIS_URL` : Connexion Redis
- `VITE_API_URL` : URL de l'API pour le client
- `PORT` : Port du serveur

---

# Réseaux et Communication

## Configuration réseau Docker

### Réseau isolé
```yaml
networks:
  evenhub-network:
```

Tous les services communiquent via un réseau bridge privé nommé `evenhub-network`.

### Communication inter-conteneurs
- Le client peut atteindre le serveur via `http://server:3000`
- Le serveur communique avec PostgreSQL via `db:5432`
- Le serveur utilise Redis via `cache:6379`

### Health checks
Chaque service dispose d'un health check pour garantir la disponibilité :

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Dépendances entre services
```yaml
depends_on:
  server:
    condition: service_healthy  # Le client attend que le server soit healthy
```

### Port mapping
- **Client:** `8080:80` - Accessible via `http://localhost:8080`
- **Server:** API interne non exposée (communication via réseau Docker)

---

# Documentation Technique

## Livrables produits

### Documentation principale
1. **[README.md](README.md)** - Guide complet du projet
   - Architecture du projet
   - Instructions d'installation
   - Workflow Git
   - Commandes Docker

2. **[docs/gitSetup.md](docs/gitSetup.md)** - Configuration Git complète
   - Configuration SSH
   - Workflow Git détaillé
   - Commandes essentielles
   - Troubleshooting

3. **[docs/commit_convention.md](docs/commit_convention.md)** - Convention de commits
   - Format Conventional Commits
   - Types et scopes disponibles
   - Exemples pratiques

4. **[docs/installation_convention.md](docs/installation_convention.md)** - Installation des outils

### Documentation visuelle
- Captures d'écran de la protection des branches
- Historique Git illustré
- Convention de commits visualisée

### Fichiers de configuration
- `.gitignore` - Fichiers à ignorer par Git
- `.dockerignore` - Fichiers exclus des images Docker
- `commitlint.config.js` - Configuration de validation des commits
- `.prettierrc` - Configuration du formatage

---

# Démonstration Complète

## Workflow de bout en bout

### 1. Clone du repository
```bash
git clone https://github.com/Sahindou/EvenHub.git
cd EvenHub
```

### 2. Configuration de l'environnement
```bash
cp .env.production .env
```

### 3. Build des images Docker
```bash
docker-compose build
```

**Résultat:**
- Image `evenhub-client:latest` (80MB)
- Image `evenhub-server:latest` (236MB)

### 4. Lancement des services
```bash
docker-compose up -d
```

**Services démarrés:**
- PostgreSQL (db)
- Redis (cache)
- Backend API (server)
- Frontend Nginx (client)

### 5. Vérification du fonctionnement
```bash
# Vérifier les conteneurs
docker-compose ps

# Consulter les logs
docker-compose logs -f

# Tester l'accès
curl http://localhost:8080
```

### 6. Développement avec Git
```bash
# Créer une feature branch
git checkout -b feature/nouvelle-fonctionnalite

# Développer et committer
git add .
git commit -m "feat(client): ajouter nouvelle fonctionnalité"

# Pousser vers GitHub
git push origin feature/nouvelle-fonctionnalite
```

### 7. Arrêt propre
```bash
docker-compose down
```

---

# Points Techniques Maîtrisés

## Git & Collaboration

- Configuration SSH sécurisée avec GitHub
- Workflow Git Flow adapté (main/dev/feature/fix)
- Convention de commits avec validation automatique
- Protection des branches configurée
- Git hooks automatisés (Husky)

## Docker & Containers

- Dockerfiles multi-stage pour optimisation
- Docker Compose pour orchestration multi-services
- Réseaux Docker isolés
- Health checks et dépendances entre services
- Gestion des volumes pour persistance
- Variables d'environnement sécurisées
- Images légères avec Alpine Linux

## DevOps Practices

- Infrastructure as Code (docker-compose.yml)
- Documentation technique complète
- Automatisation avec git hooks
- Standards de qualité du code (Prettier, Commitlint)
- Environnement de développement reproductible

---

# Difficultés Rencontrées et Solutions

## Défis techniques

### 1. Configuration des health checks
**Problème:** Les services démarraient dans le désordre
**Solution:** Ajout de health checks avec `condition: service_healthy`

### 2. Optimisation des images Docker
**Problème:** Images Docker trop volumineuses
**Solution:**
- Utilisation de multi-stage builds
- Base Alpine Linux
- npm ci au lieu de npm install

### 3. Communication entre conteneurs
**Problème:** Le client ne pouvait pas joindre le serveur
**Solution:** Configuration du réseau Docker bridge personnalisé

---

# Compétences Acquises

## Techniques
- Maîtrise de Git (workflow, branches, commits)
- Configuration et utilisation de Docker
- Orchestration multi-services avec Docker Compose
- Gestion des réseaux et volumes Docker
- Configuration SSH et sécurité

## Méthodologiques
- Application des principes DevOps
- Documentation technique
- Automatisation des processus
- Collaboration avec Git
- Bonnes pratiques de développement

## Outils
- Git & GitHub
- Docker & Docker Compose
- SSH
- Commitlint & Husky
- Prettier

---

# Prochaines Étapes

## Semaine 2 - Intégration Continue

- Mise en place GitHub Actions
- Tests automatisés
- Déploiement automatique
- Quality gates

## Améliorations futures

- Push des images sur Docker Hub
- Configuration de monitoring (logs, métriques)
- Mise en place d'un reverse proxy
- Certificats SSL pour HTTPS
- Scripts de déploiement automatisés

---

# Questions et Évaluation

## Prêt à répondre aux questions sur :

- La configuration Git et le workflow adopté
- L'architecture Docker et le choix des services
- Les Dockerfiles et leur optimisation
- La communication entre conteneurs
- Les bonnes pratiques DevOps appliquées
- Les conventions de commits et leur validation

## Démonstration supplémentaire disponible

- Création d'une nouvelle branche feature
- Commit avec convention respectée
- Build et lancement de l'environnement complet
- Modification et rebuild d'un service

---

# Merci !

## Liens du projet

- **GitHub Repository:** https://github.com/Sahindou/EvenHub.git
- **Documentation:** [docs/](docs/)

## Équipe DevOps

- **DevOps Engineer:** Sahindou
- **Project Lead:** Abdallah

---

# Auto-évaluation

## Points forts
- Environnement DevOps complet et fonctionnel
- Documentation exhaustive et claire
- Convention de commits stricte et automatisée
- Architecture Docker optimisée
- Workflow Git professionnel

## Points d'amélioration
- Ajouter des tests automatisés
- Mettre en place CI/CD
- Déployer sur un environnement de production
- Implémenter le monitoring

## Note d'auto-évaluation : 18/20

**Objectifs de la semaine atteints avec succès !**
