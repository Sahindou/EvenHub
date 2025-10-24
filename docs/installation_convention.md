# Étape 1 : Configuration du Monorepo avec Workspaces
## Créer le package.json racine
```bash
cd ~/formation/EvenHub

cat > package.json << 'EOF'
{
  "name": "eventhub-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "src/client",
    "src/server"
  ],
  "scripts": {
    "prepare": "husky",
    "client:dev": "npm run dev --workspace=client",
    "server:dev": "npm run dev --workspace=server",
    "client:build": "npm run build --workspace=client",
    "server:build": "npm run build --workspace=server",
    "install:all": "npm install",
    "clean": "rm -rf node_modules src/*/node_modules"
  },
  "devDependencies": {},
  "lint-staged": {
    "src/**/*.{ts,tsx,js,jsx,json,md,yml,yaml,css,scss}": [
      "prettier --write"
    ]
  }
}
EOF
```