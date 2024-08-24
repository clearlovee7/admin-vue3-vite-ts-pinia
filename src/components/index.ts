//@ts-ignore
import SvgIcon from './SvgIcon/index.vue';
import Category from './Category/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const components = { SvgIcon, Category };
export default {
    //@ts-ignore
    install(app) {
        Object.keys(components).forEach(key => {
            //@ts-ignore
            app.component(key, components[key]);
        });
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}
