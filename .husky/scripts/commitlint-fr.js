#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Lire le message de commit
const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, 'utf-8').trim();

// Règles de validation
const conventionalCommitRegex = /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\([a-z]+\))?:\s.+/;

// Types valides avec descriptions
const types = {
  feat: 'Nouvelle fonctionnalité',
  fix: 'Correction de bug',
  docs: 'Documentation',
  style: 'Formatage du code',
  refactor: 'Refactorisation',
  perf: 'Amélioration des performances',
  test: 'Ajout de tests',
  chore: 'Tâches de maintenance',
  ci: 'Intégration continue',
  build: 'Système de build',
  revert: 'Annulation de commit'
};

// Scopes valides
const validScopes = ['client', 'server', 'shared', 'docs', 'ci', 'deps'];

console.log('\n🔍 Vérification du message de commit...\n');
console.log(`📝 Message: "${commitMsg}"\n`);

// Validation
if (!conventionalCommitRegex.test(commitMsg)) {
  console.log('❌ ERREUR: Le message de commit ne respecte pas les conventions!\n');
  
  console.log('📋 Format attendu:');
  console.log('   <type>(<scope>): <description>\n');
  
  console.log('📌 Types valides:');
  Object.entries(types).forEach(([key, desc]) => {
    console.log(`   - ${key.padEnd(10)} : ${desc}`);
  });
  
  console.log('\n🎯 Scopes disponibles:');
  console.log(`   ${validScopes.join(', ')}\n`);
  
  console.log('✅ Exemples valides:');
  console.log('   feat(client): ajouter page de connexion');
  console.log('   fix(server): corriger erreur 404');
  console.log('   docs: mettre à jour le README\n');
  
  console.log('❌ Exemples invalides:');
  console.log('   ajout fichier              (pas de type)');
  console.log('   feat ajouter page          (manque les deux-points)');
  console.log('   FEAT(client): nouvelle     (type en majuscules)\n');
  
  console.log('📚 Documentation: ./COMMIT_CONVENTIONS.md\n');
  
  process.exit(1);
}

// Vérifier le scope si présent
const scopeMatch = commitMsg.match(/\(([a-z]+)\)/);
if (scopeMatch) {
  const scope = scopeMatch[1];
  if (!validScopes.includes(scope)) {
    console.log(`⚠️  ATTENTION: Le scope "${scope}" n'est pas dans la liste recommandée.\n`);
    console.log('🎯 Scopes recommandés:');
    console.log(`   ${validScopes.join(', ')}\n`);
    console.log('💡 Vous pouvez continuer, mais considérez utiliser un scope standard.\n');
  }
}

console.log('✅ Message de commit valide!\n');
process.exit(0);
