<template>
  <div class="child">
    <div class="child-row">
      <input type="radio" name="radio" :id="'radio_'+item.id" class="child-row-input" :value="item.id" v-model.number="modelValue">
      <label :for="'radio_'+item.id" class="child-row-label grid aic ggap1">
        <span></span>
        {{ item.name }}
      </label>
    </div>

    <component
      class="child-sub"
      v-for="(row, i) of item.children"
      :is="curComponent"
      :key="'children__'+i"
      :item="row"
      v-model="modelValue"
    />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: Number
    }
  },

  computed: {
    curComponent () { return () => import(`@/components/modal/ModalAddItem.vue`) },
    modelValue: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('change', val);
      }
    },
  },
}
</script>

<style lang="scss">
.child {
  padding: 1rem 0;
  &-sub {
    padding: 0 0 0 2rem;
  }
  &-row {
    &-input { display: none; }
    &-label {
      padding: 1rem;
      grid-template-columns: 2rem 1fr;

      & > span {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px $border-color solid;
        width: 2rem;
        height: 2rem;
        border-radius: 100px;
      }

      &:hover { 
        background-color: #F0F4FD; 
        & > span {
          border-color: $primary;
        }
      }

      .child-row-input:checked + & {
        background-color: #EEE;

        & > span {
          border-color: $primary;

          &::before {
            content: "";
            display: block;
            width: 1rem;
            height: 1rem;
            background-color: $primary;
            border-radius: 100px;
          }
        }
      }
    }
  }
}
</style>
