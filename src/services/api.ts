import type { ApiError, CityNode } from '@/types'
import { useLogger } from '@/composables/useLogger'

const log = useLogger('api')
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const API_TIMEOUT = 30000

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  log.info(`Request: ${options.method || 'GET'} ${endpoint}`)

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: 'api.errors.unknown',
        message: `api.errors.httpError`,
        errorCode: response.status,
      }))
      log.error(`Request failed: ${response.status}`, errorData)
      throw errorData
    }

    log.info(`Request successful: ${endpoint}`)
    return await response.json()
  } catch (err) {
    clearTimeout(timeoutId)

    if (err instanceof Error && err.name === 'AbortError') {
      log.error('Request timeout', endpoint)
      throw {
        error: 'api.errors.timeout',
        message: 'api.errors.requestTimeout',
        errorCode: 408,
      } as ApiError
    }

    log.error('Request error:', err)
    throw err
  }
}

export const api = {
  async fetchStructure(analysisId: string): Promise<CityNode> {
    log.info(`Fetching structure for analysis: ${analysisId}`)
    return request<CityNode>(`analysis/${analysisId}/structure`)
  },

  async get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'GET' })
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}
