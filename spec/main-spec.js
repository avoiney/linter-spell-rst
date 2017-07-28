
'use babel'

describe('The linter-spell-rst provider for Atom Linter', () => {
  const grammar = require('../lib/main').provideGrammar()[0]

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace)
    waitsForPromise(() => {
      return atom.packages.activatePackage('linter-spell-rst')
    })
  })
})
