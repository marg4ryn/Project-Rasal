<template>
  <div class="content-wrapper">
    <img src="/vite.svg" alt="Logo" class="logo" />
    <h1 class="motto">Welcome to HotSpotter!</h1>
    <h1 class="motto">Your repository, Your code city.</h1>
    <p class="subtitle">Enter link to analysis target:</p>
    <input
      type="text"
      v-model="link"
      placeholder="e.g. https://github.com/marg4ryn/test.git"
      class="link-input"
    />
    <button @click="startAction" :disabled="!link" class="start-button">Start</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'App',
    setup() {
      const link = ref<string>('')

      const startAction = () => {
        if (link.value) {
          alert(`Rozpoczynam działanie dla linku: ${link.value}`)
        }
      }

      return {
        link,
        startAction,
      }
    },
  })
</script>

<style lang="scss">
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 10px;
    max-width: 500px;
    width: 100%;
    height: 100%;
  }

  .logo {
    width: 80px;
    margin-bottom: 15px;
  }

  .motto {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--color-on-bg-secondary);
  }

  .subtitle {
    font-size: 1rem;
    color: var(--color-on-bg-secondary);
    margin-top: 20px;
    margin-bottom: 5px;
  }

  .link-input {
    padding: 5px;
    border: 2px solid var(--color-button-secondary);
    background-color: var(--color-bg-primary);
    border-radius: 10px;
    font-size: 1rem;
    width: 350px;
    box-sizing: border-box;
    margin-bottom: 15px;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.2);
    }
  }

  .start-button {
    margin: 5px;
    padding: 8px;
    background-color: var(--color-button-primary);
    border: 1px solid var(--color-button-secondary);
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 1.1rem;
    font-weight: 500;
    width: 150px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--color-button-primary-hover);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
</style>
