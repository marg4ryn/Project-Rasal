import { ref, type Ref } from 'vue'
import * as THREE from 'three'

interface CodeCityState {
  hoveredObject: Ref<THREE.Mesh | null>
  selectedObject: Ref<THREE.Mesh | null>
  objectMap: Map<THREE.Mesh, any>
  clearSelection: () => void
}

const hoveredObject = ref<THREE.Mesh | null>(null)
const selectedObject = ref<THREE.Mesh | null>(null)
const objectMap = new Map<THREE.Mesh, any>()

export function useCodeCityState(): CodeCityState {
  function clearSelection() {
    hoveredObject.value = null
    selectedObject.value = null
    objectMap.clear()
  }

  return {
    hoveredObject,
    selectedObject,
    objectMap,
    clearSelection
  }
}