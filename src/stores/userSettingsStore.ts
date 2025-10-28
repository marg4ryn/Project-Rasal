import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserSettingsStore = defineStore('userSettings', () => {
  const selectedColor = ref('#28abf2')
  const selectedTheme = ref('dark')
  const selectedLanguage = ref('en')

  return { selectedColor, selectedTheme, selectedLanguage }
})
