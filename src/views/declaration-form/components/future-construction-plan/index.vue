<template>
  <el-form>
    <el-row>
      <div class="form-subtitle">
        <span>今后建设计划</span>
      </div>
    </el-row>

    <Tinymce ref="future"  v-model="form.content.html" />
  </el-form>
</template>

<script>
import Tinymce from "../tinymce-editor/index";
import { createTable } from "@/api/declaration-form/future-construction-plan/index";
import { updateTable } from "@/api/declaration-form/future-construction-plan/index";
import { fetchInfo } from '@/api/detail-page/future-construction-plan/index'
export default {
  props: {
    futureConstructionPlanID: {
      type:String
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
            "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）指导思路&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）基本思路&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）建设目标&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（四）专业建设内容&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>",
        },
      },
    };
  },
  watch: {
    futureConstructionPlanID:function(val,old) {
      this.getFormInfo()
    }
  },
  methods: {
    async createFutureInfo() {
      this.getHtml();
      await createTable(this.form)
        .then((result) => {
          //console.log(this.form.data)
          this.$emit(
            "getFutureConstructionPlanID",
            result.data.futureConstructionPlanID
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHtml() {
      //this.form.content.html = tinymce.editors[9].getContent();
    },

    //获取要修改的信息
    getFormInfo() {
      fetchInfo(this.futureConstructionPlanID).then((result) => {
            //console.log(result)
            const data = result.data;
            for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          this.$refs.future.setContent(this.form.content.html)
        })
    },

    //更新表中信息
    async updateFormInfo() {
      this.getHtml();
      await updateTable(this.futureConstructionPlanID,this.form)
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