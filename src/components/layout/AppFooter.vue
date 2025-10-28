<template>
  <footer class="footer">
    <div class="footer-left">2025 HotSpotter</div>

    <div class="footer-right">
      <RouterLink to="/about" class="footer-btn" :aria-label="t('footer.aria.about')">
        {{ t('footer.about') }}
      </RouterLink>

      <RouterLink to="/attributions" class="footer-btn" :aria-label="t('footer.aria.attributions')">
        {{ t('footer.attributions') }}
      </RouterLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { RouterLink } from 'vue-router'

  const { t } = useI18n()
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    min-width: 1100px;
    padding: 10px 20px;
    background-color: var(--color-bg-secondary);
    color: var(--color-on-bg-secondary);
    font-size: 14px;
    font-weight: 300;

    .footer-right {
      display: flex;
      gap: 15px;
    }

    .footer-btn {
      color: var(--color-on-bg-secondary);
      text-decoration: none;
      transition:
        color 0.25s ease,
        transform 0.2s ease;

      &:hover {
        color: var(--color-primary);
        transform: scale(1.1);
      }

      &.router-link-active {
        color: var(--color-primary);
        font-weight: 400;
      }
    }
  }
</style>
