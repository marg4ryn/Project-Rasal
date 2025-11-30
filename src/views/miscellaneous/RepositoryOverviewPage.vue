<template>
  <div style="width: 600px; height: 300px;">
    <CommitTimelineChart
      :data="commitData"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import CommitTimelineChart from '@/components/visuals/CommitTimelineChart.vue'

  // Przykładowe dane
  const commitData = ref([
    { date: '2024-07-01', commits: 65 },
    { date: '2024-07-08', commits: 145 },
    { date: '2024-07-15', commits: 210 },
    { date: '2024-07-22', commits: 190 },
    { date: '2024-07-29', commits: 250 },
    { date: '2024-08-05', commits: 180 },
    { date: '2024-08-12', commits: 120 },
    { date: '2024-08-19', commits: 135 },
    { date: '2024-08-26', commits: 145 },
    { date: '2024-09-02', commits: 125 },
    { date: '2024-09-09', commits: 110 },
    { date: '2024-09-16', commits: 220 },
    { date: '2024-09-23', commits: 185 },
    { date: '2024-09-30', commits: 175 },
    { date: '2024-10-07', commits: 165 },
    { date: '2024-10-14', commits: 190 },
    { date: '2024-10-21', commits: 210 },
    { date: '2024-10-28', commits: 155 },
  ])
</script>

<style scoped></style>
