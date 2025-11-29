<template>
  <div style="width: 100%; height: 600px;">
    <ChordDiagram
      :data="sampleData"
      @authorHover="handleAuthorHover"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ChordDiagram from '@/components/visuals/ChordDiagram.vue'
  import { useLogger } from '@/composables/useLogger'

  const log = useLogger('DeveloperRelationshipsPage')

  // Przykładowe dane do testowania
  const sampleData = ref([
    {
      name: 'Alice',
      coupledAuthors: [
        { name: 'Bob', sharedChanges: 85 },
        { name: 'Charlie', sharedChanges: 54 },
        { name: 'David', sharedChanges: 32 },
        { name: 'Grace', sharedChanges: 42 }
      ]
    },
    {
      name: 'Bob',
      coupledAuthors: [
        { name: 'Alice', sharedChanges: 85 },
        { name: 'Eve', sharedChanges: 68 },
        { name: 'Charlie', sharedChanges: 41 },
        { name: 'Helen', sharedChanges: 28 }
      ]
    },
    {
      name: 'Charlie',
      coupledAuthors: [
        { name: 'Alice', sharedChanges: 54 },
        { name: 'Bob', sharedChanges: 41 },
        { name: 'David', sharedChanges: 102 },
        { name: 'Eve', sharedChanges: 61 },
        { name: 'Ivan', sharedChanges: 48 }
      ]
    },
    {
      name: 'David',
      coupledAuthors: [
        { name: 'Alice', sharedChanges: 32 },
        { name: 'Charlie', sharedChanges: 102 },
        { name: 'Frank', sharedChanges: 28 },
        { name: 'Jack', sharedChanges: 19 }
      ]
    },
    {
      name: 'Eve',
      coupledAuthors: [
        { name: 'Bob', sharedChanges: 68 },
        { name: 'Charlie', sharedChanges: 61 },
        { name: 'Frank', sharedChanges: 48 },
        { name: 'Kate', sharedChanges: 34 }
      ]
    },
    {
      name: 'Frank',
      coupledAuthors: [
        { name: 'David', sharedChanges: 28 },
        { name: 'Eve', sharedChanges: 48 },
        { name: 'Leo', sharedChanges: 31 }
      ]
    },
    {
      name: 'Grace',
      coupledAuthors: [
        { name: 'Alice', sharedChanges: 42 },
        { name: 'Helen', sharedChanges: 55 },
        { name: 'Mike', sharedChanges: 29 },
        { name: 'Nina', sharedChanges: 36 }
      ]
    },
    {
      name: 'Helen',
      coupledAuthors: [
        { name: 'Bob', sharedChanges: 28 },
        { name: 'Grace', sharedChanges: 55 },
        { name: 'Oscar', sharedChanges: 72 },
        { name: 'Paul', sharedChanges: 41 }
      ]
    },
    {
      name: 'Ivan',
      coupledAuthors: [
        { name: 'Charlie', sharedChanges: 48 },
        { name: 'Jack', sharedChanges: 33 },
        { name: 'Quinn', sharedChanges: 25 }
      ]
    },
    {
      name: 'Jack',
      coupledAuthors: [
        { name: 'David', sharedChanges: 19 },
        { name: 'Ivan', sharedChanges: 33 },
        { name: 'Kate', sharedChanges: 49 },
        { name: 'Rachel', sharedChanges: 38 }
      ]
    },
    {
      name: 'Kate',
      coupledAuthors: [
        { name: 'Eve', sharedChanges: 34 },
        { name: 'Jack', sharedChanges: 49 },
        { name: 'Leo', sharedChanges: 58 },
        { name: 'Sam', sharedChanges: 27 }
      ]
    },
    {
      name: 'Leo',
      coupledAuthors: [
        { name: 'Frank', sharedChanges: 31 },
        { name: 'Kate', sharedChanges: 58 },
        { name: 'Mike', sharedChanges: 64 },
        { name: 'Tina', sharedChanges: 43 }
      ]
    },
    {
      name: 'Mike',
      coupledAuthors: [
        { name: 'Grace', sharedChanges: 29 },
        { name: 'Leo', sharedChanges: 64 },
        { name: 'Nina', sharedChanges: 51 },
        { name: 'Uma', sharedChanges: 22 }
      ]
    },
    {
      name: 'Nina',
      coupledAuthors: [
        { name: 'Grace', sharedChanges: 36 },
        { name: 'Mike', sharedChanges: 51 },
        { name: 'Oscar', sharedChanges: 44 },
        { name: 'Victor', sharedChanges: 28 }
      ]
    },
    {
      name: 'Oscar',
      coupledAuthors: [
        { name: 'Helen', sharedChanges: 72 },
        { name: 'Nina', sharedChanges: 44 },
        { name: 'Paul', sharedChanges: 59 },
        { name: 'Wendy', sharedChanges: 37 }
      ]
    },
    {
      name: 'Paul',
      coupledAuthors: [
        { name: 'Helen', sharedChanges: 41 },
        { name: 'Oscar', sharedChanges: 59 },
        { name: 'Quinn', sharedChanges: 26 },
        { name: 'Xander', sharedChanges: 18 }
      ]
    },
    {
      name: 'Quinn',
      coupledAuthors: [
        { name: 'Ivan', sharedChanges: 25 },
        { name: 'Paul', sharedChanges: 26 },
        { name: 'Rachel', sharedChanges: 34 },
        { name: 'Yara', sharedChanges: 19 }
      ]
    },
    {
      name: 'Rachel',
      coupledAuthors: [
        { name: 'Jack', sharedChanges: 38 },
        { name: 'Quinn', sharedChanges: 34 },
        { name: 'Sam', sharedChanges: 52 },
        { name: 'Zack', sharedChanges: 27 }
      ]
    },
    {
      name: 'Sam',
      coupledAuthors: [
        { name: 'Kate', sharedChanges: 27 },
        { name: 'Rachel', sharedChanges: 52 },
        { name: 'Tina', sharedChanges: 66 },
        { name: 'Uma', sharedChanges: 35 }
      ]
    },
    {
      name: 'Tina',
      coupledAuthors: [
        { name: 'Leo', sharedChanges: 43 },
        { name: 'Sam', sharedChanges: 66 },
        { name: 'Victor', sharedChanges: 57 },
        { name: 'Wendy', sharedChanges: 36 }
      ]
    },
    {
      name: 'Uma',
      coupledAuthors: [
        { name: 'Mike', sharedChanges: 22 },
        { name: 'Sam', sharedChanges: 35 },
        { name: 'Victor', sharedChanges: 41 },
        { name: 'Xander', sharedChanges: 25 }
      ]
    },
    {
      name: 'Victor',
      coupledAuthors: [
        { name: 'Nina', sharedChanges: 28 },
        { name: 'Tina', sharedChanges: 57 },
        { name: 'Uma', sharedChanges: 41 },
        { name: 'Yara', sharedChanges: 49 }
      ]
    },
    {
      name: 'Wendy',
      coupledAuthors: [
        { name: 'Oscar', sharedChanges: 37 },
        { name: 'Tina', sharedChanges: 36 },
        { name: 'Zack', sharedChanges: 58 },
        { name: 'Xander', sharedChanges: 29 }
      ]
    },
    {
      name: 'Xander',
      coupledAuthors: [
        { name: 'Paul', sharedChanges: 18 },
        { name: 'Uma', sharedChanges: 25 },
        { name: 'Wendy', sharedChanges: 29 },
        { name: 'Yara', sharedChanges: 32 }
      ]
    },
    {
      name: 'Yara',
      coupledAuthors: [
        { name: 'Quinn', sharedChanges: 19 },
        { name: 'Victor', sharedChanges: 49 },
        { name: 'Xander', sharedChanges: 32 },
        { name: 'Zack', sharedChanges: 39 }
      ]
    },
    {
      name: 'Zack',
      coupledAuthors: [
        { name: 'Rachel', sharedChanges: 27 },
        { name: 'Wendy', sharedChanges: 58 },
        { name: 'Yara', sharedChanges: 39 }
      ]
    }
  ])

  function handleAuthorHover(name: string | null) {
    log.info('Hovered over:', name)
  }

</script>

<style scoped>

</style>