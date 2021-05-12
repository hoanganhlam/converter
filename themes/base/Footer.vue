<template>
  <footer class="p-4 border-t">
    <div class="container">
      <div class="flex justify-between items-center">
        <div class="flex space-x-3 text-sm">
          <p>{{ site.domain }} © 2020</p>
          <n-link to="/about">About</n-link>
          <n-link to="/about">Privacy</n-link>
        </div>
        <div class="menu-foot">

        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
   name: "BaseFooter",
   props: {
      data: {
         default: () => ({}),
         type: Object
      }
   }
}
</script>

<style scoped>

</style>
