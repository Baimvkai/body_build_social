import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);

// 类
class ValidForm {
    // 验证表单的方法
    valid(obj) {
        // 遍历传递过来的obj对象
        for (let key in obj) {
            // 验证正则 正则规则.test(字符串) 验证通过true，不通过false
            if (!obj[key].regExp.test(obj[key].value)) {
                // 表单验证不通过，显示吐司
                Toast(obj[key].errmsg)
                // 验证不通过，直接返回false
                return false
            };
        }
        // 表单验证通过
        return true;
    }
}

// 实例化对象，并且进行共享
export const validForm = new ValidForm(); 