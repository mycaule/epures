/* eslint max-depth: ["error", 6] */

const parse = rule => {
  let depth = 0
  let inTag = false
  let sections = []
  let escaped = false

  const errors = []
  let start = 0

  let escapedSubstring = ''
  let lastEscapedChar

  if (rule === null) {
    const sections = []
    sections.errors = errors

    return sections
  }

  const createSection = (start, end, type) => {
    if (end - start < 1) {
      if (type === 1) {
        errors.push(start + ': empty tag')
      }
      if (type === 2) {
        errors.push(start + ': empty action')
      }
    }
    let rawSubstring

    if (lastEscapedChar === undefined) {
      rawSubstring = rule.substring(start, end)
    } else {
      rawSubstring = escapedSubstring + '\\' + rule.substring(lastEscapedChar + 1, end)
    }

    sections.push({
      type,
      raw: rawSubstring
    })
    lastEscapedChar = undefined
    escapedSubstring = ''
  }

  for (let i = 0; i < rule.length; i++) {
    if (escaped) {
      escaped = false
    } else {
      const c = rule.charAt(i)

      switch (c) {
        // Enter a deeper bracketed section
        case '[':
          if (depth === 0 && !inTag) {
            if (start < i) {
              createSection(start, i, 0)
            }
            start = i + 1
          }
          depth++
          break

        case ']':
          depth--

          // End a bracketed section
          if (depth === 0 && !inTag) {
            createSection(start, i, 2)
            start = i + 1
          }
          break

        // Hashtag
        // ignore if not at depth 0, that means we are in a bracket
        case '#':
          if (depth === 0) {
            if (inTag) {
              createSection(start, i, 1)
              start = i + 1
            } else {
              if (start < i) {
                createSection(start, i, 0)
              }
              start = i + 1
            }
            inTag = !inTag
          }
          break

        case '\\':
          escaped = true
          escapedSubstring += rule.substring(start, i)
          start = i + 1
          lastEscapedChar = i
          break

        default:
      }
    }
  }

  if (start < rule.length) {
    createSection(start, rule.length, 0)
  }

  if (inTag) {
    errors.push('Unclosed tag')
  }
  if (depth > 0) {
    errors.push('Too many [')
  }
  if (depth < 0) {
    errors.push('Too many ]')
  }

  // Strip out empty plaintext sections
  sections = sections.filter(section => {
    if (section.type === 0 && section.raw.length === 0) {
      return false
    }
    return true
  })
  sections.errors = errors
  return sections
}

// Parse the contents of a tag
const parseTag = tagContents => {
  const parsed = {
    symbol: undefined,
    preactions: [],
    postactions: [],
    modifiers: []
  }
  const sections = parse(tagContents)
  let symbolSection
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].type === 0) {
      if (symbolSection === undefined) {
        symbolSection = sections[i].raw
      } else {
        throw new Error('multiple main sections in ' + tagContents)
      }
    } else {
      parsed.preactions.push(sections[i])
    }
  }

  if (symbolSection === undefined) {
    // Throw ("no main section in " + tagContents);
  } else {
    const components = symbolSection.split('.')
    parsed.symbol = components[0]
    parsed.modifiers = components.slice(1)
  }
  return parsed
}

module.exports = {parseTag, parse}
