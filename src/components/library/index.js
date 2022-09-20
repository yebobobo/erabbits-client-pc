import defaultImg from '@/assets/images/200.png'

const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    importFn.keys(app).forEach(path => {
      // 导入组件
      const component = importFn(path).default
      // 进行注册
      app.component(component.name, component)

      // 定义指令
      defineDirective(app)
    })
  }
}

// 定义指令
const defineDirective = (app) => {
  // 1.图片懒加载指令 v-lazy
  app.directive('lazy', {
    // vue2 监听使用指令的DOM是否创建好 钩子函数：inserted
    // vue3 的指令拥有的钩子函数和组件一样，使用指令的DOM是否创建好，钩子函数：mounted
    mounted (el, binding) {
      // 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 3.把指令的值设置给el的src属性 binding.value 就是指令的值
          // 4.处理图片加载失败 error 图片加载失败的事件 load图片加载成功
          el.onerror = () => {
            // 加载失败，设置默认图
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
