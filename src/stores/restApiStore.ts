import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type {
  CityNode,
  FileListResponse,
  FileDetailsResponse,
  HotspotsResponse,
  CodeAgeResponse,
  FileCouplingResponse,
} from '@/types'
import { useLogger } from '@/composables/useLogger'

const log = useLogger('apiStore')
const STORAGE_KEY = 'api-store'

interface ApiStoreState {
  structure: CityNode | null
  fileMap: Array<[string, { path: string; name: string }]> | null
  fileDetails: Record<string, FileDetailsResponse>
  hotspotsDetails: HotspotsResponse | null
  codeAgeDetails: CodeAgeResponse | null
  fileCouplingDetails: FileCouplingResponse | null
  loading: Record<string, boolean>
  errors: Record<string, string | null>
}

export const useRestApiStore = defineStore('api', () => {
  const structure = ref<CityNode | null>(null)
  const fileMap = ref<Map<string, { path: string; name: string }>>(new Map())
  const fileDetails = ref<Record<string, FileDetailsResponse>>({})
  const hotspotsDetails = ref<HotspotsResponse | null>(null)
  const codeAgeDetails = ref<CodeAgeResponse | null>(null)
  const fileCouplingDetails = ref<FileCouplingResponse | null>(null)
  const loading = ref<Record<string, boolean>>({})
  const errors = ref<Record<string, string | null>>({})

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: ApiStoreState = JSON.parse(stored)
        structure.value = data.structure || null
        fileMap.value = data.fileMap ? new Map(data.fileMap) : new Map()
        fileDetails.value = data.fileDetails || {}
        hotspotsDetails.value = data.hotspotsDetails || null
        codeAgeDetails.value = data.codeAgeDetails || null
        fileCouplingDetails.value = data.fileCouplingDetails || null
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
      const data: ApiStoreState = {
        structure: structure.value,
        fileMap: fileMap.value.size > 0 ? Array.from(fileMap.value.entries()) : null,
        fileDetails: fileDetails.value,
        hotspotsDetails: hotspotsDetails.value,
        codeAgeDetails: codeAgeDetails.value,
        fileCouplingDetails: fileCouplingDetails.value,
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
    [
      structure,
      fileMap,
      fileDetails,
      hotspotsDetails,
      codeAgeDetails,
      fileCouplingDetails,
      loading,
      errors,
    ],
    () => saveToStorage(),
    { deep: true }
  )

  function setStructure(data: CityNode) {
    structure.value = data
  }

  function setFileMap(data: FileListResponse) {
    fileMap.value = new Map(data.map((file) => [file.path, file]))
  }

  function getFileByPath(path: string): { path: string; name: string } | undefined {
    return fileMap.value.get(path)
  }

  function hasFile(path: string): boolean {
    return fileMap.value.has(path)
  }

  function getAllFiles(): Array<{ path: string; name: string }> {
    return Array.from(fileMap.value.values())
  }

  function setFileDetails(path: string, data: FileDetailsResponse) {
    fileDetails.value[path] = data
  }

  function setHotspotsDetails(data: HotspotsResponse) {
    hotspotsDetails.value = data
  }

  function setCodeAgeDetails(data: CodeAgeResponse) {
    codeAgeDetails.value = data
  }

  function setFileCouplingDetails(data: FileCouplingResponse) {
    fileCouplingDetails.value = data
  }

  function getHotspotsDetails(): HotspotsResponse | null {
    return hotspotsDetails.value
  }

  function getCodeAgeDetails(): CodeAgeResponse | null {
    return codeAgeDetails.value
  }

  function getFileCouplingDetails(): FileCouplingResponse | null {
    return fileCouplingDetails.value
  }

  function getFileDetails(path: string): FileDetailsResponse | undefined {
    return fileDetails.value[path]
  }

  function hasFileDetails(path: string): boolean {
    return path in fileDetails.value
  }

  function setLoading(key: string, value: boolean) {
    loading.value[key] = value
  }

  function setError(key: string, message: string | null) {
    errors.value[key] = message
    if (message) {
      log.error(`Error for ${key}: ${message}`)
    }
  }

  function clearAll() {
    structure.value = null
    fileMap.value = new Map()
    fileDetails.value = {}
    hotspotsDetails.value = null
    codeAgeDetails.value = null
    fileCouplingDetails.value = null
    loading.value = {}
    errors.value = {}
    localStorage.removeItem(STORAGE_KEY)
    log.info('All API data cleared')
  }

  loadFromStorage()

  return {
    // State
    structure,
    fileMap,
    fileDetails,
    hotspotsDetails,
    codeAgeDetails,
    fileCouplingDetails,
    loading,
    errors,

    // Setters
    setStructure,
    setFileMap,
    setFileDetails,
    setHotspotsDetails,
    setCodeAgeDetails,
    setFileCouplingDetails,

    // Getters
    getFileByPath,
    hasFile,
    getAllFiles,
    getHotspotsDetails,
    getCodeAgeDetails,
    getFileCouplingDetails,
    getFileDetails,
    hasFileDetails,

    // State management
    setLoading,
    setError,

    // Clear functions
    clearAll,
  }
})
