import Vue from 'vue'
import App from './App.vue'

// 引入路由
import VueRouter from 'vue-router'
import router from '@/router/index'

// 引入仓库
import store from '@/store/index'

// 按需引入vant组件
import { 
  Button,
  Form,
  Field,
  Toast,
  Popup,
  Cell, 
  CellGroup,  
  Tabbar, 
  TabbarItem,
  Uploader, 
  Icon,
  NavBar,
  Search,
  DropdownMenu, 
  DropdownItem,
  Swipe,
  SwipeItem,
  Divider,
  Lazyload,
  Tab,
  Tabs,
  Rate,
  Loading,
  Empty,
  Popover,
  Dialog,
  ShareSheet,
  Collapse, 
  CollapseItem
} from 'vant'

// 引入全部样式(vant)
import 'vant/lib/index.less';

// 使用插件
Vue.use(VueRouter)

// 注册vant组件
Vue
.use(Button)
.use(Form)
.use(Field)
.use(Toast)
.use(Popup)
.use(Cell)
.use(CellGroup)
.use(Tabbar)
.use(TabbarItem)
.use(Uploader)
.use(Icon)
.use(NavBar)
.use(Search)
.use(DropdownMenu)
.use(DropdownItem)
.use(Swipe)
.use(SwipeItem)
.use(Divider)
.use(Lazyload)
.use(Tab)
.use(Tabs)
.use(Rate)
.use(Loading)
.use(Empty)
.use(Popover)
.use(Dialog)
.use(ShareSheet)
.use(Collapse)
.use(CollapseItem);


// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库
  store,
  //安装全局事件总线，$bus就是当前应用的vm
  beforeCreate() {
		Vue.prototype.$bus = this 
	},
}).$mount('#app')
