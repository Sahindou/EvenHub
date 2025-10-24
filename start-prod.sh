#!/bin/bash

# Script de démarrage pour l'environnement de production

# Vérifier que le fichier .env.production existe
if [ ! -f .env.production ]; then
    echo "❌ Fichier .env.production introuvable!"
    exit 1
fi

echo "✓ Utilisation du fichier .env.production"

# Démarrer les containers avec --env-file
echo "🚀 Démarrage des containers Docker..."
docker compose --env-file .env.production up -d

# Afficher les logs
echo ""
echo "📋 Logs des containers:"
docker compose logs -f
