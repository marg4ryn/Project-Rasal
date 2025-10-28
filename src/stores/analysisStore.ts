import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    link: '' as string,
    fromDate: '' as string,
    toDate: '' as string,
  }),
  actions: {
    setLink(newLink: string) {
      this.link = newLink
    },
    setDates(from: string, to: string) {
      this.fromDate = from
      this.toDate = to
    },
  },
})
