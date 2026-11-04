import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', () => {
    const nomJugador = ref('');
    const partides = ref([]);

    function guardarNom(nom){
        nomJugador.value = nom;
    }

    function guardarPartida(diferenciaTotal){
        partides.value.unshift({
            id: partides.value.length + 1,
            nom: nomJugador.value,
            diferenciaTotal: diferenciaTotal
        });
    }

    function esborrarPartides(){
        this.partides = [];
    }

    return {
        nomJugador,
        partides,
        guardarNom,
        guardarPartida,
        esborrarPartides
    }
});