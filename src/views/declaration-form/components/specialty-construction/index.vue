<template>
  <el-form>
    <el-row>
      <div class="form-subtitle">
        <span>专业建设</span>
      </div>
    </el-row>

    <Tinymce ref="specialty"  v-model="form.content.html" />

    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="专业名称">
          <el-input v-model="form.info.nameOfSpecialty"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="专业认证">
          <el-input v-model="form.info.certificationOfSpecialty"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="专业评估">
          <el-input v-model="form.info.evaluationOfSpecialty"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="获得特色、综合改革试点专业等称号">
          <el-input v-model="form.info.features"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Tinymce from "../tinymce-editor/index";
import { createTable } from "@/api/declaration-form/specialty-construction/index";
import { updateTable } from "@/api/declaration-form/specialty-construction/index";
import { fetchInfo } from '@/api/detail-page/specialty-construction/index'
export default {
  props: {
    specialtyConstructionID: {
      type: String
    }
  },
  components: {
    Tinymce,
  },
  data() {
    return {
      tempData: {},
      memberDialogFormVisible: false,
      editStatus: false,
      editIndex: -1,
      form: {
        info: 
          {
            nameOfSpecialty: "",
            certificationOfSpecialty: "",
            evaluationOfSpecialty: "",
            features: "",
          },
        content: {
          html:
            "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）专业建设规划&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）人才培养方案修订落实&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）专业教学质量波准执行&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（四）专业认证和专业评估&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>",
        },
      },
    };
  },
  watch: {
    specialtyConstructionID: function(val,old) {
      this.getFormInfo()
    }
  },
  methods: {
    async createSpecialtyConstructionInfo() {
       this.getHtml();
      await createTable(this.form)
        .then((result) => {
          //console.log(this.form.data)
          //console.log(result)
          this.$emit(
            "getSpecialtyConstructionID",
            result.data.specialtyConstructionID
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHtml() {
      //this.form.content.html = tinymce.editors[5].getContent();
    },

    //获取要修改的信息
    getFormInfo() {
      fetchInfo(this.specialtyConstructionID).then((result) => {
            const data = result.data;
            for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          this.$refs.specialty.setContent(this.form.content.html)
        })
    },

    //更新表中信息
    async updateFormInfo() {
      this.getHtml();
      await updateTable(this.specialtyConstructionID,this.form)
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