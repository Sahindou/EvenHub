module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['client', 'server', 'shared', 'docs', 'ci', 'deps', ]
    ],
    // Messages en français
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nouvelle fonctionnalité
        'fix',      // Correction de bug
        'docs',     // Documentation
        'style',    // Formatage (sans changement de code)
        'refactor', // Refactorisation
        'perf',     // Amélioration des performances
        'test',     // Ajout de tests
        'chore',    // Tâches (configuration, etc.)
        'ci',       // Intégration continue
        'build',    // Système de build
        'revert'    // Annulation d'un commit
      ]
    ]
  },
  prompt: {
    messages: {
      type: 'Sélectionnez le type de changement que vous validez :',
      scope: 'Quelle est la portée de ce changement (optionnel) :',
      customScope: 'Quelle est la portée de ce changement :',
      subject: 'Écrivez une description courte et impérative du changement :\n',
      body: 'Fournissez une description plus détaillée du changement (optionnel). Utilisez "|" pour les sauts de ligne :\n',
      breaking: 'Listez les BREAKING CHANGES (optionnel). Utilisez "|" pour les sauts de ligne :\n',
      footer: 'Listez les ISSUES fermées par ce changement (optionnel). Ex: #31, #34 :\n',
      confirmCommit: 'Êtes-vous sûr de vouloir procéder avec le commit ci-dessus ?'
    },
    types: [
      { value: 'feat', name: 'feat:     ✨ Nouvelle fonctionnalité' },
      { value: 'fix', name: 'fix:      🐛 Correction de bug' },
      { value: 'docs', name: 'docs:     📝 Documentation' },
      { value: 'style', name: 'style:    💄 Formatage, point-virgules manquants, etc.' },
      { value: 'refactor', name: 'refactor: ♻️  Refactorisation du code' },
      { value: 'perf', name: 'perf:     ⚡️ Amélioration des performances' },
      { value: 'test', name: 'test:     ✅ Ajout de tests' },
      { value: 'chore', name: 'chore:    🔧 Tâches de maintenance' },
      { value: 'ci', name: 'ci:       👷 Intégration continue' },
      { value: 'build', name: 'build:    📦 Système de build' },
      { value: 'revert', name: 'revert:   ⏪ Annulation d\'un commit' }
    ]
  }
};
