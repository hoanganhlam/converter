<template>
  <base-layout>
    <base-header slot="head"/>
    <template slot="main"></template>
    <base-footer slot="foot"/>
  </base-layout>
</template>

<script>
export default {
  name: "Converter",
  head() {
    return {
      title: `${this.page.title} - ${this.site.domain}`,
      meta: [
        { hid: 'description', name: 'description', content: this.page.desc }
      ]
    }
  }
}
</script>

<style scoped>

</style>
