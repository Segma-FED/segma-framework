<!--表格空数据-->
<template>
    <div class="table-empty">
        <!--无数据-->
        <img v-if="isDataEmpty"
             src="#">

        <!--无搜索结果-->
        <img v-else
             src="#">
        <p class="tip">
            {{tip}}
        </p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TableDataEmpty',
    // components: {},
    // directives: {},
    // filters: {},
    // model: {},
    props: {
        // 数据为空/搜索为空
        isDataEmpty: {
            type: Boolean,
            default: true
        },
        // 无数据
        tip: {
            type: String,
            default: ''
        },
        // 无搜索结果
        searchEmptyTip: {
            type: String,
            default: ''
        }
    }
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
.table-empty {
    line-height: 1;

    img {
        margin-bottom: 20px;
    }

    .tip {
        margin-bottom: 20px;
        color: rgba(170, 175, 181, 1);
    }
}
</style>
