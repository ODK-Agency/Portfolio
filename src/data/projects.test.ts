import { describe, expect, test } from 'vitest'

import { portfolioProjects } from './projects'

describe('portfolio project content', () => {
  test("adds Kimani's Redemption as the newest narrative project", () => {
    const kimani = portfolioProjects.find(
      (project) => project.slug === 'kimanis-redemption',
    )

    expect(portfolioProjects[0]?.slug).toBe('kimanis-redemption')
    expect(kimani).toMatchObject({
      title: "Kimani's Redemption",
      year: '2026',
      location: 'Remote, Sénégal x Kenya x Nigeria x Allemagne x Suède',
      kinds: expect.arrayContaining(['narrative']),
      tags: expect.arrayContaining(['storytelling', 'heritage', 'gamejam']),
      stack: expect.arrayContaining([
        'Unity',
        'C#',
        'narration interactive',
        'design 2D',
        'audio',
      ]),
    })
    expect(kimani?.role.en).toContain('Team 3')
    expect(kimani?.role.fr).toContain('Team 3')
    expect(kimani?.media).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'video',
          src: expect.stringContaining('GameplayTeam3%20(1).mp4'),
        }),
      ]),
    )
  })

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
