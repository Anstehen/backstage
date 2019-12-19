<template>
    <div class="app-container">11111111111111111111111</div>
</template>
 
<script>
    export default {
        props: ["test"],
        //注册组件
        components:{
            
        },
        data() {
            return {
                //模型对象id
                modelObjId: null,
            }
        },
        created() {
            
        },
        methods: {
            init: function(){
                debugger
                alert(this.modelObjId);
 
                //与父组件通信
                alert(this.test);
                this.$emit("loadingIndex");
            },
        }
    };
</script>
 
<style scoped>
 
</style>