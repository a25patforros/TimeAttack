<script setup>
import KeyPad from '../components/KeyPad.vue';
import ResultsTable from '@/components/ResultsTable.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '@/services/socket'
import { useGameStore } from '@/stores/game.js';
import ScoreBoard from '@/components/ScoreBoard.vue';

  const tecles = ['A', 'S', 'D', 'F'];
  const tempsObjectiu= {
    A: 2,
    S: 4,
    D: 5,
    F: 7
  }

  const jugant = ref(false);
  const resultats = ref([]);
  const premudes = ref([]);
  const store = useGameStore();
  const nom = ref('');

  let tempsInici = 0;

  function rebreClassificacio(dades) {
    console.log('Classificació rebuda:', dades)

    store.actualitzarClassificacio(dades)
  }

  function rebreTecla(tecla){
    let tempsArribada = performance.now();
    let dif = (tempsArribada-tempsInici)/1000;

    if(premudes.value.includes(tecla)){
      console.log("tecla repetida");
      return;
    }

    premudes.value.push(tecla);

    console.log("se supone que han apretado " + tecla);

    let nouResultat ={
      "tecla" : tecla,
      "objectiu" : tempsObjectiu[tecla],
      "tempsReal" : dif,
      "diferencia" : tempsObjectiu[tecla] - dif
    }
    console.log(nouResultat);
    resultats.value.push(nouResultat);

    if(resultats.value.length===tecles.length){
      jugant.value = false;

      let diferenciaTotal = 0;

      for(let i = 0; i < resultats.value.length; i++){
        const resElement = resultats.value[i];
        diferenciaTotal = diferenciaTotal + resElement.diferencia;
      }

      store.guardarPartida(Number(diferenciaTotal.toFixed(2)));
      
      socket.emit('resultat', {
        nom: store.nomJugador,
        errorTotal: diferenciaTotal
      });
    }
  }

  function entrar(){
    if(nom.value.trim() === '') return;

    store.guardarNom(nom.value.trim());
  }

  function iniciPartida(){
    jugant.value=true;
    tempsInici=performance.now();
    resultats.value=[];
    premudes.value=[];
  }

  function reiniciarPartida(){
    jugant.value = false;
    resultats.value=[];
    premudes.value=[];
  }

  function escoltarTeclat(e){

    if(!jugant.value){
      console.log("No s'ha iniciat la partida");
      return;
    } 

    if(e.repeat){
      return;
    }

    let teclaTeclat = e.key.toUpperCase();

    if(!tecles.includes(teclaTeclat)){
      console.log("Aquesta tecla no és al joc");
      return;
    }

    rebreTecla(teclaTeclat);
  }

  function connectat() {
  console.log('Connectat al servidor!', socket.id)
  }

  //mounted unmounted
  onMounted(() => {
    socket.on('connect', connectat);
    socket.on('classificacio', rebreClassificacio);
    socket.connect();
    document.addEventListener('keydown',escoltarTeclat);   
  });

  onUnmounted(() => {
    socket.off('connect', connectat);
    socket.off('classificacio', rebreClassificacio);
    socket.disconnect();
    document.removeEventListener('keydown', escoltarTeclat);
  });

</script>

<template>
  <div class="container-fluid bg-body-tertiary min-vh-100 py-5">
    <div class="d-flex flex-column justify-content-center align-items-center w-100 min-vh-100">
      <div class="container">

        <!-- Títol -->
        <div class="text-center mb-4">
          <h1 class="fw-bold text-primary">⏱️ TIME ATTACK</h1>
          <p class="text-secondary">Posa a prova els teus reflexos!</p>
        </div>

      <!--Form Nom-->
      <div v-if="!store.nomJugador" class="card shadow-sm border-0 mx-auto p-4" style="max-width: 450px;">
        <h2 class="h4 text-center mb-4">Benvingut!</h2>
        <form @submit.prevent="entrar">
          <label class="form-label">Nom del jugador</label>
          <input v-model="nom" class="form-control mb-3" placeholder="Introdueix el teu nom" />
          <button type="submit" class="btn btn-primary w-100">Entrar al joc</button>
        </form>
      </div>

      <div v-else>
        <div class="mb-4">
          <ScoreBoard />
        </div>

        <!--Results table-->
        <div v-if="!jugant && resultats.length === tecles.length" class="card shadow-sm border-0 mx-auto p-4" style="max-width: 650px;">
          <h2 class="h4 text-center mb-3">🏆 Resultats de la partida</h2>
          <ResultsTable :resultats="resultats" />

          <button @click="reiniciarPartida" class="btn btn-primary mt-4 mx-auto">
            Reiniciar partida
          </button>
        </div>

        <!--Game-->
        <div v-else class="card shadow-sm border-0 mx-auto p-4" style="max-width: 650px;">

          <h2 class="h4 text-center mb-2">
            Benvingut, {{ store.nomJugador }}!
          </h2>

          <p class="text-secondary text-center mb-4">
            Prem les tecles A, S, D i F en el moment adequat.
          </p>

          <div class="text-center">
            <button @click="iniciPartida" class="btn btn-primary px-4 mb-4">
              ▶ Iniciar partida
            </button>
          </div>

          <KeyPad
            :tecles="tecles"
            :bloquejat="!jugant"
            :premudes="premudes"
            @premuda="rebreTecla"
          />
        </div>
      </div>
    </div>
    </div>
  </div>  
</template>