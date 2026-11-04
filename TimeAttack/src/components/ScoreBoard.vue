<script setup>
import { useGameStore } from '@/stores/game';

const store = useGameStore();
</script>

<template>
    <div class="card shadow-sm border-0 mx-auto p-4" style="max-width: 650px;">
        <h2 class="h4 text-center mb-4">📋 Historial de partidas</h2>

        <div class="table-responsive">
        <table class="table table-hover table-striped align-middle mb-0">

            <thead class="table-primary">
                <tr>
                <th>Partida</th>
                <th>Jugador</th>
                <th>Error total</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="partida in store.partides" :key="partida.id">
                    <td>{{ partida.id }}</td>
                    <td>{{ partida.nom }}</td>
                    <td>{{ partida.diferenciaTotal }}</td>
                </tr>

                <tr v-if="store.partides.length === 0">
                    <td colspan="3" class="text-center text-secondary py-3">
                    Todavía no hay partidas guardadas.
                    </td>
                </tr>
            </tbody>

      </table>
    </div>

  </div>
</template>

<style scoped>

</style>