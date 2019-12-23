<template>
    <div class="assembly">
        <div class="choice_one">
            <span class="demonstration">性别：</span>
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
            <span class="demonstration">地区选择：</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label">
                <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-option-group>
            </el-select>
        </div>
        <div class="choice_two">
            <span class="demonstration">时间：</span>
            <el-date-picker
            v-model="value1"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份">
            </el-date-picker>
        </div>
    </div>
</template>
 
<script>
    export default {
        props: ["type"],
        //注册组件
        components:{
            
        },
        data() {
            return {
                //模型对象id
                radio: '1',
                options: [{
                label: '热门城市',
                options: [{
                    value: 'Shanghai',
                    label: '上海'
                }, {
                    value: 'Beijing',
                    label: '北京'
                }]
                }, {
                label: '城市名',
                options: [{
                    value: 'Chengdu',
                    label: '成都'
                }, {
                    value: 'Shenzhen',
                    label: '深圳'
                }, {
                    value: 'Guangzhou',
                    label: '广州'
                }, {
                    value: 'Dalian',
                    label: '大连'
                }],
                }],
                value:"",
                value1:""
            }
        },
        created() {
            
        },
        methods: {
            
        }
    };
</script>
 
<style lang="scss" scoped>
    .assembly{
        width: 100%;
        height: auto;
        .choice_two{
            margin-top: 12px;
        }
    }
</style>