<!--表格常用布局：顶部包含搜索区域、新增按钮；下部分是table区域、翻页器区域-->
<template>
    <div class="table-wrapper">
        <!--顶部区域：包含搜索框，新增按钮-->
        <search-wrapper id="searchWrapper"
                        :space="5"
                        :gap="20">
            <template v-slot:button>
                <el-button type="primary"
                           size="small">新增
                </el-button>
            </template>
            <search-list-item width="310"
                              label="任务名称：">
                <el-input v-model.trim="query.taskName"
                          size="small"
                          suffix-icon="el-icon-search"
                          maxlength="10"
                          clearable
                          placeholder="请输入内容">
                </el-input>
            </search-list-item>
            <search-list-item width="230"
                              label="状态：">
                <el-select v-model="query.enumState"
                           size="small"
                           clearable
                           @change="getTableList">
                    <el-option v-for="item in stateType"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </search-list-item>
            <search-list-item width="440"
                              label="起止时间：">
                <el-date-picker v-model="time"
                                type="datetimerange"
                                size="small"
                                clearable
                                prefix-icon="iconfont se-icon-date"
                                range-separator="~"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions"
                                @blur="getTableList">
                </el-date-picker>
            </search-list-item>
        </search-wrapper>
        <!--表格布局-->
        <div class="table-main-content">
            <adaptive-table :page-size.sync="query.pageSize">
                <el-table :data="tableData"
                          tooltip-effect="dark"
                          @sort-change="headerClick">
                    <el-table-column
                        prop="date"
                        sortable="custom"
                        show-overflow-tooltip
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址">
                    </el-table-column>
                    <el-table-column label="操作"
                                     fixed="right"
                                     width="230">
                        <template v-slot="scope">
                            <table-action-button :scope="scope"
                                                 :actions="actions"></table-action-button>
                        </template>
                    </el-table-column>
                    <template v-slot:empty>
                        <table-data-empty tip="无数据，请新增"
                                          :isDataEmpty="isDataEmpty">
                        </table-data-empty>
                    </template>
                </el-table>
                <!--翻页器-->
                <template v-slot:pager>
                    <el-pagination :page-size.sync="query.pageSize"
                                   :current-page="query.currPage"
                                   :total="total"
                                   :hide-on-single-page="true"
                                   layout="total,slot,prev, pager, next,jumper"
                                   background=""
                                   @current-change="currentChange">
                        <span class="pager-slot">
                            每页{{query.pageSize}}条
                        </span>
                    </el-pagination>
                </template>
            </adaptive-table>
        </div>
    </div>
</template>

<script>
import SearchWrapper from './SearchWrapper';
import SearchListItem from './SearchListItem';
import TableActionButton from './TableActionButton';
import { tablePageSize } from './util';
import TableDataEmpty from './table_data_empty/TableDataEmpty';
import AdaptiveTable from './AdaptiveTable';

export default {
    name: 'TableLayout',
    components: { AdaptiveTable, TableDataEmpty, TableActionButton, SearchListItem, SearchWrapper },
    data() {
        return {
            query: {
                currPage: 1,
                pageSize: 8,
                deployState: 1,
                taskName: null,
                enumState: null,
                startTime: null,
                endTime: null
            },
            time: [],
            total: 20,
            tableData: [],
            isDataEmpty: true
        };
    },
    computed: {
        stateType() {
            return [
                {
                    label: '成功',
                    value: 'SUCCEEDED'
                },
                {
                    label: '运行中',
                    value: 'RUNNING'
                },
                {
                    label: '暂停',
                    value: 'SUSPENDED'
                },
                {
                    label: '失败',
                    value: 'FAILED'
                }
            ];
        },
        // 可选时间限定
        pickerOptions() {
            return {
                disabledDate(time) {
                    return time.getTime() > new Date();
                }
            };
        },
        // 操作
        actions() {
            return [
                {
                    title: '操作A',
                    type: 'primary'
                    // handler: ({ row }) => this.schedule(row)
                },
                {
                    title: '操作B',
                    type: 'primary'
                    // handler: ({ row }) => this.taskInstance(row)
                },
                {
                    title: '操作C',
                    type: 'primary'
                    // handler: ({ row }) => this.editSchedule(row)
                }
            ];
        }
    },
    watch: {
        time: {
            handler(val) {
                if (val === null) {
                    this.$set(this.query, 'startTime', null);
                    this.$set(this.query, 'endTime', null);
                    this.getTableList();
                } else {
                    // this.$set(this.query, 'startTime', dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss'));
                    // this.$set(this.query, 'endTime', dayjs(val[1]).format('YYYY-MM-DD HH:mm:ss'));
                }
            },
            deep: true
        }
    },
    mounted() {
        window.addEventListener('resize', this.resize);
    },
    // created() {},
    // activated() {},
    // beforeDestroy() {},
    // destroyed() {},
    methods: {
        /**
         * 判断是初始化为无数据还是搜索后无数据
         */
        judgeIsDataEmpty() {
            let { taskName } = this.query;
            this.isDataEmpty = !this.tableData.length && !taskName;
        },
        currentChange() {
            // todo
        },
        headerClick() {
            // todo
        },
        getTableList() {

        },
        resize() {
            let topHeight = document.getElementById('searchWrapper').offsetHeight + 150;
            this.query.pageSize = tablePageSize(topHeight, 73, 48);
            this.getTableList();
        }
    }
};
</script>

<style lang="less"
       scoped>
.table-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #f5f6fa;
    padding: 20px 20px 0 20px;
    overflow: hidden;

    /deep/ .search-wrapper {
        margin-bottom: 7px;
    }

    /deep/ .table-main-content {
        overflow: auto;
        box-sizing: border-box;
        border-radius: 4px 4px 0 0;
        padding: 20px 20px 0 20px;
        height: 100%;
        background-color: #ffffff;

        .table-empty {
            margin-top: 40px;
        }

        .el-pagination {
            display: flex;
            margin-top: 20px;
            justify-content: flex-end;
        }

        .el-table::before {
            height: 0;
        }

        .el-table__fixed-right::before {
            height: 0;
        }
    }
}
</style>
<style lang="less">
.table-wrapper {
    .el-table__empty-block .el-table__empty-text {
        padding: 0;
        background: none;
    }
}
</style>
