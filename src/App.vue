<template>
  <div id="app">
    <!-- <transition name="fade">
      <PageLoading v-if="isLoad" />
    </transition> -->
    <HeadPage />
    <router-view @load="isLoad = $event" />
  </div>
</template>

<script>
import HeadPage from './components/page/HeadPage'

export default {
  name: 'App',
  components: { HeadPage }
}
</script>

<style>
</style>
