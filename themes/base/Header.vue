<template>
  <header>
    <primary-nav/>
    <nav class="py-2 border-b">
      <div class="container">
        <nav class="flex items-center justify-between">
          <div class="flex space-x-6">
            <n-link class="py-2 uppercase" to="/">
              <img class="h-7" src="../../sites/cssconverter/logo.png" alt="">
            </n-link>
            <unit-selector/>
          </div>
          <div class="py-2 flex space-x-2 hidden md:block">{{ site.tagline }}</div>
        </nav>
      </div>
    </nav>
    <div class="my-8">
      <div class="container text-center">
        <h1 class="text-4xl md:text-6xl font-bold">{{ page.title }}</h1>
        <p class="text-xl text-gray-500">{{ page.desc }}</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    data: {
      default: () => ({}),
      type: Object
    }
  },
  computed: {}
}
</script>

<style scoped>

</style>
