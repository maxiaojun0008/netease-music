<template>
    <div class="login-wrapper">
      <div class="logo">
        <img src='./logo.jpeg' alt="" width="100%" >
      </div>
      <div class="login-content">
        <div class="input-container">
          <label for="username" class="text">用户名</label>
          <input type="text" v-model="username" @blur="empty" @change="empty">
          <span class="error" v-show="userError">{{userError}}</span>
        </div>
        <div class="input-container">
          <label for="password" class="text">密码</label>
          <input type="password" v-model="psd" @blur="checkPsd">
          <span class="error" v-show="psdError">{{psdError}}</span>
        </div>
        <button class="ripple" @click="login">登录</button>
        <div>{{playing}}</div>
      </div>
    </div>
</template>

<script>
  import {login} from "../../api/api";
  import {mapGetters,mapMutations} from 'vuex'
  export default {
      data(){
        return {
          username:"",
          psd:"",
          userError:"",
          psdError:""
        }
      },
      computed:{
        ...mapGetters(['playing','singer'])
      },
      methods:{
        empty(){
          if(this.username) {
            this.userError = ''
            return
          } else {
            this.userError = '用户名不能为空'
          }
        },
        checkPsd(){
          if (this.psd) {
            this.psdError = ''
            return
          } else {
            this.psdError = '密码不能为空'
          }
        },
        login(){
          this.empty()
          this.setPlayingState(!this.playing)
          this.checkPsd()
          if (!this.username || !this.psd) {
            return
          } else {
            this._login(this.username,this.psd)
          }
        },
        _login(username,psd){
          login(username,psd).then(res=>{
              if(res.code === 200) {
                this.setUserInfo(res.profile)
                this.$router.push('index')
              }
            })
        },
        ...mapMutations({
           setPlayingState:'SET_PLAYING_STATE',
          setUserInfo:'SET_USERINFO'
        })

      },
      watch:{
        username(){
          this.empty()
        },
        psd(){
          this.checkPsd()
        }
      }

    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .login-wrapper
    background : #fff
    position: absolute
    top: 0
    bottom: 0
    box-sizing: border-box
    width: 100%
    .title
      margin-top: 50px
      font-size :24px
      color: #fff
      text-align :center
    .login-content
      padding-left: 30px
      margin-top: 50px
      font-size :14px
      .input-container
        margin-bottom: 15px
        input
          height :20px
          line-height :30px
          display inline-block
          vertical-align: top
          outline :none
          border:1px solid #c60023
          padding :5px
          margin-left:10px
          border-radius :10px
          box-shadow :2px 2px 2px #c60023
        .text
          display : inline-block
          color :#c60023
          text-align: right
          line-height :30px
          width: 50px
        .error
          color: #c60023
          margin-left: 5px


      button
        border:1px solid #c60023
        outline :none
        box-shadow :1px 1px 1px #c60023
        text-align :center
        width :150px
        height: 30px
        line-height: 30px
        border-radius :10px
        transform :translateX(50%)
        margin-top: 15px
        background :#fff
        color :#c60023
        font-size :18px





</style>
