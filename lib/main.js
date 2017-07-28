'use babel'

import { CompositeDisposable } from 'atom'

const languagePattern = /:lang\s*:\s*(\w+)/im
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
          'comment.block.empty-start.double-dot.restructuredtext': true,
          'markup.heading.restructuredtext': false,
          'markup.other.command.restructuredtext': false,
          'markup.raw.restructuredtext': false,
          'meta.doctest.restructuredtext': false,'meta.link.inline.restructuredtext': false,
          'meta.doctree-option.class.restructuredtext': false,
          'meta.doctree-option.name.restructuredtext': false,
          'meta.figure.restructuredtext': false,
          'meta.image-option.align.restructuredtext': false,
          'meta.image-option.alt.restructuredtext': false,
          'meta.image-option.height.restructuredtext': false,
          'meta.image-option.scale.restructuredtext': false,
          'meta.image-option.target.restructuredtext': false,
          'meta.image-option.width.restructuredtext': false,
          'meta.image.restructuredtext': false,
          'meta.link.footnote.auto.restructuredtext': false,
          'meta.link.footnote.symbol.auto.restructuredtext': false,
          'meta.link.reference.def.restructuredtext': false,
          'meta.link.reference': true,
          'meta.link.restructuredtext': false,
          'meta.raw.block.restructuredtext': false,
          'meta.sphinx-domain.restructuredtext': false,
          'punctuation.definition.table.header.column-divider.restructuredtext': false,
          'source.embedded.python': false,
          'string.other.uri.restructuredtext': false,
          'support.directive.restructuredtext': false,
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
    require('atom-package-deps').install('linter-spell')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
    this.disposables.dispose()
  }
}
