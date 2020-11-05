<template>
  <header class="head">
    <div class="container flex aic jcsb hfull">
      <nav class="head-menu flex">
        <router-link to="/" class="head-menu-item flex aic jcc">Дизайн 1</router-link>
        <router-link to="/test" class="head-menu-item flex aic jcc">Дизайн 2</router-link>
      </nav>

      <button class="head-add btn white">
        <svg class="ic20 icwhite mr1">
          <use xlink:href="@/assets/img/sprite.svg#plus"></use>
        </svg>
        Добавить
      </button>
    </div>
  </header>
</template>

<script>
export default {
  // data: () => ({
  //   isUserMenu: false
  // })
}
</script>

<style lang="scss">
.head {
  background-color: $primary;
  color: #FFF;
  height: 6rem;

  &-menu {
    height: 100%;
    padding: 10px 0 0;

    &-item {
      padding: 0 2rem;
      color: #FFF;
      text-decoration: none;
      opacity: .6;
      border-radius: 5px 5px 0 0;

      &:hover { opacity: 1; }
      &:active { opacity: 0.8; }
      &.router-link-exact-active { 
        opacity: 1; 
        background-color: #FFF;
        color: $primary;
      }
    }
  }
}
</style>
