import type { CityNode } from '@/types/city'

/**
 * Locates a node in the CityNode partition along a path.
 */
export function findNodeByPath(path: string, root: CityNode): CityNode | null {
  if (root.path === path) return root

  if (root.children) {
    for (const child of root.children) {
      const found = findNodeByPath(path, child)
      if (found) return found
    }
  }

  return null
}

/**
 * Returns the number of children of a given node.
 */
export function getChildrenCount(node: CityNode): number {
  return node.children?.length || 0
}
