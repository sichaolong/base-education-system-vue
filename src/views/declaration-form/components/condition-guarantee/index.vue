<template>
  <el-form>
    <el-row>
      <div class="form-subtitle">
        <span>条件保障</span>
      </div>
    </el-row>

    <Tinymce ref="condition" v-model="form.content.html" />

    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item label="教师人数">
          <el-input v-model="form.info.numberOfTeacher"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="年度运行经费">
          <el-input v-model="form.info.annualOperatingExpenses"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="行政办公面积">
          <el-input
            v-model="form.info.administrativeOfficeSpace"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="教学资料档案室面积">
          <el-input
            v-model="form.info.areaOfTeachingMaterialsArchives"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="办公设施">
          <el-input v-model="form.info.officeFacilities"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Tinymce from "../tinymce-editor/index";
import { createTable } from "@/api/declaration-form/condition-guarantee/index";
import { updateTable } from "@/api/declaration-form/condition-guarantee/index";
import { fetchInfo } from '@/api/detail-page/condition-guarantee/index'
export default {
  props: {
    conditionGuaranteeID: {
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
              "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）专项经费&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）办公设施保障&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）办公面积&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（四）教学资料档案&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>",
          },
          info: {
            numberOfTeacher: "",
            annualOperatingExpenses: "",
            administrativeOfficeSpace: "",
            areaOfTeachingMaterialsArchives: "",
            officeFacilities: "",   
        },
      },
    };
  },
  watch:{
    conditionGuaranteeID: function(val,old) {
      this.getFormInfo()
    }
  },
  methods: {
    async createConditionGuaranteeInfo() {
      this.getHtml();
      await createTable(this.form)
        .then((result) => {
          

          this.$emit("getConditionGuaranteeID", result.data.conditionGuaranteeID);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHtml() {
      //this.form.content.html = tinymce.editors[7].getContent();
    },

    //获取要修改的信息
    getFormInfo() {
      fetchInfo(this.conditionGuaranteeID).then((result) => {
            const data = result.data;
            for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          this.$refs.condition.setContent(this.form.content.html)
        })
    },

    //更新表中信息
    async updateFormInfo() { 
      
      this.getHtml();
      await updateTable(this.conditionGuaranteeID,this.form)
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