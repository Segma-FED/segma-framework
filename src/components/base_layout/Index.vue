<!-- 基本布局：顶部标题栏，左边导航，右边内容 -->
<template>
    <div class="layout-default">
        <!--顶部-->
        <base-header></base-header>
        <!--内容区域-->
        <div class="main-wrapper has-nav">
            <div :class="['left-wrapper', isCollapse ? 'is-collapse' : 'no-collapse']">
                <div class="collapse-btn"
                     @click="isCollapse = !isCollapse">
                    <img src="../../assets/image/open_memu_btn.png"
                         alt="">
                </div>
                <!--导航-->
                <div class="left-content">
                    <left-menu></left-menu>
                </div>
            </div>
            <!--主要内容区域-->
            <div :class="['content-wrapper', {'is-collapse': isCollapse}]">
                <transition
                    name="fade-transform"
                    mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import BaseHeader from './BaseHeader';
import LeftMenu from './LeftMenu';

export default {
    name: 'DefaultLayout',
    components: {
        BaseHeader,
        LeftMenu
    },
    data() {
        return {
            isCollapse: false
        };
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler(val) {
                // 解决认证后的回调地址的额外参数问题
                let { state, expires_in, ...query } = val.query;
                if (state && expires_in) {
                    this.$router.push({
                        name: val.name,
                        query
                    });
                }
            }
        }
    }
};
</script>
<style lang="less"
       scoped>
@import '../../assets/css/scroll.less';

.layout-default {
    overflow-x: hidden;
    position: relative;
    width: 100%;
    height: 100%;

    .header {
        height: 60px;
        background: rgba(11, 26, 56, 1);
    }

    .main-wrapper {
        overflow-x: hidden;
        width: 100%;
        height: 100%;

        &.has-nav {
            height: calc(100% - 60px);
        }
    }

    .left-wrapper {
        float: left;
        position: relative;
        box-sizing: border-box;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        height: 100%;
        background: rgba(255, 255, 255, 1);

        .collapse-btn {
            position: absolute;
            top: 50%;
            right: 0;
            z-index: 10;
            width: 16px;
            height: 46px;
            cursor: pointer;
        }

        .left-content {
            overflow: auto;
            height: 100%;
            transition: width 0.2s;
            .scroll-bar(0);
        }

        &.no-collapse {
            .left-content {
                width: 220px;
            }

            .collapse-btn {
                transform: translateY(-50%);
            }
        }

        &.is-collapse {
            .left-content {
                width: 0;
            }

            .collapse-btn {
                transform: rotateY(180deg) translateX(-16px) translateY(-50%);
            }
        }
    }

    .content-wrapper {
        overflow-x: hidden;
        margin-left: 0;
        height: 100%;
        background: #ffffff;
        box-sizing: border-box;

        &.has-left {
            margin-left: 220px;
        }

        &.is-collapse {
            margin-left: 0;
        }
    }
}

.fade-transform-leave-active,.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>

