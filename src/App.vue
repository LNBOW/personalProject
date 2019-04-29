<template>
  <div id="app">
    <div class="aside" :class="showAside?'show-aside':'hide-aside'">
      <div class="aside-btn" :class="showAside?'right-btn':'left-btn'" v-on:click="showHideAside()"></div>
      <div class="top">
        <img src="./assets/img/head.jpg">
        <h5>lnbow</h5>
        <p>昵称：龙宝，前端，兴趣：游戏</p>
        <!-- <p>嘀嘀嘀嘀嘀嘀嘀嘀嘀</p> -->
      </div>
      <div class="middle">
        <p>博文分类</p>
        <ul>
          <li v-for="item in blogTypes" :key="item.id" v-on:click="checkBlogType(item.id)" :class="currentBlogType == item.id?'active':''">{{item.name}}</li>
        </ul>
      </div>
      <div class="bottom">
        <p>+加关注</p>
        <a href="https://github.com/LNBOW"></a>
      </div>
      <!-- <div class="footer">
        <ul>
          <li></li>
        </ul>
      </div> -->
    </div>
    <canvas v-show="showBgCanvas" id="contentCanvas" style="position:absolute;width:100%;height:100%;background:#fff;z-index:-1;top:0;left:0;"></canvas>
    <router-view class="router-view" :class="showAside?'show-left-view':'show-all-view'"></router-view>
  </div>
</template>

<script>
import bgCanvas from './assets/libs/bgCanvas.js'
export default {
  name: 'App',
  data () {
    return {
      blogTypes: [
        {id: 0, name: '技术随笔'},
        {id: 1, name: '爬坑日记'},
        {id: 2, name: '杂项'},
        {id: 3, name: '其他'}
      ],
      currentBlogType: 0,
      showAside: false,
      showBgCanvas: true
    }
  },
  mounted () {
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
      if (window.location.href.indexOf('?mobile') < 0) {
        try {
          if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.showBgCanvas = false
          } else if (/iPad/i.test(navigator.userAgent)) {
          } else {
            this.showBgCanvas = false
          }
        } catch (e) {}
      }
    }
    if (this.showBgCanvas) {
      bgCanvas('contentCanvas')
    }
  },
  methods: {
    checkBlogType (id) {
      this.showAside = false
      this.currentBlogType = id
      this.$router.push({
        path: `/main/${id}`
      })
    },
    showHideAside () {
      this.showAside = !this.showAside
    }
  }
}
</script>

<style>
*{
  margin: 0;
  background-color: transparent;
  box-sizing: border-box;
}
html, body{
  height: 100%;
}
#app{
  height: 100%;
  overflow: hidden;
}
@media screen and (max-width: 600px){
.content #contentCanvas{
  display: none;
  }
}
.aside{
  width: 320px;
  position: absolute;
  top: 0;
  height: 100%;
  box-shadow: 3px 0 5px #eee;
  background-color: rgba(255, 255, 255, .6);
  padding: 20px 40px 20px 20px;
  transition: .5s;
  z-index: 1;
}
.show-aside{
  left:0;
}
.hide-aside{
  left: -280px;
}
.aside .aside-btn{
  height: 100%;
  width: 40px;
  position: absolute;
  right: 0;
  top: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 30px 30px;
  cursor: pointer;
}
.aside .right-btn{
  background-image: url('./assets/img/jiantou_zuo.svg');
}
.aside .left-btn{
  background-image: url('./assets/img/jiantou.svg');
}
.aside .top{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
}
.aside .top img {
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin: 0 auto;
}
.aside .top h5{
  font-size: 20px;
  margin: 15px 0 10px;
}
.aside .top p{
  width: 100%;
  height: 60px;
  background-color: rgba(238, 238, 238, .6);
  border-radius: 5px;
  padding: 10px;
  line-height: 16px;
  color: #666;
  font-size: 14px;
}
.aside .middle{
  padding-bottom: 30px;
}
.aside .middle p{
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  border-bottom: 1px #ddd solid;
  padding-left: 10px;
}
.aside .middle ul{
  padding: 14px 0;
  padding-left: 10px;
}
.aside .middle ul li{
  list-style: none;
  font-size: 14px;
  line-height: 32px;
  cursor: pointer;
  background-image: url('./assets/img/web-icon-.svg');
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: left center;
  padding-left: 20px;
}
.aside .middle ul .active{
  color: #d00;
}
.aside .middle ul li:hover{
  color: #d00;
}
.aside .bottom{
  padding-bottom: 30px;
}
.aside .bottom p{
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  border-bottom: 1px #ddd solid;
  padding-left: 10px;
}
.aside .bottom a{
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-image: url('./assets/img/GitHub.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 10px;
}
.router-view{
  transition: .5s;
}
.show-left-view{
  margin-left:  325px;
  width: -webkit-calc(100% - 325px);
  width: -moz-calc(100% - 325px);
  width: calc(100% - 325px);
}
.show-all-view{
  margin-left: 45px;
  width: -webkit-calc(100% - 45px);
  width: -moz-calc(100% - 45px);
  width: calc(100% - 45px);
}
</style>
