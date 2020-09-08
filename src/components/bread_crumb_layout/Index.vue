<!--Index-->
<template>
    <div class="box-wrapper">
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ name: 'cardLayout' }">
                卡片布局
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                当前布局
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content-wrapper">
            content-area
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index'
    // components: {},
    // directives: {},
    // filters: {},
    // model: {},
    // props: [],
    // data() {},
    // computed: {},
    // watch: {},
    // mounted() {},
    // created() {},
    // activated() {},
    // beforeDestroy() {},
    // destroyed() {},
    // methods: {},
};
</script>

<style lang="less"
       scoped>
.box-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: hidden;

    .el-breadcrumb {
        padding-left: 20px;
        height: 52px;
        line-height: 52px;
        background: #ffffff;
    }

    .content-wrapper {
        height: calc(100% - 52px);
        overflow-y: auto;
    }

}
</style>
