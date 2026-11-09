import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', () => {
    const nomJugador = ref('');
    const partides = ref([]);
    const classificacio = ref([]);

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

    function actualitzarClassificacio(dades) {
        classificacio.value = dades
    }

    return {
        nomJugador,
        partides,
        classificacio,
        guardarNom,
        guardarPartida,
        esborrarPartides,
        actualitzarClassificacio
    }
});