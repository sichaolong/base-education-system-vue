<template>
  <el-form>
    <el-row>
      <div class="form-subtitle">
        <span>规章制度建设</span>
      </div>
    </el-row>
    <Tinymce ref="rules" v-model="form.content.html" />
  </el-form>
</template>

<script>
import Tinymce from "../tinymce-editor/index";
import { createTable } from "@/api/declaration-form/rules-troops/index";
import { updateTable } from "@/api/declaration-form/rules-troops/index";
import { fetchInfoRule } from '@/api/detail-page/rules-troops/index'
export default {
  props: {
    ruleAndRegulationID:{
      type: String
    }
  },
  components: {
    Tinymce,
  },
  data() {
    return {
      form: {
        content: {
          html:
            "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）基本管理制度&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）发展目标&nbsp;&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）本学年年度计划</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>",
        },
      },
    };
  },
  watch: {
    ruleAndRegulationID:function(val,old){
      this.getFormInfo()
    }
  },
  methods: {
    async createRulesInfo() {
      this.getHtml();
      await createTable(this.form)
        .then((result) => {
          this.$emit("getRulesID", result.data.ruleAndRegulationID);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getHtml() {
      //this.form.content.html = tinymce.editors[0].getContent();
    },
    //获取要修改的信息内容
    getFormInfo() {
       fetchInfoRule(this.ruleAndRegulationID).then((result) => {
            const data = result.data;
            for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          this.$refs.rules.setContent(this.form.content.html)
        })
    },

    //更新表中内容
    async updateFormInfo() {
      this.getHtml();
      await updateTable(this.ruleAndRegulationID,this.form)
        .then((result) => {

        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.form-subtitle {
  font-size: 1.8rem;
  margin: 15px 0;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}
.el-table {
  font-size: 20px;
}
</style>