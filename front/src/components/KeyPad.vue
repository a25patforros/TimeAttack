<script setup>
defineProps({
  tecles: Array,
  bloquejat: Boolean,
  premudes: Array
});

const emit = defineEmits(['premuda']);
</script>

<template>
  <div class="d-flex justify-content-center gap-3 w-100">
    <button v-for="(tecla, index) in tecles"
      :key = "tecla"
      :disabled="bloquejat || premudes.includes(tecla)"
      @click="emit('premuda', tecla)"
      class="btn btn-lg"
      :class="['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'][index]"
      style="width: 100px; height: 100px; font-size: 2rem;"
      >
      {{ tecla }}
    </button>
  </div>
</template>