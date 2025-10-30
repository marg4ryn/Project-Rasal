<template>
  <section class="welcome-screen">
    <LoadingOverlay
      :show="isDownloading"
      :label="t('welcomePage.loading') + ' ' + progress + '%'"
    />

    <div class="welcome-content">
      <img src="/logo.png" alt="HotSpotter Logo" class="logo" />

      <h1 class="title">{{ t('welcomePage.header') }} <span class="appname1">Hot</span>Spotter!</h1>
      <h2 class="subtitle-heading">{{ t('welcomePage.motto') }}</h2>

      <div class="input-section">
        <label for="repo-link" class="input-label">{{ t('welcomePage.prompt') }}</label>
        <input
          id="repo-link"
          type="text"
          v-model="link"
          placeholder="e.g. https://github.com/johndoe/test.git"
          class="repo-input"
          @keyup.enter="handleDownload"
          :disabled="isDownloading"
        />
      </div>

      <AppButton
        :label="t('welcomePage.buttonAnalyze')"
        variant="primary"
        @click="handleDownload"
        :disabled="isDownloading"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  //import { useAnalysisStore } from '@/stores/analysisStore'
  import { useI18n } from 'vue-i18n'
  import AppButton from '@/components/common/AppButton.vue'
  import LoadingOverlay from '@/components/layout/LoadingOverlay.vue'
  import { downloadService } from '@/services/downloadService'

  const { t } = useI18n()
  const router = useRouter()
  //const analysisStore = useAnalysisStore()
  const link = ref('')
  const progress = ref(0)
  const status = ref('')
  const isDownloading = ref(false)
  const error = ref('')

  const handleDownload = async () => {
    if (!link.value.trim()) {
      alert(t('welcomePage.alertEnterRepo'))
      return
    }

    progress.value = 0
    status.value = ''
    error.value = ''
    isDownloading.value = true

    downloadService.startDownloadMock(
      link.value,
      // onProgress callback
      (data) => {
        progress.value = data.progress
        status.value = data.status
      },
      // onComplete callback
      (data) => {
        status.value = `Zakończono! Plik: ${data.filename}`
        isDownloading.value = false
        router.push('/time-range')
      },
      // onError callback
      (errorMsg) => {
        error.value = errorMsg
        isDownloading.value = false
      }
    )

    // downloadService.startDownload(
    //   link.value,
    //   (data) => {
    //     progress.value = data.progress;
    //     status.value = data.status;
    //   },
    //   (data) => {
    //     status.value = `Zakończono! Plik: ${data.filename}`;
    //     isDownloading.value = false;
    //   },
    //   (errorMsg) => {
    //     error.value = errorMsg;
    //     isDownloading.value = false;
    //   }
    // );

    // const handleCancel = () => {
    //   downloadService.abort()
    //   isDownloading.value = false
    //   status.value = 'Anulowano'
    // }
  }
</script>

<style scoped lang="scss">
  .welcome-screen {
    @include flex-center;
    position: relative;
    flex: 1 0 auto;
    width: 100%;
  }

  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 500px;
    width: 100%;
    height: 100%;
    gap: 1rem;
  }

  .logo {
    @include floating-logo;
    width: 200px;
    height: 200px;
  }

  .title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-semibold;
    color: var(--color-text-primary);
    margin: 0;
    line-height: $line-height-tight;

    .appname1 {
      color: var(--color-primary);
    }
  }

  .subtitle-heading {
    font-size: $font-size-xl;
    font-weight: $font-weight-normal;
    color: var(--color-text-tertiary);
    margin: 0;
    line-height: $line-height-normal;
  }

  .input-section {
    @include flex-column($spacing-md);
    width: 100%;
    margin-top: $spacing-lg;
  }

  .input-label {
    font-size: $font-size-base;
    color: var(--color-text-secondary);
    font-weight: $font-weight-medium;
  }

  .repo-input {
    @include input-base;
  }

  @include respond-to-sm {
    .title {
      font-size: $font-size-2xl;
    }

    .subtitle-heading {
      font-size: $font-size-base;
    }

    .repo-input {
      font-size: $font-size-sm;
      padding: $spacing-md $spacing-lg;
    }
  }
</style>
