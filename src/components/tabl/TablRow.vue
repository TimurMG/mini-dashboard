<template>
  <div class="tabl-row-group grid wfull">
    <div class="tabl-row grid gtcauto aic" :class="this.hasChild ? 'has-child' : ''">

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
      <span class="tabl-cell flex aic">
        {{ summ }}
      </span>

      <!-- Cells -->
      <span class="tabl-cell flex aic ggap1">
        <button class="btn min edit">
          <svg class="ic20 icprimary">
            <use xlink:href="@/assets/img/sprite.svg#edit"></use>
          </svg>
        </button>
        <button class="btn min delete">
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
        :index="i"
        :item="row"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data: () => ({
    isSub: false
  }),

  computed: {
    curComponent () { return () => import(`@/components/tabl/TablRow.vue`) },
    hasChild () { return this.item.children.length > 0 },
    summ () {
      const arr = this.item.children
      let res = 0
      if (arr.length > 0) res = res + this.countSumm(arr)
      else res = res + this.item.count
      return res
    }
  },

  methods: {
    countSumm (arr) {
      let res = 0
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        if (element.children.length > 0) res = res + this.countSumm(element.children)
        else res = res + element.count
      }
      return res
    }
  }
}
</script>

<style lang="scss">
</style>
