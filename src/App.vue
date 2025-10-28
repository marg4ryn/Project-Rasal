<template>
  <div class="app">
    <MeshGradient :color1="colorSecondary" :color2="colorPrimary" class="background-gradient" />
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
  import { ref, computed, watch, onBeforeMount } from 'vue'
  import { useUserSettingsStore } from './stores/userSettingsStore'
  import { useI18n } from 'vue-i18n'

  import AppBar from '@/components/layout/AppBar.vue'
  import NavBar from '@/components/layout/NavBar.vue'
  import AppFooter from '@/components/layout/AppFooter.vue'
  import MeshGradient from '@/components/layout/MeshGradient.vue'

  const { locale } = useI18n()

  const uiStore = useUIStore()
  const isNavBarVisible = computed(() => uiStore.isNavBarVisible)
  const userSettings = useUserSettingsStore()
  const colorPrimary = ref(userSettings.selectedColor)
  let colorSecondary = ''

  const contentMinHeight = computed(() => {
    const appBarHeight = 80
    const footerHeight = 30
    const navBarHeight = isNavBarVisible.value ? 50 : 0
    return `calc(100vh - ${appBarHeight + navBarHeight + footerHeight}px)`
  })

  onBeforeMount(() => {
    applyMainColor(userSettings.selectedColor as string)
    applyTheme(userSettings.selectedTheme as 'light' | 'dark' | 'system')
    applyLanguage(userSettings.selectedLanguage as 'pl' | 'en' | 'system')
  })

  function applyMainColor(color: string) {
    colorPrimary.value = color
    document.documentElement.style.setProperty('--color-primary', color)
  }

  function applyTheme(theme: 'light' | 'dark' | 'system') {
    let resolvedTheme = theme

    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    document.documentElement.setAttribute('data-theme', resolvedTheme)

    colorSecondary = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-bg-secondary')
      .trim()
  }

  function applyLanguage(language: 'pl' | 'en' | 'system') {
    let resolvedLang = language

    if (language === 'system') {
      const browserLang = navigator.language.startsWith('pl') ? 'pl' : 'en'
      resolvedLang = browserLang
    }

    locale.value = resolvedLang
    document.documentElement.setAttribute('lang', resolvedLang)
  }

  watch(
    () => userSettings.selectedColor,
    (newColor) => {
      applyMainColor(newColor as string)
    }
  )

  watch(
    () => userSettings.selectedTheme,
    (newTheme) => {
      applyTheme(newTheme as 'light' | 'dark' | 'system')
    }
  )

  watch(
    () => userSettings.selectedLanguage,
    (newLanguage) => {
      applyLanguage(newLanguage as 'pl' | 'en' | 'system')
    }
  )
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
