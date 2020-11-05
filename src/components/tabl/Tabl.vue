<template>
  <div class="tabl grid wfull">
        
    <!-- CAPTION -->
    <div class="tabl-caption grid gtcauto aic">
      <span class="tabl-cell">
        Название
      </span>
      <span class="tabl-cell">
        Кол-во
      </span>
      <span class="tabl-cell">
        Действия
      </span>
    </div>
    
    <!-- ROWS -->
    <component
      v-for="(row, i) of rows"
      :is="curComponent"
      :key="'row__'+i"
      :index="i"
      :item="row"
    />

  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  computed: {
    curComponent () { return () => import(`@/components/tabl/TablRow.vue`) },
  }
}
</script>

<style lang="scss">
.tabl {
  padding: 0;
  border: $border-1;
  margin: 30px 0;
  border-radius: 5px;
  overflow: hidden;

  &-caption {
    font-size: 1.2rem;
    color: #FFF;
    background-color: $primary;

    .tabl-cell {
      border-color: rgba(0, 0, 0, 0.2);
      padding: 1.5rem 2rem;
    }
  }

  &-row {
    border-top: $border-1;
    border-bottom: $border-1;
    margin: 0 0 -1px;

    &:hover { background-color: #F0F4FD; }
    &:active { background-color: #e5eeff; }
    &.has-child {
      cursor: pointer;
    }

    &-group {
      position: relative;
      z-index: 1;

      &::before {
        content: "";
        display: flex;
        position: absolute;
        left: 19px;
        top: 52px;
        bottom: 0;
        width: 1px;
        border-left: 1px #CCC dashed;
        z-index: 0;
      }

      &.grid-child {
        padding: 0 0 0 20px;
        color: #777;
        & .name {
          font-weight: normal !important;
        }

        &::before {
          content: "";
          display: flex;
          position: absolute;
          left: 39px;
          top: 52px;
          bottom: 0;
          width: 1px;
          border-left: 1px #CCC dashed;
          z-index: 0;
        }
      }
    }
  }

  &-cell {
    padding: 0.5rem 2rem;
    border-right: $border-1;
    height: 100%;

    &.name {
      font-weight: bold;
      & svg {
        transform: rotate(0deg);
        transition: .2s;
      }
    }
    &.active {
      .has-child > & { 
        color: $primary; 
      }
      & svg {
        transform: rotate(90deg);
        transition: .2s;
      }
    }

    &:last-child {
      border-right: 0;
    }
  }
}
</style>
