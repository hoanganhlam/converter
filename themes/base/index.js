import Vue from "vue";

import BaseLayout from "./Layout";
import BaseFooter from "./Footer";
import BaseHeader from "./Header";
import UnitForm from "@/themes/base/UnitForm";
import UnitSelector from "@/themes/base/UnitSelector";

Vue.component('base-layout', BaseLayout);
Vue.component('base-footer', BaseFooter);
Vue.component('base-header', BaseHeader);
Vue.component('unit-selector', UnitSelector);
Vue.component('unit-form', UnitForm);
