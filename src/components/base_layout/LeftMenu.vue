<!--左侧菜单栏-->
<template>
    <div class="left-menu">
        <!--:expand-on-click-node="false" 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。-->
        <el-tree :data="menuList"
                 :props="defaultProps"
                 default-expand-all
                 @node-click="handleNodeClick">
            <template v-slot="{ node, data }">
                <div v-title="{ mode: 'overflow', text: `${data.label}`}" :class="['node-item',{ active: isMatch(data) }]">
                    <i v-if="data.icon"
                       :class="['iconfont', `${data.icon}`]"></i>
                    {{data.label}}
                </div>
            </template>
        </el-tree>
    </div>
</template>

<script>
import { positionRoute, getOffspringRouteNames } from './util';

export default {
    name: 'LeftMenu',
    data() {
        return {
            activeTreeId: ''
        };
    },
    computed: {
        defaultProps() {
            return {
                children: 'children',
                label: 'label'
            };
        },
        menuList() {
            return [
                {
                    label: 'baseLayout模板',
                    icon: 'se-icon-f-manuallocation',
                    children: [
                        {
                            label: 'tableFrom模板',
                            routeName: 'tableAndForm'
                        },
                        {
                            label: 'tableLayout模板',
                            routeName: 'tableLayout'
                        }
                    ]
                },
                {
                    label: 'listButtonLayout模板',
                    icon: 'se-icon-f-manuallocation',
                    routeName: 'listButtonLayout'
                },
                {
                    label: 'cardLayout模板',
                    icon: 'se-icon-f-manuallocation',
                    routeName: 'cardLayout'
                },
                {
                    label: 'breadCrumbLayout模板',
                    icon: 'se-icon-f-manuallocation',
                    routeName: 'breadCrumbLayout'
                }
            ];
        }
    },
    methods: {
        handleNodeClick(data) {
            let { routeName, $treeNodeId } = data;
            this.activeTreeId = $treeNodeId;
            if (routeName) {
                this.$router.push({ name: routeName }).catch(() => {
                    console.log('不允许重复跳转');
                });
            }
        },
        isMatch(data) {
            let { routeName } = data;
            if (!routeName) {
                return false;
            }
            let routes = this.$router.options.routes;
            let currentRoute = positionRoute(routeName, routes);
            return getOffspringRouteNames(currentRoute).includes(this.$route.name);
        }
    }
};
</script>

<style lang="less"
       scoped>
.left-menu {
    box-sizing: border-box;
    padding: 20px;
    width: 220px;
    height: 100%;

    /deep/ .el-tree-node__content {
        position: relative;
        height: 40px;
        line-height: 40px;

        &:hover {
            color: rgba(34, 91, 246, 1);
            background: rgba(240, 246, 255, 1);
        }
    }

    /deep/ .el-tree-node.is-current {
        > .el-tree-node__content {
            background: #ffffff;

            &:hover {
                color: rgba(34, 91, 246, 1);
                background: rgba(240, 246, 255, 1);
            }
        }
    }

    .node-item {
        position: relative;
        border-radius: 4px;
        width: 180px;
        font-size: 14px;
        text-align: left;
        color: rgba(0, 0, 0, 0.65);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover, &.active {
            color: rgba(34, 91, 246, 1);
        }
    }
}
</style>
