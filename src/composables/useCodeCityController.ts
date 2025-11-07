import { ref } from 'vue'
import { useLogger } from '@/composables/useLogger'

const log = useLogger('useCodeCityController')

type SelectBuildingCallback = (path: string) => boolean

const selectBuildingCallback = ref<SelectBuildingCallback | null>(null)

export function useCodeCityController() {
  function registerSelectBuilding(callback: SelectBuildingCallback) {
    selectBuildingCallback.value = callback
  }

  function unregisterSelectBuilding() {
    selectBuildingCallback.value = null
  }

  function selectBuilding(path: string): boolean {
    if (!selectBuildingCallback.value) {
      log.warn('City component not mounted')
      return false
    }
    return selectBuildingCallback.value(path)
  }

  return {
    registerSelectBuilding,
    unregisterSelectBuilding,
    selectBuilding,
  }
}
