<template>
  <div id="app">
    <transition name="fade">
      <ModalAdd v-if="isAdd" @close="isAdd = false" />
    </transition>
    <HeadPage @add="isAdd = true" />
    <router-view @load="isLoad = $event" />
  </div>
</template>

<script>
import HeadPage from './components/page/HeadPage'
import ModalAdd from './components/modal/ModalAdd'

export default {
  name: 'App',
  components: { HeadPage, ModalAdd },
  data: () => ({
    isAdd: false
  })
}
</script>
