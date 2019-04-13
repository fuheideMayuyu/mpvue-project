const outputFile = require('output-file')
const argv = require('minimist')(process.argv.slice(2))
var type = argv.type, name = argv.name, isAddPage = type === 'page'

var vueContent = `
<template>
  <view></view>
</template>

<script>
  export default {
      data() {
          return {

          }
      },
      computed: {},
      components: {},
      mounted () {},
      onLoad (options) {},
      onShow () {},
      onUnload () {
      },
      methods: {},
      onPullDownRefresh () {},
      // 上拉加载
      onReachBottom () {}
      
  }
</script>

<style lang="scss">

</style>
`

var componentContent = `
<template>
  <view class="">
    
  </view>
</template>

<script>
  export default {
      data() {
          return {

          }
      },
      props: {},
      methods: {}
  }
</script>

<style lang="scss">

</style>

`

var jsContent = `
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {

}
`

var jsonContent = ``
var pageContenet = {
    vue: vueContent,
    js: jsContent,
    json: jsonContent
}
if(isAddPage) {
    Object.entries(pageContenet).forEach(key => {
        if(key[0] === 'vue') {
            outputFile(`src/pages/${name}/index.${key[0]}`, key[1])
        } else {
            outputFile(`src/pages/${name}/main.${key[0]}`, key[1])
        }
    })
} else {
    outputFile(`src/components/${name}.vue`, componentContent)
}

