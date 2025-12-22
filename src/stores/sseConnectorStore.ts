import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ref, computed, watch } from 'vue'
import { createAnalysisConnection } from '@/services/sseConnector'
import { useNotificationsStore } from '@/stores/notificationsStore'
import { Analysis, AnalysisConnection, ConnectionState, AnalysisStatus } from '@/types'
import { useLogger } from '@/composables/useLogger'

const log = useLogger('sseConnectorStore')
const STORAGE_KEY = 'sse-analysis'

const serializeAnalysis = (analysis: Analysis | null): string => {
  if (!analysis) return JSON.stringify(null)

  return JSON.stringify({
    ...analysis,
    startedAt: analysis.startedAt?.toISOString(),
    completedAt: analysis.completedAt?.toISOString(),
  })
}

const deserializeAnalysis = (json: string): Analysis | null => {
  try {
    const parsed: unknown = JSON.parse(json)

    if (parsed === null || typeof parsed !== 'object') {
      return null
    }

    const data = parsed as {
      analysisId?: string
      state?: ConnectionState
      status?: AnalysisStatus
      error?: string
      startedAt?: string
      completedAt?: string
    }

    return {
      ...data,
      startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
      completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
    }
  } catch (error) {
    log.error('Failed to deserialize analysis from localStorage:', error)
    return null
  }
}

export const useConnectionStore = defineStore('SSEconnectionStore', () => {
  const { t } = useI18n()

  const storedData = localStorage.getItem(STORAGE_KEY)
  const analysis = ref<Analysis | null>(storedData ? deserializeAnalysis(storedData) : null)
  const connection = ref<AnalysisConnection | null>(null)

  watch(
    analysis,
    (newAnalysis) => {
      localStorage.setItem(STORAGE_KEY, serializeAnalysis(newAnalysis))
    },
    { deep: true }
  )

  const getAnalysis = computed(() => analysis.value)

  const isRunning = computed(() => analysis.value?.state === 'running')

  const startAnalysis = (params?: Record<string, string>) => {
    if (analysis.value?.state === 'running') {
      log.warn('Analysis is already running')
      return
    }

    analysis.value = {
      analysisId: undefined,
      state: 'running',
      status: undefined,
      error: undefined,
      startedAt: new Date(),
      completedAt: undefined,
    }

    const notificationsStore = useNotificationsStore()

    connection.value = createAnalysisConnection(
      params,
      (status) => {
        if (analysis.value) {
          analysis.value.status = status
        }
      },
      (result) => {
        if (analysis.value) {
          analysis.value.state = 'completed'
          analysis.value.completedAt = new Date()
          analysis.value.analysisId = result

          const duration = analysis.value.startedAt
            ? Math.round(
                (analysis.value.completedAt.getTime() - analysis.value.startedAt.getTime()) / 1000
              )
            : 0

          notificationsStore.addNotification({
            message: t('notifications.analysis.completed', {
              screen: t('download-repository'),
              duration,
            }),
            type: 'success',
            screenRoute: '/repository-overview',
          })
        }
        connection.value = null
      },
      (error) => {
        if (analysis.value) {
          analysis.value.state = 'error'
          analysis.value.error = error
          analysis.value.completedAt = new Date()

          notificationsStore.addNotification({
            message: t('notifications.analysis.failed', {
              screen: t('download-repository'),
              error: t(error),
            }),
            type: 'error',
          })
        }
        connection.value = null
      }
    )
  }

  const stopAnalysis = () => {
    if (connection.value) {
      connection.value.cleanup()
      connection.value = null
    }

    if (analysis.value && analysis.value.state === 'running') {
      analysis.value.state = 'idle'
      analysis.value.status = undefined

      const notificationsStore = useNotificationsStore()
      notificationsStore.addNotification({
        message: t('notifications.analysis.cancelled'),
        type: 'info',
      })
    }
  }
  const setAnalysis = (newAnalysis: Analysis | null) => {
    analysis.value = newAnalysis
  }

  const clearAnalysis = () => {
    if (connection.value) {
      connection.value.cleanup()
      connection.value = null
    }
    analysis.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    analysis: getAnalysis,
    isRunning,
    startAnalysis,
    stopAnalysis,
    setAnalysis,
    clearAnalysis,
  }
})
