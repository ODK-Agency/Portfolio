import { describe, expect, test } from 'vitest'

import { portfolioProjects } from './projects'

describe('portfolio project content', () => {
  test('keeps Langa Bouri anchored in Senegal', () => {
    const langaBouri = portfolioProjects.find(
      (project) => project.slug === 'langa-bouri',
    )

    expect(langaBouri?.location).toBe('Sénégal')
  })

  test('does not reuse Langa Bouri media on the Micro-Folie case study', () => {
    const microFolie = portfolioProjects.find(
      (project) => project.slug === 'micro-folie-digital-heritage',
    )

    expect(microFolie?.media).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          src: expect.stringContaining('Langa'),
        }),
      ]),
    )
  })

  test('does not present public speaking work as jury work', () => {
    const serialized = JSON.stringify(portfolioProjects).toLowerCase()

    expect(serialized).not.toContain('jury')
  })
})
