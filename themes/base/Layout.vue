<template>
  <div id="master-layout">
    <slot name="head"/>
    <main>
      <div class="container">
        <div class="mb-8">
          <h2 v-if="!page.is_home" class="mb-2 uppercase font-bold">{{ page.title }}</h2>
          <div class="p-6 rounded border border-gray-100 shadow">
            <div class="flex items-center -mx-6 flex-col" :class="{'md:flex-row': !manyOutput}">
              <div class="flex-1 px-6 w-full">
                <div class="text-xs font-bold text-gray-500 uppercase mb-2">Input</div>
                <unit-form/>
              </div>
              <div class="my-6 w-full" :class="{'md:w-auto': !manyOutput}">
                <icon class="medium" :name="manyOutput ? 'down' : 'right'"></icon>
              </div>
              <div class="flex-1 px-6 w-full">
                <div class="text-xs font-bold text-gray-500 uppercase mb-2">Output</div>
                <unit-form reversed/>
              </div>
            </div>
          </div>
        </div>
        <div v-if="page.is_converter && page.is_conversion" class="mb-8">
          <h2 class="mb-2 font-bold">{{ $t(`converter_table.title`, [page.parsed[0].unit.toUpperCase(), page.parsed[1].unit.toUpperCase()]) }}</h2>
          <div class="overflow-hidden" :style="{height: collapse ? '165px': 'unset'}">
            <table class="min-w-max w-full table-auto border-l border-r">
              <thead>
              <tr class="flex items-center bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th class="flex-1 py-1.5 px-3 text-left">{{page.parsed[0].unit.toUpperCase()}}</th>
                <th>
                  <icon name="right"></icon>
                </th>
                <th class="flex-1 py-1.5 px-3 text-left">{{page.parsed[1].unit.toUpperCase()}}</th>
              </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
              <tr v-for="(v, i) in site.testRanges" :key="i" :class="{'bg-gray-50': i % 2 === 0}"
                  class="w-full border-b flex items-center border-gray-200 hover:bg-gray-100">
                <td class="py-1.5 flex-1 px-3 text-left whitespace-nowrap">
                  <div class="flex items-center space-x-1">
                    <span class="font-bold">{{ v }}</span>
                    <span>{{page.parsed[0].unit.toUpperCase()}}</span>
                  </div>
                </td>
                <td>
                  <n-link :to="`${v}px-to-cm-conversion`">
                    <icon name="right"></icon>
                  </n-link>
                </td>
                <td class="py-1.5 flex-1 px-3 text-left">
                  <div class="flex items-center space-x-1">
                    <span class="font-bold">{{ compute(v) }}</span>
                    <span>{{page.parsed[1].unit.toUpperCase()}}</span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-2 flex justify-center">
            <div class="flex space-x-2 cursor-pointer text-xs uppercase" @click="collapse = !collapse">
              <span>{{ collapse ? 'more' : 'less' }}</span>
              <icon name="dots"></icon>
            </div>
          </div>
        </div>
        <div class="mb-8">
          <h2 class="mb-2 font-bold uppercase text-sm">Related converters</h2>
          <div class="grid gap-4" :class="{'md:grid-cols-3': units.length > 1}">
            <div v-for="unit in units" :key="unit" class="rounded-sm transition-shadow border duration-300 hover:shadow-lg hover:border-white p-4">
              <n-link :to="`/${unit}-converter`" class="text-xs font-bold text-gray-500">
                <span>{{ unit.toUpperCase() }}</span>
              </n-link>
              <n-link v-for="runit in Object.keys(site.unitObject).filter(x => x !== unit)" :key="`${runit}-r`" :to="`/${unit}-to-${runit}-converter`" class="flex space-x-2 mt-2 text-sm">
                <icon name="right"></icon>
                <span>{{ $t('converter_2.title', [unit.toUpperCase(), runit.toUpperCase()]) }}</span>
              </n-link>
            </div>
          </div>
        </div>
        <div v-if="page.is_converter" class="mb-8">
          <h2 class="mb-2 font-bold">FAQ</h2>
          <div class="mb-3">
            <h3 class="mb-1.5 font-bold">What is the pixel?</h3>
            <p class="p-4 rounded-sm shadow border border-gray-50">EM is a measurement unit commonly used in Cascading
              Style Sheets. It is a font-relative unit, which means that it's value is relative to the font-size of it's
              parent element (read more).</p>
          </div>
          <div class="mb-3">
            <h3 class="mb-1.5 font-bold">What is the pixel?</h3>
            <p class="p-4 rounded-sm shadow border border-gray-50">EM is a measurement unit commonly used in Cascading
              Style Sheets. It is a font-relative unit, which means that it's value is relative to the font-size of it's
              parent element (read more).</p>
          </div>
        </div>
      </div>
    </main>
    <slot name="foot"/>
  </div>
</template>

<script>
const convertArrayToObject = (array, key) =>
  array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item.default
    }),
    {}
  );
export default {
  name: "BaseLayout",
  data() {
    return {
      collapse: true,
      compute: null
    }
  },
  computed: {
    units() {
      return Object.keys(this.site.unitObject).filter(unit => {
        if (this.page.is_home) {
          return true
        } else if (this.page.parsed.length) {
          return this.page.parsed.map(x => x.unit).includes(unit)
        } else {
          return false
        }
      })
    },
    manyOutput() {
      return this.page.is_home || (this.page.is_converter && !this.page.is_conversion)
    }
  },
  created() {
    if (this.page.parsed.length === 2) {
      const left = this.site.unitObject[this.page.parsed[0].unit].ratio
      const right = this.site.unitObject[this.page.parsed[1].unit].ratio
      const funcLeft = new Function('p', left.compute)
      const funcRight = new Function('p', right.compute)
      const ratioL = funcLeft(convertArrayToObject(left.params, 'name'))
      const ratioR = funcRight(convertArrayToObject(right.params, 'name'))
      this.compute = (input) => (ratioL * input) / ratioR
    }
  }
}
</script>

<style scoped>
#master-layout {
  min-height: 100vh;
  @apply flex flex-col;
}

main {
  @apply flex-1 md:py-8 py-4;
}
</style>
