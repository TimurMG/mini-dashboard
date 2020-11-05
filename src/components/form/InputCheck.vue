<template>
  <div class="check">
    <input
      type="checkbox"
      class="check-input"
      :id="id+'-'+uniq"
      :name="name"
      :value="id"
      v-model="model"
    >
    <label class="check-label" :for="id+'-'+uniq" @click="$emit('clicked', model)">
      <svg class="ic-16 ic-white"><use xlink:href="@/assets/img/sprite.svg#check" /></svg>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },

  // eslint-disable-next-line
  props: ['name', 'id', 'checked', 'uniq', 'tabindex'],

  computed: {
    model: {
      get () {
        return this.checked
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  }
}
</script>

<style scoped>
.check {
  position: relative;
}
.check-input {
  /* display: none; */
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.check-label {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-color: #FFF;
  padding: 0;
  border: 2px #CCC solid;
}
.check-label:hover,
.check-input:focus + .check-label {
  border-color: var(--def);
}
.check-input:checked + .check-label {
  background-color: var(--def);
  border-color: var(--def);
}
  .check-label > svg {
    opacity: 0;
  }
  .check-input:checked + .check-label > svg {
    opacity: 1;
  }
</style>
