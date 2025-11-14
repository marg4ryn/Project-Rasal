import { computed } from 'vue'
import { useApiStore } from '@/stores/apiStore'
import { api } from '@/services/api'
import type { ApiError } from '@/types/api'
import { useLogger } from '@/composables/useLogger'
import { useI18n } from 'vue-i18n'
import { useConnectionStore } from '@/stores/connectionsStore'

export function useApi() {
  const store = useApiStore()
  const connectionStore = useConnectionStore()
  const log = useLogger('useApi')
  const { t } = useI18n()

  const isLoading = computed(() => Object.values(store.loading).some((v) => v))

  async function fetchStructure(analysisId: string) {
    if (!analysisId) {
      const errorMsg = t('api.errors.noAnalysisId')
      store.setError('structure', errorMsg)
      log.error('No analysis ID provided')
      return false
    }

    log.info(`Fetching structure for analysis: ${analysisId}`)
    store.setLoading('structure', true)
    store.setError('structure', null)

    try {
      const data = await api.fetchStructure(analysisId)
      store.setStructure(data)
      log.info('Structure fetched successfully')
      log.info('data', data)
      return true
    } catch (err) {
      const error = err as ApiError
      const errorMsg = t(error.message) || t('api.errors.fetchStructureFailed')
      store.setError('structure', errorMsg)
      log.error('Failed to fetch structure:', error)
      return false
    } finally {
      store.setLoading('structure', false)
    }
  }

  async function fetchCodeCity() {
    const analysis = connectionStore.analyses.get('/system-overview')

    if (!analysis) {
      log.error('System overview analysis not found')
      return false
    }

    if (!analysis.result?.success) {
      log.error('Analysis result is not successful')
      return false
    }

    const analysisId = analysis.result.data

    if (!analysisId) {
      log.error('Analysis ID is missing in result data')
      return false
    }

    log.info(`Fetching structure from system overview, analysis ID: ${analysisId}`)
    return await fetchStructure(analysisId)
  }

  return {
    structure: computed(() => store.structure),
    isLoading,
    error: computed(() => store.errors.structure || null),
    fetchStructure,
    fetchCodeCity,
    clearAll: store.clearAll,
  }
}
