import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnalysisStore = defineStore('analysis', () => {
  const link = ref('')
  const fromDate = ref('')
  const toDate = ref('')
  const repoName = ref('')

  function setLink(newLink: string) {
    link.value = newLink
  }

  function setDates(from: string, to: string) {
    fromDate.value = from
    toDate.value = to
  }

  function setRepoName(title: string) {
    repoName.value = title
  }

  return {
    link,
    fromDate,
    toDate,
    repoName,
    setLink,
    setDates,
    setRepoName,
  }
})
