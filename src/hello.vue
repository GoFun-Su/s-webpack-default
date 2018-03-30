<style scoped>
   h1{
      background: url("./zhengce.png");
   }
   .active{
    border:none;
   }
</style>

<template>
    <div class="view">
         <h1>你23好c566c</h1>
         <p v-html="getDate('2017-4-6 2:12:45')"></p>
         <input v-bind:class="{ active: isActive }" value="输入内容">
         <button @click="sure">确定</button>
       <router-link to="second">Home</router-link>
    </div>
</template>

<script>
import './index.css'
import './index.less'
import moment from 'moment'
export default {
    name:'hello',
    components: {
       
    },
    data() {
        return {
            isActive:false
        }
    },
    computed: {
        
    },
    ready: function () {
        
    },
    methods: {
       sure:function(){
        this.isActive = true;
       },
       getDate:function(str){
            return moment(str).format("YYYY-MM-DD");
       }
    }
}

</script>
