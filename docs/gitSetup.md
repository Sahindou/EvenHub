# Guide de Configuration Git - EventHub

## Objectif
Ce guide détaille la configuration complète de Git pour le projet EventHub, incluant la configuration SSH et les bonnes pratiques DevOps.

## Configuration Initiale

### 1. Configuration globale Git
```bash
# Configuration de l'identité
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

### 2. Configuration SSH pour GitHub

#### Génération de la clé SSH
```bash
# Génération d'une nouvelle clé SSH
ssh-keygen -t ed25519 -C "votre.email@example.com" -f ~/.ssh/id_ed25519_github

# copier la clé => c'est important pour l'étape suivante
cat ~/.ssh/id_ed25519.pub 
```

#### Configuration SSH
Sur l'interface graphique github ou gitlab c'est facile .

## Initialisation du Repository

### 1. Création du repository local
```bash
# Initialisation du repository
git init

# Ajout du remote origin
git remote add origin git@github.com:[username]/eventhub.git

# Vérification de la configuration
git remote -v
```

### 2. Premier commit
```bash
# Ajout de tous les fichiers
git add .

# Commit initial avec message descriptif
git commit -m "Initial commit: EventHub DevOps project"

# Push vers GitHub
git push -u origin main
```

## 📋 Workflow Git Recommandé

### 1. Structure des branches
```
main (production)
├── dev (développement)
├── feature/[nom-feature]
├── fix/[nom-correction]
└── release/[version]
```

### 2. Commandes essentielles 
```bash
# Création d'une nouvelle feature
git checkout -b feature/docker-optimization
git add .
git commit -m "feat: Add Docker multi-stage build optimization"
git push origin feature/docker-optimization

# Fusion d'une feature
git checkout main
git merge feature/docker-optimization
git push origin main

# Création d'un tag de version
git tag -a v1.0.0 -m " Version 1.0.0 - Production ready"
git push origin v1.0.0
```

## 📝 Convention de Commit

### Format recommandé
```
<type>: <description>
```

### Types de commit
- `✨ feat`: Nouvelle fonctionnalité
- `🐛 fix`: Correction de bug
- `📚 docs`: Documentation
- `🎨 style`: Formatage, pas de changement de code
- `♻️ refactor`: Refactoring de code
- `⚡ perf`: Amélioration des performances
- `✅ test`: Ajout ou modification de tests
- `🔧 chore`: Tâches de maintenance
- `🐳 docker`: Modifications liées à Docker
- `🚀 deploy`: Déploiement

### Exemples de commits
```bash
git commit -m "🐳 docker: optimize Dockerfile with multi-stage build"
git commit -m "✨ feat(auth): add user authentication system"
git commit -m "📚 docs: update deployment guide with Docker commands"
git commit -m "🐛 fix(api): resolve CORS issue in development environment"
```

## 🔍 Commandes de Diagnostic

### Vérification de l'état du repository
```bash
# État actuel
git status

# Historique des commits
git log --oneline --graph

# Différences non committées
git diff

# Informations sur le remote
git remote show origin
```

### Commandes de restauration
```bash
# Annuler les modifications non committées
git checkout -- .

# Revenir au commit précédent (soft)
git reset --soft HEAD~1

# Revenir au commit précédent (hard, attention!)
git reset --hard HEAD~1
```

## 🎯 Points Clés pour la Soutenance

### 1. Démonstration Git
- Montrer la configuration SSH fonctionnelle
- Démontrer un workflow complet (add, commit, push)
- Expliquer la structure des branches
- Présenter l'historique des commits avec `git log --graph`

### 2. Bonnes pratiques appliquées
- ✅ Messages de commit descriptifs et standardisés
- ✅ Utilisation d'emojis pour la lisibilité
- ✅ Fichier .gitignore complet
- ✅ Configuration SSH sécurisée
- ✅ Remote origin configuré correctement

### 3. Commandes de vérification rapide
```bash
# Vérifier la configuration Git
git config --list | grep user

# Vérifier la connexion GitHub
ssh -T git@github.com

# Vérifier l'état du repository
git status && git remote -v

# Afficher l'historique proprement
git log --oneline --graph --all
```

## ⚠️ Troubleshooting

### Problèmes courants et solutions
1. **Erreur SSH**: Vérifier les permissions des clés (`chmod 600 ~/.ssh/id_*`)
2. **Conflit de merge**: Utiliser `git mergetool` ou résoudre manuellement
3. **Push rejeté**: Faire un `git pull --rebase` avant le push
4. **Commit mal formaté**: Utiliser `git commit --amend` pour corriger

---
*Guide DevOps - EventHub Project*