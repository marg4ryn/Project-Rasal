<template>
  <div class="hotspots-page">
    <!-- Search Bar -->
    <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="Search files..." class="search-input" />
      <button class="search-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" />
          <path
            d="M12.5 12.5L17 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <div class="content-wrapper">
      <!-- Left Panel - Files List -->
      <aside class="left-panel">
        <div class="panel-header">
          <h2>SUSPICIOUS FILES</h2>
          <button class="info-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
              <path
                d="M8 7V11M8 5V5.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div class="files-list">
          <div
            v-for="file in filteredFiles"
            :key="file.path"
            class="file-item"
            :class="{ active: selectedPath === file.path }"
            @click="handleFileSelect(file.path)"
          >
            <div class="file-info">
              <svg
                v-if="file.type === 'directory'"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="file-icon"
              >
                <path d="M2 3H7L8 5H14V13H2V3Z" />
              </svg>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="file-icon"
              >
                <path d="M3 1H9L13 5V15H3V1Z" />
                <path d="M9 1V5H13" stroke="currentColor" stroke-width="1.5" fill="none" />
              </svg>
              <span class="file-name">{{ file.name }}</span>
            </div>
            <span
              v-if="file.intensity !== undefined"
              class="file-suspicion"
              :style="{ color: getIntensityColor(file.intensity) }"
            >
              {{ Math.round(file.intensity * 100) }}%
            </span>
          </div>
        </div>
      </aside>

      <!-- Center - Code City -->
      <div class="project-view">
        <CodeCity :data="cityData" :colorData="colorData" @buildingClick="handleBuildingClick" />
      </div>

      <!-- Right Panel - Details -->
      <aside class="right-panel">
        <div class="panel-header">
          <button
            v-if="selectedPath && selectedPath !== '/'"
            class="back-button"
            @click="navigateUp"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 4L6 10L12 16"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="file-icon">
            <svg
              v-if="selectedItem?.type === 'directory'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3H9L11 6H18V17H2V3Z" />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 2H12L16 6V18H4V2Z" />
              <path d="M12 2V6H16" stroke="currentColor" stroke-width="1.5" fill="none" />
            </svg>
          </div>
          <span class="file-title">{{ selectedItem?.name || 'Select a file' }}</span>
        </div>

        <!-- File Details -->
        <div v-if="selectedItem && selectedItem.type === 'file'" class="file-details">
          <h3>FILE METRICS</h3>

          <div class="metric-item">
            <span class="metric-label">Path:</span>
            <span class="metric-value path-value">{{ selectedItem.path }}</span>
          </div>

          <div v-if="selectedItem.height !== undefined" class="metric-item">
            <span class="metric-label">Height:</span>
            <span class="metric-value">{{ selectedItem.height.toFixed(2) }}</span>
          </div>

          <div v-if="selectedItem.width !== undefined" class="metric-item">
            <span class="metric-label">Width:</span>
            <span class="metric-value">{{ selectedItem.width.toFixed(2) }}</span>
          </div>

          <div v-if="selectedColorData" class="metric-item">
            <span class="metric-label">Intensity:</span>
            <span
              class="metric-value suspicion-value"
              :style="{ color: getIntensityColor(selectedColorData.intensity) }"
            >
              {{ Math.round(selectedColorData.intensity * 100) }}%
            </span>
          </div>

          <div v-if="selectedColorData" class="metric-item">
            <span class="metric-label">Color:</span>
            <span class="metric-value">
              <span
                class="color-box"
                :style="{
                  backgroundColor: `#${selectedColorData.color.toString(16).padStart(6, '0')}`,
                }"
              ></span>
              #{{ selectedColorData.color.toString(16).padStart(6, '0').toUpperCase() }}
            </span>
          </div>

          <!-- <div class="action-buttons">
            <button class="btn btn-primary">X-Ray</button>
            <button class="btn btn-secondary">
              Source Code
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div> -->
        </div>

        <!-- Directory Children -->
        <div
          v-else-if="selectedItem && selectedItem.type === 'directory' && selectedItem.children"
          class="directory-children"
        >
          <h3>DIRECTORY CONTENTS</h3>

          <div class="children-list">
            <div
              v-for="child in selectedItem.children"
              :key="child.path"
              class="child-item"
              @click="handleFileSelect(child.path)"
            >
              <svg
                v-if="child.type === 'directory'"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="child-icon"
              >
                <path d="M2 3H7L8 5H14V13H2V3Z" />
              </svg>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="child-icon"
              >
                <path d="M3 1H9L13 5V15H3V1Z" />
                <path d="M9 1V5H13" stroke="currentColor" stroke-width="1.5" fill="none" />
              </svg>
              <span class="child-name">{{ child.name }}</span>
              <span v-if="child.type === 'directory'" class="child-type"
                >{{ getChildrenCount(child) }} items</span
              >
            </div>
          </div>
        </div>

        <!-- No Selection -->
        <div v-else class="no-selection">
          <p>Select a file or directory to view details</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useCodeCityController } from '@/composables/useCodeCityController'
  import { useLogger } from '@/composables/useLogger'
  import { cityData, colorData } from '@/utils/city/cityData'
  import CodeCity from '@/components/visuals/CodeCity.vue'

  interface ColorDataItem {
    path: string
    color: number
    intensity: number
  }

  interface CityDataNode {
    name: string
    type: 'file' | 'directory'
    path: string
    height?: number
    width?: number
    children?: CityDataNode[]
  }

  const log = useLogger('HotspotsPage')
  const { selectBuilding } = useCodeCityController()

  const searchQuery = ref('')
  const selectedPath = ref<string>('/')

  // Flatten city data for file list
  const flattenedFiles = computed(() => {
    const files: Array<CityDataNode & { intensity?: number }> = []

    function traverse(node: CityDataNode) {
      const colorInfo = colorData.find((c) => c.path === node.path)

      files.push({
        ...node,
        intensity: colorInfo?.intensity,
      })

      if (node.children) {
        node.children.forEach(traverse)
      }
    }

    traverse(cityData)

    const withIntensity = files.filter((f) => f.intensity !== undefined)

    return withIntensity.sort((a, b) => b.intensity! - a.intensity!)
  })

  const filteredFiles = computed(() => {
    if (!searchQuery.value) return flattenedFiles.value
    const query = searchQuery.value.toLowerCase()
    return flattenedFiles.value.filter(
      (file) => file.name.toLowerCase().includes(query) || file.path.toLowerCase().includes(query)
    )
  })

  const selectedItem = computed(() => {
    return flattenedFiles.value.find((f) => f.path === selectedPath.value)
  })

  const selectedColorData = computed(() => {
    return colorData.find((c) => c.path === selectedPath.value)
  })

  function handleBuildingClick(name: string, path: string, intensity?: number) {
    log.info('Clicked on:', name, ' Path:', path, ' Intensity: ', intensity)
    selectedPath.value = path
    selectBuilding(path)
  }

  function handleFileSelect(path: string) {
    selectedPath.value = path
    selectBuilding(path)
  }

  function navigateUp() {
    const parentPath = selectedPath.value.split('/').slice(0, -1).join('/') || '/'
    selectedPath.value = parentPath
    selectBuilding(parentPath)
  }

  function getChildrenCount(node: CityDataNode): number {
    return node.children?.length || 0
  }

  function getIntensityColor(intensity: number): string {
    if (intensity >= 0.8) return '#ff4444'
    if (intensity >= 0.6) return '#ff8844'
    if (intensity >= 0.4) return '#ffaa44'
    if (intensity >= 0.2) return '#ffcc44'
    return '#ffee44'
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'c' || e.key === 'C') {
      selectBuilding('/src/main/java/com/company/service/UserService.java')
      selectedPath.value = '/src/main/java/com/company/service/UserService.java'
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
</script>

<style scoped lang="scss">
  .hotspots-page {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0 1.5rem;
    gap: 0.5rem;

    .search-input {
      width: 400px;
      padding: 0.75rem 1.25rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      color: #e6e6e6;
      font-size: 0.95rem;
      transition: all 0.3s ease;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      &:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
      }
    }

    .search-button {
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      color: #e6e6e6;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .content-wrapper {
    display: flex;
    flex: 1;
    gap: 1.5rem;
    padding: 0 1.5rem 1.5rem;
    overflow: hidden;
  }

  .left-panel,
  .right-panel {
    background: var(--color-bg-secondary);
    backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 1.5rem;
    width: 320px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);

    h2 {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--color-text-tertiary);
      margin: 0;
      flex: 1;
    }

    .info-button,
    .back-button {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      padding: 0.25rem;
      display: flex;
      transition: color 0.3s ease;

      &:hover {
        color: rgba(255, 255, 255, 0.9);
      }
    }

    .file-icon {
      color: rgba(255, 255, 255, 0.7);
      display: flex;
    }

    .file-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #e6e6e6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
  }

  .files-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    flex: 1;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-primary);
      border-radius: 3px;

      &:hover {
        background: (var(--color-primary-light));
        cursor: pointer;
      }
    }
  }

  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    gap: 0.75rem;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--color-border);
    }

    &.active {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--color-border);
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
      min-width: 0;

      .file-icon {
        color: rgba(255, 255, 255, 0.6);
        flex-shrink: 0;
      }

      .file-name {
        font-size: 0.85rem;
        color: #e6e6e6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .file-suspicion {
      font-size: 0.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }
  }

  .project-view {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    width: 60vw;
    height: 80vh;
  }

  .file-details,
  .directory-children {
    h3 {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 1.5rem 0;
    }
  }

  .metric-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    .metric-label {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .metric-value {
      font-size: 0.9rem;
      font-weight: 600;
      color: #e6e6e6;
      word-break: break-all;

      &.path-value {
        font-size: 0.75rem;
        font-family: 'Monaco', 'Courier New', monospace;
        color: rgba(255, 255, 255, 0.8);
      }

      &.suspicion-value {
        font-weight: 700;
        font-size: 1.1rem;
      }

      .color-box {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        vertical-align: middle;
        margin-right: 0.5rem;
      }
    }
  }

  .children-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    max-height: 400px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }
  }

  .child-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .child-icon {
      color: rgba(255, 255, 255, 0.6);
      flex-shrink: 0;
    }

    .child-name {
      font-size: 0.85rem;
      color: #e6e6e6;
      flex: 1;
    }

    .child-type {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  .btn {
    padding: 0.875rem 1.25rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &.btn-primary {
      background: #4ade80;
      color: #0a192f;

      &:hover {
        background: #5eea8f;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
      }
    }

    &.btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: #e6e6e6;
      border: 1px solid rgba(255, 255, 255, 0.1);

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.2);
      }
    }
  }

  .no-selection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.9rem;
    text-align: center;
  }
</style>
