<template>
  <div class="container">
    <div class="flex aic jcsb mb2 mt4">
      <h1 class="m0">Организационная структура</h1>

      <div class="flex aic ggap2">
        <button class="btn red-light sm" @click="resetData">
          <svg class="ic16 icred mr1">
            <use xlink:href="@/assets/img/sprite.svg#reset"></use>
          </svg>
          Сбросить данные
        </button>
        <button class="btn red-light sm" @click="removeData">
          <svg class="ic16 icred mr1">
            <use xlink:href="@/assets/img/sprite.svg#delete"></use>
          </svg>
          Удалить данные
        </button>
      </div>
    </div>

    <Tabl 
      v-if="rows.length > 0"
      :rows="rows"
    />

    <div v-else class="warning danger">
      Нет ни одной записи
    </div>
  </div>
</template>

<script>
import Tabl from '@/components/tabl/Tabl'
export default {
  name: 'Main',
  components: { Tabl },
  
  computed: {
    rows () { return this.$store.getters.rows }
  },

  mounted () {
    if (this.rows.length === 0) this.$store.dispatch('getRows')
  },

  methods: {
    removeData () { this.$store.dispatch('removeRows') },
    resetData () { this.$store.dispatch('resetRows') },
  }
}
</script>

<style>

</style>
