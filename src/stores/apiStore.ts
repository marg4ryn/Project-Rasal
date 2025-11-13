import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CityNode } from '@/types'
import { useLogger } from '@/composables/useLogger'

const log = useLogger('apiStore')

export const useApiStore = defineStore('api', () => {
  const structure = ref<CityNode>({} as CityNode)
  const loading = ref<Record<string, boolean>>({})
  const errors = ref<Record<string, string | null>>({})

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
    log.info('All API data cleared')
  }

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
