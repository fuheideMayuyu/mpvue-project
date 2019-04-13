<script>
import CommonReq from './common/js/commonRequest'

export default {
    data () {
      return {
        scene: null
      }
    },
    mounted () {
      this.login()

      // wx.checkSession({
      //   success () {
      //     console.log('登录未过期')
      //   },
      //   fail () {
      //     _this.login()
        // }
      // })

    },
    onLaunch: function (options) {
      this.scene = options.scene
      this.$store.commit('SCENE', options.scene)
    },
    onShow () {

    },
    onHide () {
    },
    methods: {
      login () {
        CommonReq.login().then(res => {})
      }
    }
}
</script>

<style>

</style>
