import { useLogger } from '@/composables/useLogger'
import { AnalysisConnection, AnalysisStatus, AnalysisResult } from '@/types'

const log = useLogger('sseConnector')

export function createAnalysisConnection(
  analysisId: string,
  params: Record<string, string> | undefined,
  onProgress: (status: AnalysisStatus) => void,
  onSuccess: (result: AnalysisResult) => void,
  onError: (error: string) => void
): AnalysisConnection {
  let url = `${import.meta.env.VITE_API_URL}analysis`

  if (params) {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        queryParams.append(key, String(value))
      }
    })
    const queryString = queryParams.toString()
    if (queryString) {
      url += `?${queryString}`
    }
  }

  const eventSource = new EventSource(url)

  eventSource.addEventListener('progress', (event: MessageEvent) => {
    try {
      const status = JSON.parse(event.data) as AnalysisStatus

      log.info('Progress:', status)
      onProgress(status)
    } catch (error) {
      log.error('Failed to parse progress:', error)
    }
  })

  eventSource.addEventListener('success', (event: MessageEvent) => {
    try {
      const analysisId = event.data
      log.info('Analysis completed:', analysisId)
      const result: AnalysisResult = {
        data: analysisId,
        timestamp: new Date().toISOString(),
      }
      onSuccess(result)
      eventSource.close()
    } catch (error) {
      log.error('Failed to parse success:', error)
      onError('errors.failedToParseCompletionData')
      eventSource.close()
    }
  })

  eventSource.addEventListener('error', (event: MessageEvent) => {
    try {
      const errorMessage = event.data || 'errors.serverError'
      log.error('Server error')
      onError(errorMessage)
      eventSource.close()
    } catch (error) {
      log.error('Failed to parse error:', error)
      onError('errors.unknownServerError')
      eventSource.close()
    }
  })

  eventSource.onerror = () => {
    eventSource.close()
  }

  eventSource.onopen = () => {
    log.info(`SSE connection opened: "${analysisId}"`)
  }

  return {
    cleanup: () => eventSource.close(),
  }
}
