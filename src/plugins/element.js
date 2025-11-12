import Vue from 'vue'
import { Button ,Aside,Container,Main,Header,Footer,Input,Option,Select,Form,FormItem,Table,TableColumn ,Message,MessageBox} from 'element-ui'

// Vue.prototype.$ELEMENT = { size: "small", zIndex: 2000 };
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Input)
Vue.use(Option)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

