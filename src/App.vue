<template>
  <div id="app" class="contenedor">
    <span class="toast" v-show="errorMessage || successMessage">
      {{errorMessage || successMessage}}
    </span>

    <h1>Cargar gasto</h1>
    <CeCos :cecos="cecos"></CeCos>
    <CargaDeGasto></CargaDeGasto>
    <Boton></Boton>
  </div>
</template>

<script>
import CeCos from './components/CeCos.vue'
import CargaDeGasto from './components/CargaDeGasto.vue'
import Boton from './components/Boton.vue'
import { ACTION_GET_CECOS } from '../src/store/actions'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    CeCos,
    CargaDeGasto,
    Boton,
  },
  computed: {
    cecos() {
      return this.$store.state.cecos
    },
    errorMessage() {
      return this.$store.state.badToastMessage
    },
    successMessage() {
      return this.$store.state.goodToastMessage
    }
  },
  methods: {
    ...mapActions({
      getCecos: ACTION_GET_CECOS,
    }),
  },
  created() {
    this.getCecos()
  },
}
</script>

<style>
#app {
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: white;

  width: 100%;
  height: 1000%;

  margin-top: 120px;
}

body {
  background-color: #2c3e50;
}

h1 {
  text-shadow: 6px 6px 15px black
}

select, input {
  width: 200px;

  background-color: white;
  border: none;
  
  font-size: 28px;
  color:  rgb(1, 6, 53);

  box-shadow: 10px 10px 15px black;
}

.contenedor {
  margin-top: 60px;
}

.toast {
  position: absolute;
  z-index: -1;
  top: 20%;

  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 36px;
  text-align: center;
  color: white;

  animation-name: toast-animation;
  animation-duration: 2s;
}

@keyframes toast-animation {
  from {
    transform : scale(1);
    opacity   : 1;
  }
  50% {
    transform : scale(0.75);
    opacity   : 0.25;
  }
  to {
    transform : scale(1);
    opacity   : 1;
  }
}
</style>
