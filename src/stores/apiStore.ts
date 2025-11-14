import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { CityNode } from '@/types'
import { useLogger } from '@/composables/useLogger'

const log = useLogger('apiStore')
const STORAGE_KEY = 'api-store'

export const useApiStore = defineStore('api', () => {
  const structure = ref<CityNode>({} as CityNode)
  const loading = ref<Record<string, boolean>>({})
  const errors = ref<Record<string, string | null>>({})

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        structure.value = data.structure || ({} as CityNode)
        loading.value = data.loading || {}
        errors.value = data.errors || {}
        log.info('Data loaded from localStorage')
      }
    } catch (error) {
      log.error('Failed to load from localStorage:', error)
    }
  }

  function saveToStorage() {
    try {
      const data = {
        structure: structure.value,
        loading: loading.value,
        errors: errors.value,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      log.info('Data saved to localStorage')
    } catch (error) {
      log.error('Failed to save to localStorage:', error)
    }
  }

  watch(
    [structure, loading, errors],
    () => {
      saveToStorage()
    },
    { deep: true }
  )

  function setStructure(data: CityNode) {
    structure.value = data
    log.info('Structure set successfully')
  }

  function setLoading(key: string, value: boolean) {
    loading.value[key] = value
    log.info(`Loading state for ${key}: ${value}`)
  }

  function setError(key: string, message: string | null) {
    errors.value[key] = message
    if (message) {
      log.error(`Error for ${key}: ${message}`)
    }
  }

  function clearAll() {
    structure.value = {} as CityNode
    loading.value = {}
    errors.value = {}
    localStorage.removeItem(STORAGE_KEY)
    log.info('All API data cleared')
  }

  loadFromStorage()

  return {
    structure,
    loading,
    errors,
    setStructure,
    setLoading,
    setError,
    clearAll,
  }
})
