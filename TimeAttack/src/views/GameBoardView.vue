<script setup>
import KeyPad from '../components/KeyPad.vue';
import ResultsTable from '@/components/ResultsTable.vue';
import { onMounted, onUnmounted, ref } from 'vue';

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

  let tempsInici = 0;

  function rebreTecla(tecla){
    let tempsArribada = performance.now();
    let dif = (tempsArribada-tempsInici)/1000;

    /*for(let index = 0; index < resultats.value.length; index++){
      if(resultats.value[index].tecla == tecla){
        console.log("tecla repetida");
        return;
      }
    }*/

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
      "error" : tempsObjectiu[tecla] - dif
    }
    console.log(nouResultat);
    resultats.value.push(nouResultat);

    if(resultats.value.length===tecles.length){
      jugant.value = false;
    }
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

  //mounted unmounted
  onMounted(() => {
      document.addEventListener('keydown',escoltarTeclat);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', escoltarTeclat);
  });

</script>

<template>
  <div class="container-fluid">
    <div class="d-flex flex-column justify-content-center align-items-center w-100 min-vh-100">
      <h3>GameBoard</h3>

      <!--Results table-->
      <div v-if="!jugant && resultats.length === tecles.length" class="d-flex flex-column align-items-center">
        <button @click="reiniciarPartida" class="my-4">Reiniciar partida</button>
        <ResultsTable
          :resultats="resultats"
        />
      </div>

      <!--Game-->
      <div v-else class="d-flex flex-column align-items-center">
          <button @click="iniciPartida" class="my-4">Iniciar partida</button>
          <KeyPad
          :tecles="tecles"
          :bloquejat="!jugant"
          :premudes = "premudes"
          @premuda="rebreTecla"
          />

      </div>
      
    </div>
  </div>
  
</template>