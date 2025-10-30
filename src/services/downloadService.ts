export interface ProgressData {
  progress: number
  status: string
}

export type ProgressCallback = (data: ProgressData) => void
export type CompleteCallback = (data: any) => void
export type ErrorCallback = (error: string) => void

class DownloadService {
  private eventSource: EventSource | null = null
  private mockInterval: ReturnType<typeof setInterval> | null = null

  startDownload(
    url: string,
    onProgress: ProgressCallback,
    onComplete: CompleteCallback,
    onError: ErrorCallback
  ): void {
    this.cleanup()

    try {
      const encodedUrl = encodeURIComponent(url)
      const sseUrl = `/api/download?url=${encodedUrl}`

      this.eventSource = new EventSource(sseUrl)

      this.eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        onProgress(data)
      }

      this.eventSource.addEventListener('progress', (event) => {
        const data = JSON.parse(event.data)
        onProgress(data)
      })

      this.eventSource.addEventListener('complete', (event) => {
        const data = JSON.parse(event.data)
        onComplete(data)
        this.cleanup()
      })

      this.eventSource.addEventListener('error-event', (event) => {
        const data = JSON.parse(event.data)
        onError(data.message)
        this.cleanup()
      })

      this.eventSource.onerror = () => {
        onError('Połączenie z serwerem zostało przerwane')
        this.cleanup()
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Nieznany błąd')
    }
  }

  startDownloadMock(
    url: string,
    onProgress: ProgressCallback,
    onComplete: CompleteCallback,
    onError: ErrorCallback
  ): void {
    this.cleanup()

    let currentProgress = 0

    onProgress({
      progress: 0,
      status: 'Rozpoczynanie pobierania...',
    })

    this.mockInterval = setInterval(() => {
      currentProgress += 10

      if (currentProgress <= 100) {
        onProgress({
          progress: currentProgress,
          status: `Pobieranie w toku... ${currentProgress}%`,
        })
      }

      if (currentProgress >= 100) {
        this.cleanup()
        onComplete({
          message: 'Pobieranie zakończone pomyślnie',
        })
      }
    }, 1000)
  }

  abort(): void {
    this.cleanup()
  }

  private cleanup(): void {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }

    if (this.mockInterval) {
      clearInterval(this.mockInterval)
      this.mockInterval = null
    }
  }
}

export const downloadService = new DownloadService()
