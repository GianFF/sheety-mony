<template>
  <div class="contenedor">
    <button type="button" class="boton" v-on:click="guardarGasto">✓</button>
  </div>
</template>

<script>
import { ACTION_SET_GASTO } from '../store/actions'
import { mapActions } from 'vuex'

export default {
  name: 'Boton',
  props: {
    cecos: Array,
  },
  methods: {
    ...mapActions({
      setGasto: ACTION_SET_GASTO,
    }),
    guardarGasto() {
      this.setGasto()
    },
  }
}
</script>

<style scoped>
  .boton {
    background-color: rgb(1, 6, 53); 
    border: none;
    
    font-size: 42px;
    color: white;

    box-shadow: 0 0 15px black;

    cursor: pointer;
  }
</style>
