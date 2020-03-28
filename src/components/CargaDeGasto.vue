<template>
  <div class="contenedor">
    <input class="carga-de-gasto" type="number" min="0" @input="cargarGasto($event)">
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { MUTATION_SET_GASTO } from '../store/mutations';
export default {
  name: 'CargaDeGasto',
  methods: {
    ...mapMutations({
      setGasto: MUTATION_SET_GASTO,
    }),
    cargarGasto(event) {
      const gasto = parseInt(event.srcElement.value) || 0
      this.setGasto(gasto)
    },
  },
}
</script>

<style scoped>
 
</style>
