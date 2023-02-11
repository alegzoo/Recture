<template>
    <v-btn text :class="{ 'selected': selectedButton === 1 }" @click="selectedButton = 1">MAT</v-btn>
    <v-btn text :class="{ 'selected': selectedButton === 2 }" @click="selectedButton = 2">INF</v-btn>
</template>


<script lang="ts">
export default {
  data() {
    return {
      selectedButton: 1
    }
  }
}
</script>