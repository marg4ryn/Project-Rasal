import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useDateFormatter } from '@/composables/useDateFormatter'
import * as i18n from '@/plugins/i18n'

vi.mock('@/plugins/i18n', () => ({
  getUserLanguage: vi.fn(),
}))

describe('useDateFormatter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('formatDate', () => {
    it('formats the date in English', () => {
      vi.mocked(i18n.getUserLanguage).mockReturnValue('en')
      const { formatDate } = useDateFormatter()

      const result = formatDate('2024-12-19')

      expect(result).toBe('December 19, 2024')
    })

    it('formats the date in Polish', () => {
      vi.mocked(i18n.getUserLanguage).mockReturnValue('pl')
      const { formatDate } = useDateFormatter()

      const result = formatDate('2024-12-19')

      expect(result).toBe('19 grudnia 2024')
    })

    it('accepts a Date object', () => {
      vi.mocked(i18n.getUserLanguage).mockReturnValue('en')
      const { formatDate } = useDateFormatter()

      const result = formatDate(new Date('2024-12-19'))

      expect(result).toContain('December')
    })
  })

  describe('formatDateTime', () => {
    it('formats the date and time', () => {
      vi.mocked(i18n.getUserLanguage).mockReturnValue('en')
      const { formatDateTime } = useDateFormatter()

      const result = formatDateTime('2024-12-19T15:30:45')

      expect(result).toContain('December 19, 2024')
      expect(result).toContain('15:30:45')
    })
  })
})
