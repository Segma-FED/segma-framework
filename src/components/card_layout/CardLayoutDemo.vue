<!--这里只是一个示范的例子，模板请复制Index.vue-->
<template>
    <div class="card-layout-demo">
        <adaptive-card v-for="(item,index) in cardData"
                       :key="index">
            <div class="box-content">{{item.label}}</div>
        </adaptive-card>
    </div>
</template>

<script>
import AdaptiveCard from './Index';

export default {
    name: 'CardLayoutDemo',
    components: { AdaptiveCard },
    data() {
        return {
            cardData: [
                { id: 1, label: 1 },
                { id: 2, label: 2 },
                { id: 3, label: 3 },
                { id: 1, label: 4 },
                { id: 2, label: 5 },
                { id: 3, label: 6 }
            ]
        };
    }
};
</script>

<style lang="less"
       scoped>
.card-layout-demo {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    box-sizing: border-box;

    .box-content {
        border: 1px solid gray;
    }
}
</style>
