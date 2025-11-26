<template>
  <LoadingBar :show="isGeneralLoading" :label="'common.loading'" :show-cancel-button="false" />
  <CodeCityPageTemplate
    ref="codeCityRef"
    :tabs="tabs"
    :colorData="colorData"
    :leftPanelConfig="leftPanelConfig"
    :secondLeftPanelConfig="secondLeftPanelConfig"
    :rightPanelConfig="rightPanelConfig"
  >
    <template #leftPanelItem="{ item }">
      <span class="item-name">{{ item.name }}</span>
    </template>

    <template #secondLeftPanelItem="{ item }">
      <span class="item-name">{{ item.name }}</span>
      <span class="item-value"> {{ item.displayValue }}</span>
    </template>
  </CodeCityPageTemplate>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRestApi } from '@/composables/useRestApi'
  import { MetricType, AuthorContribution } from '@/types'
  import type { KnowledgeLossDetails } from '@/types'
  import CodeCityPageTemplate from '@/components/city/CodeCityPageTemplate.vue'
  import LoadingBar from '@/components/sections/LoadingBar.vue'

  const { knowledgeLossDetails, fileMap, fileDetails, isGeneralLoading } = useRestApi()

  const detailsRef = knowledgeLossDetails()
  const fileMapRef = fileMap()
  const codeCityRef = ref<InstanceType<typeof CodeCityPageTemplate>>()

  const rightPanelConfig = ref({
    metricTypes: [
      'name',
      'path',
      'fileType',
      'fileSize',
      'totalLines',
      'codeLines',
      'blankLines',
      'commentLines',
      'totalLinesAdded',
      'duplicatedLinesDensity',
      'totalCommits',
      'commitsLastMonth',
      'commitsLastYear',
      'firstCommitDate',
      'lastCommitDate',
      'activeAuthors',
      'leadAuthor',
      'knowledgeRisk',
      'knowledgeLoss',
      'bugs',
      'vulnerabilities',
      'codeSmells',
      'complexity',
    ] as MetricType[],
  })

  const tabs = [
    { id: 'developer-view', label: 'navbar.developer-view', route: '/developer-view' },
    { id: 'team-view', label: 'navbar.team-view', route: '/team-view' },
    { id: 'abandoned-code', label: 'navbar.abandoned-code', route: '/abandoned-code' },
    {
      id: 'responsibility-diffusion',
      label: 'navbar.responsibility-diffusion',
      route: '/responsibility-diffusion',
    },
    {
      id: 'developer-relationships',
      label: 'navbar.developer-relationships',
      route: '/developer-relationships',
    },
  ]

  const colorData = computed(() => {
    const data = detailsRef.value

    if (!data || !Array.isArray(data)) {
      return []
    }

    return data.map((item: KnowledgeLossDetails) => ({
      path: item.path,
      color: item.knowledgeRisk === 'DIFFUSED' ? 0xbf1b1b : 0xf0f0f0,
      intensity: item.normalizedValue ?? 1,
    }))
  })

  const leftPanelConfig = computed(() => {
    const items = computed(() => {
      const data = detailsRef.value
      const fileMap = fileMapRef.value

      if (!data || !Array.isArray(data) || !fileMap) {
        return []
      }

      return data
        .map((item: KnowledgeLossDetails) => {
          const file = fileMap.get(item.path)
          return {
            path: item.path,
            name: file?.name || item.path,
            knowledgeRisk: item.knowledgeRisk,
          }
        })
        .filter((item) => item.knowledgeRisk === 'DIFFUSED')
        .sort((a, b) => a.name.localeCompare(b.name))
    })

    return {
      labelKey: 'leftPanel.responsibility-diffusion.header1',
      infoKey: 'leftPanel.responsibility-diffusion.info1',
      items: items.value,
    }
  })

  const secondLeftPanelConfig = computed(() => {
    const selected = codeCityRef.value?.selectedPath

    if (!selected) {
      return {
        itemType: 'author' as const,
        labelKey: 'leftPanel.responsibility-diffusion.header2',
        infoKey: 'leftPanel.responsibility-diffusion.info2',
        items: [],
      }
    }

    const details = fileDetails(selected).value

    if (!details?.knowledge?.contributions) {
      return {
        itemType: 'author' as const,
        labelKey: 'leftPanel.responsibility-diffusion.header2',
        infoKey: 'leftPanel.responsibility-diffusion.info2',
        items: [],
      }
    }

    const items = details.knowledge.contributions
      .map((author: AuthorContribution) => ({
        path: author.name,
        name: author.name,
        displayValue: `${author.percentage.toFixed(1)}%`,
      }))
      .sort((a, b) => parseFloat(b.displayValue) - parseFloat(a.displayValue))

    return {
      itemType: 'author' as const,
      labelKey: 'leftPanel.responsibility-diffusion.header2',
      infoKey: 'leftPanel.responsibility-diffusion.info2',
      items,
    }
  })
</script>

<style scoped lang="scss">
  .item-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-value {
    font-weight: 600;
    font-size: 0.9rem;
  }
</style>
