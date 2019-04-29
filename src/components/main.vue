<template>
  <div class="main">
    <header class="header">
      <h1>Lnbow Blog&nbsp;</h1>
      <p>&nbsp;{{blogTypes[blogType].name}}</p>
      <div class="headerCan">
        <canvas id="headerCanvas" style="width:400px;height:150px;position:absolute;top:-27px"></canvas>
      </div>
    </header>
    <div class="content">
      <ul>
        <li v-for="(item, index) in lists" :key="index" v-on:click="getDetail(index)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import headerCanvas from '../assets/libs/headerCanvas.js'
export default {
  name: 'Main',
  data () {
    return {
      blogType: this.$route.params.id ? this.$route.params.id : 0,
      blogTypes: [
        {id: 0, name: '技术随笔'},
        {id: 1, name: '爬坑日记'},
        {id: 2, name: '杂项'},
        {id: 3, name: '其他'}
      ],
      lists: []
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.blogType = this.$route.params.id
      this.lists = []
      headerCanvas(this.blogTypes[this.blogType].name, 'headerCanvas')
      for (let i = this.blogTypes[this.blogType].name.length; i > 0; i--) {
        this.lists.push(this.blogTypes[this.blogType].name[i - 1])
      }
    }
  },
  mounted () {
    headerCanvas(this.blogTypes[this.blogType].name, 'headerCanvas')
    for (let i = this.blogTypes[this.blogType].name.length; i > 0; i--) {
      this.lists.push(this.blogTypes[this.blogType].name[i - 1])
    }
  },
  methods: {
    getDetail (index) {
      this.$router.push({name: 'Detail', params: {blogType: this.blogType, id: index}})
    }
  },
  updated () {
  }
}
</script>

<style>
.main{
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}
.header{
  color: #444;
  border-bottom: 1px #ddd solid;
  background: rgba(255, 255, 255, 0);
  min-height: 100px;
  margin: 30px 0 10px 0;
  display: flex;
  position: relative;
}
.header h1{
  font-size: 50px;
  min-height: 60px;
  float: left;
  line-height: 70px;
  }
.header p{
  height: 60px;
  font-size: 20px;
  line-height: 70px;
  }
.header p::before{
  content: '|  ';
  line-height: 80px;
  }
@media screen and (max-width: 770px){
.header .headerCan {
  display: none;
  }
}
@media screen and (max-width: 600px){
.header p {
  display: none;
  }
}
.headerCan{
  flex: 1;
  height: 80px;
  display: flex;
  justify-content: space-around;
}
.content{
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}
.content ul{
  list-style: none;
  padding-left: 20px;
  transition: 1s all;
}
.content ul li{
  height: 60px;
  transition: .5s all;
  margin: 10px 0;
  padding: 0 10px;
  cursor: pointer;
  line-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content ul li:hover{
  background-color:rgba(210, 105, 30, .6);
  padding-left: 20px;
}
</style>
