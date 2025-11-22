import { computed } from 'vue'
import { useConnectionStore } from '@/stores/sseConnectorStore'
import { getAnalysisStatusLabelKey } from '@/types'

export function useSseConnector(analysisId: string, screenRoute: string, screenName: string) {
  const store = useConnectionStore()
  store.initializeAnalysis(analysisId, screenRoute, screenName)

  const analysis = store.getAnalysis(analysisId)
  const isRunning = store.isRunning(analysisId)
  const isCompleted = computed(() => analysis.value?.state === 'completed')
  const status = computed(() => analysis.value?.status)

  const statusLabel = computed(() =>
    status.value !== undefined ? getAnalysisStatusLabelKey(status.value) : undefined
  )

  const start = (params?: Record<string, string>) => store.startAnalysis(analysisId, params)
  const stop = () => store.stopAnalysis(analysisId)

  return {
    analysis,
    isRunning,
    isCompleted,
    status,
    statusLabel,
    start,
    stop,
  }
}
