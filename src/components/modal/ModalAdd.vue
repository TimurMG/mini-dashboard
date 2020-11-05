<template>
  <div class="modal flex aic">
    <div class="modal-content" v-click-outside="close">

      <div class="p2">
        <h2 class="m0">Добавление новой записи</h2>
        <button class="modal-close" @click="close">
          <svg class="ic20 icblack">
            <use xlink:href="@/assets/img/sprite.svg#close"></use>
          </svg>
        </button>
      </div>

      <hr class="m0">

      <div class="p2">
        <div class="grid gtc2 aic ggap2">
          <span class="helper">Выберите город из списка<br>или создайте новый</span>
          <select name="city" id="city" v-model.number="newRow.city" class="form-input">
            <option :value="-1">Новый город</option>
            <option v-for="(item, i) of rows" :key="item.id" :value="i">{{ item.name }}</option>
          </select>
        </div>
        <hr>
        <template v-if="newRow.city === -1">
          <div class="grid gtc2 aic ggap2">
            <input type="text" name="cityname" id="cityname" placeholder="Название города" v-model="newRow.name" class="form-input">
            <input type="number" name="citycount" id="citycount" placeholder="Кол-во" v-model.number="newRow.count" class="form-input">
          </div>
        </template>
        <template v-else>
          <div class="btn-group grid gtc2 aic">
            <button class="btn-group-item" @click="sectionType = 1" :class="sectionType === 1 ? 'active' : ''">Новый раздер</button>
            <button class="btn-group-item" @click="sectionType = 2" :class="sectionType === 2 ? 'active' : ''" :disabled="rows[newRow.city].children.length === 0">Выбрать раздер</button>
          </div>
          <template v-if="sectionType === 1">
            <p class="helper">Добавьте раздел</p>
            <div class="grid gtc2 aic ggap2">
              <input type="text" name="cityname" id="cityname" placeholder="Название раздела" v-model="newRow.name" class="form-input">
              <input type="number" name="citycount" id="citycount" placeholder="Кол-во" v-model.number="newRow.count" class="form-input">
            </div>
          </template>
          <template v-else>
            <component
              v-for="(row, i) of rows[newRow.city].children"
              :is="curComponent"
              :key="'children__'+i"
              :item="row"
              v-model="curSection"
            />

          <template v-if="curSection">
            <hr>
            <div class="grid gtc2 aic ggap2">
              <input type="text" name="cityname" id="cityname" placeholder="Название" v-model="newRow.name" class="form-input">
              <input type="number" name="citycount" id="citycount" placeholder="Кол-во" v-model.number="newRow.count" class="form-input">
            </div>
          </template>
          </template>

        </template>
      </div>

      <hr class="m0">
      
      <div class="flex aic jcsb p2">
        <button class="btn red-light" @click="close">Отмена</button>
        <button class="btn primary" @click="save">Сохранить</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    sectionType: 1,
    curSection: null,
    newRow: {
      city: -1
    }
  }),

  watch: {
    'newRow.city': {
      handler () {
        if (this.rows[this.newRow.city].children.length === 0) {
          this.sectionType = 1
        }
      },
      deep: true
    }
  },

  computed: {
    rows () { return [ ...this.$store.getters.rows ] },
    curComponent () { return () => import(`@/components/modal/ModalAddItem.vue`) },
  },

  methods: {
    close () { this.$emit('close') },
    save () { 
      const arr = [ ...this.rows ]

      if (this.newRow.city === -1) {
        arr.push({
          id: this._uid,
          name: this.newRow.name,
          count: this.newRow.count,
          children: []
        })
      }

      else {
        if (this.sectionType === 1) {
          arr[this.newRow.city].children.push({
            id: this._uid,
            name: this.newRow.name,
            count: this.newRow.count,
            children: []
          })
        } 
        
        else if (this.curSection) {
          this.saveAction(arr[this.newRow.city].children)
        }
      }
      this.$store.commit('setRows', arr)
      this.$emit('close') 
    },

    saveAction (arr) {
      const index = arr.findIndex(item => item.id === this.curSection)
      if (index !== -1) {
        arr[index].children.push({
          id: this._uid,
          name: this.newRow.name,
          count: this.newRow.count,
          children: []
        })
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

  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.8);

  &-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 4rem;
    height: 4rem;
    cursor: pointer;

    &:hover { background-color: rgba(0, 0, 0, 0.1); }
    &:active { background-color: rgba(0, 0, 0, 0.2); }
  }

  &-content {
    position: relative;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    background-color: #FFF;
    margin: 3rem auto;
    display: block;
  }
}
.helper {
  font-size: 1.4rem;
  color: #777;
}

// Btn group
.btn-group {
  border: $border-1;
  border-radius: 5px;
  overflow: hidden;

  &-item {
    border: 0;
    background-color: transparent;
    font-size: 1.4rem;
    padding: 1rem 2rem;
    color: #999;
    cursor: pointer;

    &:hover { color: #333; }
    &:disabled { color: #999; background-color: #EEE; }

    &:first-child { border-right: $border-1; }
    &.active {
      background-color: $primary;
      color: #FFF;
    }
  }
}
</style>
