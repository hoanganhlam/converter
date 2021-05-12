<template>
  <div class="flex space-x-2 mb-2 last:mb-0">
    <div v-for="p in params" :key="p.name" class="flex w-1/3 md:w-1/4">
      <label class="flex-1 relative">
        <span class="absolute bottom-1 right-2 font-bold text-gray-400 text-xs">{{p.name}}</span>
        <input type="number" :value="pValue[p.name] || p.default" class="input" @input="handleInputParam(p.name, $event)">
      </label>
    </div>
    <div class="flex flex-1">
      <label class="flex-1">
        <input :disabled="disabled" type="number" :value="output" class="input" @input="handleInput">
      </label>
    </div>
    <unit-selector :value="unit" :position="position" simple :disabled="disabled"/>
  </div>
</template>

<script>
export default {
  name: "UnitInput",
  props: {
    reversed: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: 'px'
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      output: 0,
      pValue: {}
    }
  },
  computed: {
    position() {
      if (this.page.parsed.length === 2) {
        return this.reversed ? 1 : 0
      } else {
        return -1
      }
    },
    ratio() {
      return new Function("p", this.site.unitObject[this.unit].ratio.compute)
    },
    params() {
      return this.site.unitObject[this.unit].ratio.params || []
    },
    disabled() {
      return this.reversed || (this.page.is_conversion && !this.page.is_converter)
    },
    base() {
      return this.$store.state.config.balanceValue
    }
  },
  methods: {
    makeParams() {
      if (this.params.length !== Object.keys(this.pValue).length) {
        this.params.forEach(p => {
          if (typeof this.pValue[p.name] === 'undefined') {
            this.pValue[p.name] = p.default
          }
        })
      }
    },
    computeOutput() {
      this.makeParams()
      this.output = this.base / this.ratio(this.pValue)
    },
    async handleInputParam(field, e) {
      this.$set(this.pValue, field, e.target.value ? Number.parseFloat(e.target.value) : 0)
      if (this.reversed) {
        this.computeOutput()
      } else {
        await this.handleInput()
      }
    },
    async handleInput(e) {
      this.makeParams()
      let val = 1;
      if (e) {
        val = e.target.value ? Number.parseFloat(e.target.value) : 1
      } else {
        if (this.page.parsed.length) {
          val = this.page.parsed[0].numb ? Number.parseFloat(this.page.parsed[0].numb) : 1
        }
      }
      this.output = val
      await this.$store.commit('config/SET_BALANCE', val * this.ratio(this.pValue))
    }
  },
  watch: {
    base() {
      if (this.reversed) {
        this.computeOutput()
      }
    },
    async "$route"() {
      if (!this.reversed) {
        await this.handleInput()
      }
    },
  },
  async created() {
    if (this.reversed) {
      this.computeOutput()
    } else {
      await this.handleInput()
    }
  }
}
</script>

<style scoped>
.input {
  @apply w-full md:text-2xl font-bold border border-gray-100 p-2 md:p-3 rounded-sm;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
}
</style>
