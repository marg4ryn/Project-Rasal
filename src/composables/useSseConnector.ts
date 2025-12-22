import { computed } from 'vue'
import { useConnectionStore } from '@/stores/sseConnectorStore'
import { getAnalysisStatusLabelKey } from '@/types'

export function useSseConnector() {
  const store = useConnectionStore()
  const analysis = store.analysis
  const isRunning = store.isRunning
  const isCompleted = computed(() => analysis?.state === 'completed')
  const status = computed(() => analysis?.status)

  const statusLabel = computed(() =>
    status.value !== undefined ? getAnalysisStatusLabelKey(status.value) : undefined
  )

  const start = (params?: Record<string, string>) => store.startAnalysis(params)
  const stop = () => store.stopAnalysis()

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
