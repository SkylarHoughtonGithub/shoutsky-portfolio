import { defineEcConfig } from 'astro-expressive-code'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

const commandDeckDark = {
  name: 'command-deck-dark',
  type: 'dark',
  colors: {
    'editor.background': '#0c110e',
    'editor.foreground': '#e4f2e9',
    'editorLineNumber.foreground': '#3a4a40',
    'editorLineNumber.activeForeground': '#8aa595',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#5a7563', fontStyle: 'italic' } },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
      ],
      settings: { foreground: '#6ee7a0' },
    },
    { scope: ['string', 'string.quoted', 'string.template', 'string.regexp'], settings: { foreground: '#bef264' } },
    { scope: ['constant.numeric', 'constant.language', 'constant', 'constant.character'], settings: { foreground: '#5eead4' } },
    { scope: ['variable', 'variable.other', 'meta.object-literal.key'], settings: { foreground: '#e4f2e9' } },
    { scope: ['variable.parameter', 'variable.parameter.function'], settings: { foreground: '#8aa595', fontStyle: 'italic' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'], settings: { foreground: '#6ee7a0' } },
    {
      scope: ['entity.name.type', 'support.type', 'support.class', 'entity.name.class', 'entity.other.inherited-class'],
      settings: { foreground: '#4ade80' },
    },
    {
      scope: ['entity.other.attribute-name', 'meta.attribute', 'meta.tag entity.other.attribute-name'],
      settings: { foreground: '#5eead4' },
    },
    { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#6ee7a0' } },
    { scope: ['keyword.operator'], settings: { foreground: '#5eead4' } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: '#8aa595' } },
    { scope: ['markup.heading'], settings: { foreground: '#4ade80' } },
    { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
    { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
    { scope: ['markup.inline.raw', 'markup.fenced_code'], settings: { foreground: '#bef264' } },
    { scope: ['invalid'], settings: { foreground: '#f87171' } },
  ],
}

const commandDeckLight = {
  name: 'command-deck-light',
  type: 'light',
  colors: {
    'editor.background': '#f6f9f3',
    'editor.foreground': '#152319',
    'editorLineNumber.foreground': '#aec3b4',
    'editorLineNumber.activeForeground': '#5a6b5f',
  },
  tokenColors: [
    { settings: { foreground: '#152319' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#7a8575', fontStyle: 'italic' } },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
      ],
      settings: { foreground: '#0d6a2a' },
    },
    { scope: ['string', 'string.quoted', 'string.template', 'string.regexp'], settings: { foreground: '#556b14' } },
    { scope: ['constant.numeric', 'constant.language', 'constant', 'constant.character'], settings: { foreground: '#0a5e5e' } },
    { scope: ['variable', 'variable.other', 'meta.object-literal.key'], settings: { foreground: '#152319' } },
    { scope: ['variable.parameter', 'variable.parameter.function'], settings: { foreground: '#5a6b5f', fontStyle: 'italic' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'], settings: { foreground: '#166a4a' } },
    {
      scope: ['entity.name.type', 'support.type', 'support.class', 'entity.name.class', 'entity.other.inherited-class'],
      settings: { foreground: '#0d6a4a' },
    },
    {
      scope: ['entity.other.attribute-name', 'meta.attribute', 'meta.tag entity.other.attribute-name'],
      settings: { foreground: '#0a5e5e' },
    },
    { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#0d6a2a' } },
    { scope: ['keyword.operator'], settings: { foreground: '#0a5e5e' } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: '#6a7570' } },
    { scope: ['markup.heading'], settings: { foreground: '#0d6a2a' } },
    { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
    { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
    { scope: ['markup.inline.raw', 'markup.fenced_code'], settings: { foreground: '#556b14' } },
    { scope: ['invalid'], settings: { foreground: '#991b1b' } },
  ],
}

export default defineEcConfig({
  defaultLocale: 'en',
  defaultProps: {
    wrap: false,
    collapseStyle: 'collapsible-auto',
    showLineNumbers: false,
    preserveIndent: true,
    frame: 'terminal',
  },
  minSyntaxHighlightingColorContrast: 0,

  styleOverrides: {
    uiFontFamily: 'var(--font-sans)',
    uiFontSize: '1em',
    codeFontFamily: 'var(--font-mono)',
    codeFontSize: '0.85rem',
    codeLineHeight: '1.4',
    borderRadius: '0.5rem',
    codePaddingBlock: '0.8571429em',
    codePaddingInline: '1.1428571em',
    borderColor: 'var(--term-border)',

    frames: {
      frameBoxShadowCssValue: 'none',
      inlineButtonBackgroundActiveOpacity: '0.2',
      inlineButtonBackgroundHoverOrFocusOpacity: '0.1',

      terminalBackground: 'var(--term-bg)',
      terminalTitlebarBackground: 'var(--term-header)',
      terminalTitlebarBorderBottomColor: 'var(--term-border)',
      terminalTitlebarForeground: 'var(--muted)',
      terminalTitlebarDotsForeground: '#3a4a40',
      terminalTitlebarDotsOpacity: '1',
      terminalWindowFallbackTitle: '',

      editorBackground: 'var(--term-bg)',
      editorTabBarBackground: 'var(--term-header)',
      editorTabBarBorderBottomColor: 'var(--term-border)',
      editorActiveTabBackground: 'var(--term-bg)',
      editorActiveTabForeground: 'var(--term-cmd)',
      editorActiveTabBorderColor: 'var(--term-border)',
      editorActiveTabIndicatorTopColor: 'var(--neon)',
      editorActiveTabIndicatorBottomColor: 'transparent',
    },
    textMarkers: {
      backgroundOpacity: '0.2',
      borderOpacity: '0.5',
      markBackground: 'color-mix(in srgb, var(--neon) 18%, transparent)',
      markBorderColor: 'var(--neon)',
      insBackground: 'color-mix(in srgb, var(--term-ok) 18%, transparent)',
      insBorderColor: 'var(--term-ok)',
    },
  },

  plugins: [
    pluginCollapsibleSections({
      defaultCollapsed: false,
    }),
    pluginLineNumbers(),
  ],

  themes: [commandDeckDark, commandDeckLight],
  themeCssSelector: (theme) => (theme.name === 'command-deck-dark' ? '.dark' : ':root:not(.dark)'),
  useDarkModeMediaQuery: false,
  emitExternalStylesheet: false,
})
