<template>
  <CodeCityPageTemplate
    v-if="!isLoading"
    :tabs="tabs"
    :colorData="hotspotsColorData"
    :leftPanelConfig="leftPanelConfig"
    :rightPanelConfig="rightPanelConfig"
  />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRestApi } from '@/composables/useRestApi'
  import { MetricType } from '@/types'
  import type { HotspotsDetails } from '@/types'
  import CodeCityPageTemplate from '@/components/city/CodeCityPageTemplate.vue'

  const { hotspotsDetails, fileMap } = useRestApi()

  const detailsRef = hotspotsDetails()
  const fileMapRef = fileMap()
  const isLoading = ref(false)

  const rightPanelConfig = ref({
    metricTypes: [
      'name',
      'path',
      'height',
      'width',
      'fileSize',
      'fileType',
      'totalLines',
      'codeLines',
      'commentLines',
      'blankLines',
      'totalCommits',
      'firstCommitDate',
      'lastCommitDate',
      'commitsLastMonth',
      'commitsLastYear',
      'activeAuthors',
      'leadAuthor',
      'knowledgeRisk',
      'knowledgeLoss',
    ] as MetricType[],
    showFindCoupling: false,
  })

  const tabs = [
    { id: 'hotspots', label: 'navbar.hotspots', route: '/hotspots' },
    { id: 'complexity-trends', label: 'navbar.complexity-trends', route: '/complexity-trends' },
    { id: 'code-age', label: 'navbar.code-age', route: '/code-age' },
    { id: 'change-coupling', label: 'navbar.change-coupling', route: '/change-coupling' },
  ]

  const hotspotsColorData = computed(() => {
    const data = detailsRef.value

    if (!data || !Array.isArray(data)) {
      return []
    }

    return data.map((item: HotspotsDetails) => ({
      path: item.path,
      color: 0xbf1b1b,
      intensity: item.normalizedValue,
    }))
  })

  const hotspotsItems = computed(() => {
    const data = detailsRef.value
    const fileMap = fileMapRef.value

    if (!data || !Array.isArray(data) || !fileMap) {
      return []
    }

    return data.map((item: HotspotsDetails) => {
      const file = fileMap.get(item.path)
      return {
        path: item.path,
        name: file?.name || item.path,
        normalizedValue: item.normalizedValue,
        displayValue: Math.round(item.normalizedValue * 100),
      }
    })
  })

  const leftPanelConfig = computed(() => ({
    label: 'SUSPICIOUS FILES',
    items: hotspotsItems.value,
    sortBy: 'normalizedValue',
    sortOrder: 'desc' as 'asc' | 'desc',
    showInfo: true,
  }))
</script>

<style scoped lang="scss"></style>
