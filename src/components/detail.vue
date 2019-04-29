<template>
  <div class="detail">
    {{info.id}}:{{info.blogType}}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      info: {id: Number, blogType: String}
    }
  },
  mounted () {
    document.title = 'Lnbow Detail'
    console.log(this.$route.params)
    this.info.id = this.$route.params.id
    this.info.blogType = this.$route.params.blogType
    console.log(this.info)
  }
}
</script>

<style>
.detail{
  color: #000;
}
</style>
