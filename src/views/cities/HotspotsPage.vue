<template>
  <CodeCityPageTemplate
    :tabs="tabs"
    :colorData="colorData"
    :leftPanelConfig="leftPanelConfig"
    :rightPanelConfig="rightPanelConfig"
  />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { CityNode } from '@/types/city'
  import { colorData } from '@/utils/city/cityData'
  import { useCityStore } from '@/stores/cityStore'
  import { MetricType } from '@/types'
  import CodeCityPageTemplate from '@/components/city/CodeCityPageTemplate.vue'

  const cityStore = useCityStore()
  const cityData = cityStore.cityData

  const rightPanelConfig = ref({
    metricTypes: ['name', 'path', 'height', 'width'] as MetricType[],
    showFindCoupling: false,
  })

  const tabs = [
    { id: 'hotspots', label: 'navbar.hotspots', route: '/hotspots' },
    { id: 'complexity-trends', label: 'navbar.complexity-trends', route: '/complexity-trends' },
    { id: 'code-age', label: 'navbar.code-age', route: '/code-age' },
  ]

  const flattenedFilesForList = computed(() => {
    const files: Array<CityNode & { intensity?: number }> = []

    function traverse(node: CityNode) {
      const colorInfo = colorData.find((c) => c.path === node.path)
      if (colorInfo) {
        files.push({
          ...node,
          intensity: colorInfo.intensity,
        })
      }
      if (node.children) {
        node.children.forEach(traverse)
      }
    }

    traverse(cityData)
    return files.sort((a, b) => b.intensity! - a.intensity!)
  })

  const itemsForLeftPanel = ref(flattenedFilesForList.value)

  const leftPanelConfig = computed(() => ({
    label: 'SUSPICIOUS FILES',
    items: itemsForLeftPanel.value,
    showInfo: true,
  }))

  function getIntensityColor(intensity: number): string {
    if (intensity >= 0.8) return '#ff4444'
    if (intensity >= 0.6) return '#ff8844'
    if (intensity >= 0.4) return '#ffaa44'
    if (intensity >= 0.2) return '#ffcc44'
    return '#ffee44'
  }
</script>

<style scoped lang="scss"></style>
