<script setup>
import { useGameStore } from '@/stores/game';
import { computed } from 'vue';

const store = useGameStore();

const classificacioOrdenada = computed( () =>
    store.classificacio.slice().sort((a,b) => a.errorTotal - b.errorTotal)
);

</script>
<template>
    <div class="card shadow-sm border-0 mx-auto p-4" style="max-width: 650px;">
        <h2 class="h4 text-center mb-4">📋 Historial de partidas</h2>

        <div class="table-responsive">
        <table class="table table-hover table-striped align-middle mb-0">

            <thead class="table-primary">
                <tr>
                <th>Jugador</th>
                <th>Error total</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(resultat, index) in classificacioOrdenada" :key="index"  :class="index === 0 ? 'table-success' : ''">
                    <td>{{ resultat.nom }}</td>
                    <td>{{ resultat.errorTotal }}</td>
                </tr>

                <tr v-if="store.classificacio.length === 0">
                    <td colspan="3" class="text-center text-secondary py-3">
                    Todavía no hay partidas guardadas.
                    </td>
                </tr>
            </tbody>
      </table>
    </div>
  </div>
</template>