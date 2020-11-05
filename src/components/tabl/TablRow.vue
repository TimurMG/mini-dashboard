<template>
  <div class="tabl-row-group grid wfull">
    <div class="tabl-row grid gtcauto aic" :class="this.hasChild ? 'has-child' : ''">
      
      <!-- Edit form -->
      <form v-if="isEdit" @submit.prevent="saveRow" class="edit-form grid aic ggap2">
        <input type="text" name="name" :id="'name'+newData.id" v-model="newData.name">
        <input type="number" name="count" :id="'count'+newData.id" v-model.number="newData.count">
        <span class="flex aic ggap1">
          <button type="submit" class="btn primary sm">Сохранить</button>
          <button type="button" class="btn sm" @click="isEdit = false">Отмена</button>
        </span>
      </form>

      <!-- Cells -->
      <span 
        class="tabl-cell flex aic jcsb name"
        :class="this.isSub ? 'active' : ''"
        @click="isSub = !isSub"
      >
        {{ item.name }}
        <svg v-if="hasChild" class="ic16 icdef">
          <use xlink:href="@/assets/img/sprite.svg#arr-right"></use>
        </svg>
      </span>

      <!-- Cells -->
      <span class="tabl-cell flex aic" @click="isSub = !isSub">
        {{ item.count }}
      </span>

      <!-- Cells -->
      <span class="tabl-cell flex aic" @click="isSub = !isSub">
        {{ summ }}
      </span>

      <!-- Cells -->
      <span class="tabl-cell flex aic ggap1">
        <button class="btn min edit" @click="editRow">
          <svg class="ic20 icprimary">
            <use xlink:href="@/assets/img/sprite.svg#edit"></use>
          </svg>
        </button>
        <button class="btn min delete" @click="deleteRow">
          <svg class="ic20 icred">
            <use xlink:href="@/assets/img/sprite.svg#delete"></use>
          </svg>
        </button>
      </span>

    </div>
    
    <template v-if="isSub">
      <component
        v-for="(row, i) of item.children"
        class="grid-child"
        :is="curComponent"
        :key="'row-child__'+i"
        :item="row"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data: () => ({
    isSub: false,
    isEdit: false,
    newData: {
      id: 0,
      name: '',
      count: 0
    }
  }),

  computed: {
    curComponent () { return () => import(`@/components/tabl/TablRow.vue`) },
    hasChild () { return this.item.children.length > 0 },
    summ () {
      const arr = this.item.children
      let res = 0
      if (arr.length > 0) res = res + this.item.count + this.countSumm(arr)
      else res = res + this.item.count
      return res
    },
    rows () { return [ ...this.$store.getters.rows ] }
  },

  methods: {
    countSumm (arr) {
      let res = 0
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        if (element.children.length > 0) res = res + element.count + this.countSumm(element.children)
        else res = res + element.count
      }
      return res
    },

    saveRow () {
      const arr = [ ...this.rows ]
      this.saveAction(arr)
      this.$store.commit('setRows', arr)
      this.isEdit = false
    },

    saveAction (arr) {
      const index = arr.findIndex(item => item.id === this.newData.id)
      if (index !== -1) {
        arr.splice(index, 1, this.newData)
      }
      else {
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i]
          if (element.children.length > 0) {
            this.saveAction(element.children)
          }
        }
      }
    },

    editRow () {
      this.newData = { ...this.item }
      this.isEdit = true
    },

    deleteRow () {
      const arr = [ ...this.rows ]
      this.deleteAction(arr)
      this.$store.commit('setRows', arr)
    },

    deleteAction (arr) {
      const index = arr.findIndex(item => item.id === this.item.id)
      if (index !== -1) {
        arr.splice(index, 1)
      }
      else {
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i]
          if (element.children.length > 0) {
            this.deleteAction(element.children)
          }
        }
      }
    },

  }
}
</script>

<style lang="scss">
.edit-form {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff5d9;
  z-index: 1;
  padding: 0 20px;
  cursor: default;
  grid-template-columns: 1fr 140px 270px;

  & > input {
    display: block;
    border: 1px #CCC solid;
    padding: 0 1.5rem;
    font-size: 1.6rem;
    height: 3.4rem;
    border-radius: 4px;

    &:hover { border-color: #AAA; }
    &:focus { 
      border-color: $primary;
      box-shadow: 0 0 0 1px $primary;
    }
  }
}
</style>
