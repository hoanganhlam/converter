<template>
  <div class="py-2 px-4 relative duration-300 min-w-1" :class="{'hover:shadow': !disabled}"
       v-click-outside="hideMenu">
    <div class="flex h-full space-x-2 cursor-pointer items-center" @click="show = !show">
      <icon v-if="!disabled || page.is_conversion || (page.is_converter && page.is_conversion)" name="select"></icon>
      <span>{{ simple ? value : $t('unit_selector.title') }}</span>
    </div>
    <div v-if="!disabled || page.is_conversion || (page.is_converter && page.is_conversion)" v-show="show" class="absolute z-50 w-48 left-0 pt-4">
      <div class="border shadow bg-white">
        <template v-for="unit in Object.keys(site.unitObject).filter(x => x !== value)">
          <div class="px-3 py-1.5 hover:bg-green-500 hover:text-white text-sm cursor-pointer" v-if="simple"
               @click="select(unit)">
            <span>{{ unit.toUpperCase() }}</span>
          </div>
          <n-link
            v-else
            :key="unit"
            class="px-3 py-1.5 flex space-x-2 cursor-pointer hover:bg-green-500 hover:text-white text-sm"
            :to="`/${unit}-converter`">
            <icon name="right"></icon>
            <span>{{ $t('converter.title', [unit.toUpperCase()]) }}</span>
          </n-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitSelector",
  props: {
    value: {
      type: String,
      default: null
    },
    simple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    hideMenu() {
      this.show = false
    },
    select(unit) {
      let location = `/${unit}-converter`
      let adt = this.page.is_conversion ? 'conversion' : 'converter'
      let num = this.page.parsed[0] && this.page.parsed[0].numb ? this.page.parsed[0].numb : ''
      if (this.position === 0) {
        location = `${num}${unit}-to-${this.page.parsed[1].unit}-${adt}`
      } else if (this.position === 1) {
        location = `${num}${this.page.parsed[0].unit}-to-${unit}-${adt}`
      }
      this.$router.push(location)
    }
  },
}
</script>

<style scoped>
.min-w-1 {
  min-width: 4rem;
}
</style>
