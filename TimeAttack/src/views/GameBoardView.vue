<script setup>
import { ref } from 'vue';
import KeyPad from '../components/KeyPad.vue';

  const tecles = ['A', 'S', 'D', 'F'];
  const tempsObjectiu= {
    A: 2,
    S: 4,
    D: 5,
    F: 7
  }

  const jugant = ref(false);
  const resultats = ref([]);

  let tempsInici = 0;

  function rebreTecla(tecla){
    let tempsArribada = performance.now();
    let dif = (tempsArribada-tempsInici)/1000;

    for(let index = 0; index < resultats.value.length; index++){
      if(resultats.value[index].tecla == tecla){
        console.log("tecla repetida");
        return;
      }
    }

    
    console.log("se supone que han apretqado "+tecla)
  }

  function iniciPartida(){
    jugant.value=true;
    tempsInici=performance.now();
    resultats.value=[];
  }

</script>

<template>
  <div class="container-fluid">
    <div class="d-flex flex-column align-items-center w-100">
      <h3>GameBoard</h3>
      <button @click="iniciPartida">Iniciar partida</button>
          <KeyPad
          :tecles="tecles"
          :bloquejat="!jugant"
          @premuda="rebreTecla"
          />

    </div>
  </div>
  
</template>