import Vue from 'vue';
import Icon from "~/components/Icon.vue";
import PrimaryNav from "@/components/PrimaryNav";
const {UNIT_CONVERSION, INFO} = require(process.env.PATH_SITE)
Vue.component('icon', Icon);
Vue.component('primary-nav', PrimaryNav);

Vue.mixin({
  computed: {
    site() {
      return {
        domain: INFO.domain[this.$i18n.locale],
        name: INFO.name[this.$i18n.locale],
        tagline: INFO.tagline[this.$i18n.locale],
        desc: INFO.desc[this.$i18n.locale],
        unitObject: UNIT_CONVERSION,
        base: INFO.base,
        testRanges: INFO.testRanges
      }
    },
    page() {
      let title = INFO.name[this.$i18n.locale]
      let desc = INFO.desc[this.$i18n.locale]
      let is_home = !this.$route.params.cvt;
      let is_404 = false;
      let is_converter = false;
      let is_conversion = false;
      const parsed = []
      if (this.$route.params.cvt) {
        const available_units = Object.keys(UNIT_CONVERSION)
        const test = this.$route.params.cvt.split("-to-")
        is_404 = test.length > 2
        for (let elm of test) {
          const numb = elm.match(/\d*\.?\d*/) ? elm.match(/\d*\.?\d*/)[0] : null
          const unit = elm.replace(numb, "")
            .replace("-converter", "")
            .replace("-conversion", "")
          if (!available_units.includes(unit)) {
            is_404 = true
            title = this.$t('404.title')
            desc = this.$t('404.desc')
            break
          }
          parsed.push({
            numb, unit
          })
        }
        is_conversion = parsed.length === 2
        is_converter = parsed.length === 1
        if (is_converter) {
          title = this.$t('converter.title', [parsed[0].unit.toUpperCase()])
          desc = this.$t('converter.desc', [parsed[0].unit.toUpperCase()])
        }
        if (is_conversion) {
          let flag = "conversion"
          let first = `${parsed[0].unit.toUpperCase()}`
          if (!parsed[0].numb) {
            flag = "converter_2"
            is_converter = true
          } else {
            first = parsed[0].numb + first
          }

          title = this.$t(`${flag}.title`, [first, parsed[1].unit.toUpperCase()])
          desc = this.$t(`${flag}.desc`, [first, parsed[1].unit.toUpperCase()])
        }
      }
      return {
        is_home, is_converter, is_conversion, is_404, parsed, title, desc
      }
    }
  }
});
