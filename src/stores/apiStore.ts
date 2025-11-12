import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAnalysisStore = defineStore('api', () => {
  const analysisId = ref<string | null>(null)
  const projectName = ref<string>('')
  const createdAt = ref<string | null>(null)

  const hasAnalysis = computed(() => !!analysisId.value)

  function setAnalysis(id: string, name: string, created: string) {
    analysisId.value = id
    projectName.value = name
    createdAt.value = created
  }

  function clearAnalysis() {
    analysisId.value = null
    projectName.value = ''
    createdAt.value = null
  }

  return {
    analysisId,
    projectName,
    createdAt,
    hasAnalysis,
    setAnalysis,
    clearAnalysis,
  }
})
