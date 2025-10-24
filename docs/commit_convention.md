# 📝 Conventions de Commit

Ce projet utilise **Conventional Commits** pour standardiser les messages de commit.

## 🎯 Format
```
<type>(<scope>): <description>

[corps optionnel]

[pied de page optionnel]
```

## 📌 Types de Commits

| Type | Emoji | Description | Exemple |
|------|-------|-------------|---------|
| **feat** | ✨ | Nouvelle fonctionnalité | `feat(client): ajouter page de connexion` |
| **fix** | 🐛 | Correction de bug | `fix(server): corriger erreur 404` |
| **docs** | 📝 | Documentation | `docs: mettre à jour le README` |
| **style** | 💄 | Formatage du code | `style(client): formater les composants` |
| **refactor** | ♻️ | Refactorisation | `refactor(server): simplifier les routes` |
| **perf** | ⚡️ | Amélioration performance | `perf(client): optimiser le rendu` |
| **test** | ✅ | Ajout de tests | `test(server): ajouter tests unitaires` |
| **chore** | 🔧 | Tâches maintenance | `chore: mettre à jour les dépendances` |
| **ci** | 👷 | Intégration continue | `ci: configurer GitHub Actions` |
| **build** | 📦 | Système de build | `build: configurer Webpack` |
| **revert** | ⏪ | Annulation commit | `revert: annuler feat(client): xyz` |

## 🎨 Scopes Disponibles

- **client** : Code front-end
- **server** : Code back-end
- **shared** : Code partagé
- **docs** : Documentation
- **ci** : Configuration CI/CD
- **deps** : Dépendances

## ✅ Exemples Valides
```bash
feat(client): ajouter formulaire d'inscription
fix(server): corriger la validation des emails
docs: ajouter guide de contribution
style: formater le code avec Prettier
refactor(client): simplifier la gestion d'état
test(server): ajouter tests pour l'API auth
chore(deps): mettre à jour React à la v18
```

## ❌ Exemples Invalides
```bash
ajout fichier                    # ❌ Pas de type
Ajout de fonctionnalité          # ❌ Pas de format correct
feat ajouter page                # ❌ Manque les deux-points
FEAT(client): nouvelle page      # ❌ Type en majuscules
```

## 🚀 Commandes Utiles
```bash
# Voir l'historique des commits
git log --oneline --graph

# Voir les commits par type
git log --oneline --grep="^feat"
git log --oneline --grep="^fix"
```

## 🔗 Références

- [Conventional Commits](https://www.conventionalcommits.org/fr/)
- [Commitlint](https://commitlint.js.org/)