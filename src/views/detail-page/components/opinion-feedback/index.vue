<template>
  <el-card v-has="roles">
    <el-form>
      <el-row>
        <div class="form-header">
          <span>审核意见反馈</span>
        </div>
      </el-row>
      <!-- 根据当前用户的角色 判断是 院级审核通过 还是 校级审核通过 -->
      <el-form-item>
        <el-radio
          v-has="roles"
          v-model="status"
          v-if="roles.role == '院级管理员'"
          label="院级审核通过"
          >院级通过审核</el-radio
        >
        <el-radio
          v-has="roles"
          v-model="status"
          v-if="roles.role == '校级管理员'"
          label="校级审核通过"
          >校级通过审核</el-radio
        >
        <el-radio v-has="roles" v-model="status" label="返回修改"
          >返回修改</el-radio
        >
      </el-form-item>
      <Tinymce v-model="form.content.html" />
      <el-row type="flex" justify="center">
        <el-button v-has="roles" @click="back()">取消</el-button>
        <el-button v-has="roles" @click="submit()" type="primary"
          >确定</el-button
        >
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import Tinymce from "@/views/declaration-form/components/tinymce-editor/index";
import { fetchInfo } from "@/api/detail-page/opinion-feedback/index";
import { updateInfo } from "@/api/detail-page/opinion-feedback/index";
import store from "@/store";

export default {
  props: {
    header: {
      type: String,
      required: true,
    },
    opinionFeedbackID: {
      type: String,
      required: true,
    },
  },
  components: {
    Tinymce,
  },
  data() {
    return {
      roles: {
        jurisdictionRole: [],
        role: "",
      },
      form: {
        content: {
          html: "",
        },
      },
      status: "",
    };
  },
  watch: {
    opinionFeedbackID: function (n, o) {
      this.opinionFeedbackID = n;

      this.getInfo();
    },
  },
  created() {
    //this.getInfo()
    this.getRole();
  },
  methods: {
    //1. 获取当前用户角色和权限角色
    getRole() {
      this.roles.jurisdictionRole.push("院级管理员"),
        this.roles.jurisdictionRole.push("校级管理员"),
        (this.roles.role = store.getters.role);
    },

    //2. 返回审核表列表
    back() {
      this.$router.push({
        path: "/approval-page/approval-page",
      });
    },
    // 3. 数据回显
    getInfo() {
      fetchInfo(this.opinionFeedbackID)
        .then((result) => {
          this.form.content.html = result.data.content.html;
          //console.log(this.form.content)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 4.更新审核状态、反馈内容
    async submit() {
      this.getHtml();
      if (this.form.content.html === "")
        return this.$message.info("反馈意见不能为空");
      await this.$parent.$parent.updateForm();

      // 子组件：更新反馈内容
      this.updateTable();
      this.back();
    },

    //5. 更新 反馈表 内容
    updateTable() {
      updateInfo(this.opinionFeedbackID, this.form)
        .then((result) => {
          //console.log(this.form)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHtml() {
      this.form.content.html = tinymce.activeEditor.getContent();
      // 将status传给父组件
      this.$emit("getStatus", this.status);
    },
  },
};
</script>


<style lang="scss" scoped>
.form-header {
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 10px;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}
</style>