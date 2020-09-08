<!--表单表格镶嵌模板-->
<template>
    <div class="table-form-wrapper">
        <!--表单区域-->
        <el-form ref="ruleForm"
                 :model="ruleForm"
                 status-icon
                 :rules="rules"
                 label-width="100px">
            <el-form-item label="密码"
                          prop="pass">
                <el-input v-model="ruleForm.pass"
                          type="password"
                          size="small"
                          autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <!--表单里嵌入表格-->
        <form-table></form-table>
    </div>
</template>

<script>
import FormTable from './FormTable';

export default {
    name: 'Index',
    components: { FormTable },
    data() {
        return {
            ruleForm: {
                pass: ''
            },
            rules: {
                pass: [
                    { validator: this.validatePass, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        validatePass(rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        }
    }
};
</script>

<style lang="less"
       scoped>
.table-form-wrapper {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}
</style>
