import Vue from 'vue'
import { Button ,Aside,Container,Main,Header,Footer} from 'element-ui'

Vue.prototype.$ELEMENT = { size: "small", zIndex: 2000 };
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
