<script setup>

defineProps({
    resultats: Array
});
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Tecla</th>
                <th>Temps objectiu</th>
                <th>Temps real</th>
                <th>Diferencia</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="r in resultats" :key="r.tecla">
                <td>{{ r.tecla }}</td>
                <td>{{ r.objectiu }}</td>
                <td>{{ r.tempsReal }}</td>
                <td>{{ r.error }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>