<template>
  <div class="pagination flex flex-aic flex-jcsb">
    <button
      class="btn btn--grey" 
      :disabled="curPages === 1 || totalPages === 0"
      @click="goPage(curPages-1)" 
    >
      <svg class="ic-20 ic-def"><use xlink:href="~/static/img/sprite.svg#arr-left"></use></svg>
    </button>
    <button
      v-if="totalPages > 1"
      class="btn btn--grey m-r-5 m-l-5" 
      :class="curPages === 1 ? 'active' : ''"
      @click="goPage(1)" 
    >
      1
    </button>

    <span class="pagination-line"></span>

    <div class="flex flex-aic pull-center" v-if="totalPages > 1">
      <template v-for="page of totalPages">
        <button
          v-if="page !== 1 && page !== totalPages && (curPages + 5) >= page && (curPages - 5) <= page"
          class="btn btn--grey m-r-5 m-l-5" 
          :key="page" 
          :class="curPages === page ? 'active' : ''"
          @click="goPage(page)" 
        >
          {{ page }}
        </button>
      </template>
    </div>

    <span class="pagination-line"></span>

    <button
      v-if="totalPages > 1"
      class="btn btn--grey m-r-5 m-l-5" 
      :class="curPages === totalPages ? 'active' : ''"
      @click="goPage(totalPages)" 
    >
      {{ totalPages }}
    </button>
    <button
      class="btn btn--grey" 
      :disabled="curPages === totalPages || totalPages === 0"
      @click="goPage(curPages+1)" 
    >
      <svg class="ic-20 ic-def"><use xlink:href="~/static/img/sprite.svg#arr-right"></use></svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    curPages: Number,
    totalPages: Number
  },

  methods: {
    goPage (page) {
      this.$emit('go', page)
    }
  }
}
</script>

<style scoped>
.pagination {
  padding: 20px 50px;
}
  .pagination .btn.active {
    background-color: var(--def);
    border-color: var(--def);
    color: #FFF;
  }
  .pagination-line {
    border-bottom: 1px solid #DDD;
    width: 100%;
  }
</style>