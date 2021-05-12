<template>
  <div class="flex flex-col">
    <unit-input v-for="u in units" :key="u.unit" :unit="u" :value="value" :reversed="reversed"/>
  </div>
</template>

<script>
import UnitInput from "@/themes/base/UnitInput";
export default {
  name: "UnitForm",
  components: {UnitInput},
  props: {
    value: {
      type: Number,
      default: 0
    },
    reversed: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    units() {
      if (this.reversed) {
        if (this.page.parsed.length === 2) {
          return [this.page.parsed[1].unit]
        } else {
          const exceptUnits = this.page.parsed.map(x => x.unit)
          if (exceptUnits.length === 0) {
            exceptUnits.push(this.site.base)
          }
          return Object.keys(this.site.unitObject).filter(x => !exceptUnits.includes(x))
        }
      } else {
        let x
        if (this.page.parsed.length) {
          x = this.page.parsed[0].unit
        } else {
          x = this.site.base
        }
        return [x]
      }
    }
  }
}
</script>
