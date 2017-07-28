'use babel'

import { CompositeDisposable } from 'atom'

const languagePattern = /lang\s*:\s*"([^"]*)"/im
const grammarScopes = ['text.restructuredtext', 'source.rst']

export default {
  disposables: null,
  provideGrammar () {

    return [{
      grammarScopes: grammarScopes,
      findLanguageTags: textEditor => {
        let languages = []
        textEditor.scan(languagePattern, ({match, stop}) => {
          languages.push(match[1])
          stop()
        })
        return languages
      },
      checkedScopes: {
          'string.other.uri.restructuredtext': false,
          'markup.raw.restructuredtext': false,
          'markup.other.command.restructuredtext': false,
          'meta.link.restructuredtext': false,
          'meta.link.inline.restructuredtext': false,
          'comment.block.empty-start.double-dot.restructuredtext': true,
          'meta.link.footnote.symbol.auto.restructuredtext': false,
          'meta.link.footnote.auto.restructuredtext': false,
          'meta.link.reference.def.restructuredtext': false,
          'meta.link.reference': true,
          'meta.raw.block.restructuredtext': false,
          'meta.doctest.restructuredtext': false,
          'punctuation.definition.table.header.column-divider.restructuredtext': false,
          'markup.other.command.restructuredtext': false,
          'meta.image.restructuredtext': false,
          'meta.figure.restructuredtext': false,
          'meta.image-option.alt.restructuredtext': false,
          'meta.image-option.height.restructuredtext': false,
          'meta.image-option.width.restructuredtext': false,
          'meta.image-option.scale.restructuredtext': false,
          'meta.image-option.align.restructuredtext': false,
          'meta.image-option.target.restructuredtext': false,
          'meta.doctree-option.class.restructuredtext': false,
          'meta.doctree-option.name.restructuredtext': false,
          'meta.sphinx-domain.restructuredtext': false,
          'text.restructuredtext': true
      }
    }]
  },

  provideDictionary () {
    let wordList = require('linter-spell-word-list')
    let a = new wordList.ConfigWordList({
      name: 'reStructuredText',
      keyPath: 'linter-spell-rst.words',
      grammarScopes: grammarScopes
    })
    this.disposables.add(a)
    return a.provideDictionary()
  },

  activate () {
    this.disposables = new CompositeDisposable()
    require('atom-package-deps').install('linter-spell-rst')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
    this.disposables.dispose()
  }
}
