export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export interface ApiError {
  error: string
  message: string
  errorCode: number
}

export interface StructureNode {
  id: string
  name: string
  type: 'file' | 'directory'
  path: string
  children?: StructureNode[]
  metrics?: {
    loc?: number
    complexity?: number
    [key: string]: any
  }
}

export interface StructureData {
  analysisId: string
  rootNode: StructureNode
  timestamp: string
  version: string
}
