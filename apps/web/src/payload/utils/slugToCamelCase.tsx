export function slugToCamelCase(slug: string): string {
  const words = slug.split('-')
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word
    }
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
  return camelCaseWords.join('')
}
