<template>
  <div class="app">
    <MeshGradient
      :primary-color="userSettings.colorPrimary"
      :secondary-color="userSettings.colorSecondary"
      class="background-gradient"
    />
    <AppBar />
    <NavBar v-if="isNavBarVisible" />
    <div class="content" :style="{ minHeight: contentMinHeight }">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  import { useUIStore } from '@/stores/uiStore'
  import { RouterView } from 'vue-router'
  import { computed } from 'vue'
  import { useUserSettingsStore } from './stores/userSettingsStore'

  import AppBar from '@/components/layout/AppBar.vue'
  import NavBar from '@/components/layout/NavBar.vue'
  import AppFooter from '@/components/layout/AppFooter.vue'
  import MeshGradient from '@/components/layout/MeshGradient.vue'

  const uiStore = useUIStore()
  const userSettings = useUserSettingsStore()
  const isNavBarVisible = computed(() => uiStore.isNavBarVisible)

  const contentMinHeight = computed(() => {
    const appBarHeight = 80
    const footerHeight = 30
    const navBarHeight = isNavBarVisible.value ? 50 : 0
    return `calc(100vh - ${appBarHeight + navBarHeight + footerHeight}px)`
  })
</script>

<style lang="scss" scoped>
  .app {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .background-gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  .content {
    @include flex-center;
    flex: 1 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
