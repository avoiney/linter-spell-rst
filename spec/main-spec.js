
'use babel'

describe('The linter-spell-rst provider for Atom Linter', () => {
  const grammar = require('../lib/main').provideGrammar()[0]

  beforeEach(() => {
    waitsForPromise(() => {
      return atom.packages.activatePackage('linter-spell-rst')
    })
  })

  it('finds language "entry.rst"', () => {
    waitsForPromise(() => {
      return atom.workspace.open(path.join(__dirname, 'files', 'entry.rst')).then(editor => {
        expect(_.isEqual(grammar.findLanguageTags(editor), ['en-US'])).toBe(true, 'en-US language')
      })
    })
  })
})
