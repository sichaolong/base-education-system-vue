<template>
  <div>
    <el-form>
      <el-row>
        <div class="form-subtitle">
          <span>队伍建设</span>
        </div>
      </el-row>

      <Tinymce
        ref="team"
        v-model="form.content.html"
      />

      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(DuiWuJianShe.dialogVisible)"
        >添加</el-button>
      </div>
      <el-table :data="DuiWuJianShe.tables[0]" empty-text="暂无数据">
        <el-table-column
          prop="nameOfNewTeacher"
          label="新入职教师姓名"
        />
        <el-table-column
          prop="trainingTime"
          label="培训时间（学时）"
        />
        <el-table-column
          prop="trainingPlace"
          label="培训地点"
        />
        <el-table-column
          prop="trainingInstitution"
          label="培训单位"
        />
        <el-table-column prop="supervisor" label="指导教师" />
        <el-table-column
          prop="professionalTitle"
          label="职称"
        />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-row
              style="margin-bottom: 1px"
            ><el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="
                handleClickEdit(
                  DuiWuJianShe,
                  scope.row,
                  scope.$index
                )
              "
            /></el-row>
            <el-row
              style="margin-top: 1px"
            ><el-button
              icon="el-icon-delete"
              type="danger"
              size="small"
              @click="
                handleClickDelete(DuiWuJianShe, scope.$index)
              "
            /></el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-dialog
      title="新入职教师信息"
      :visible.sync="DuiWuJianShe.dialogVisible[0]"
    >
      <el-form :model="tempData">
        <el-form-item label="新入职教师姓名">
          <el-input v-model="tempData.nameOfNewTeacher" />
        </el-form-item>
        <el-form-item label="培训时间（学时）">
          <el-input v-model="tempData.trainingTime" />
        </el-form-item>
        <el-form-item label="培训地点">
          <el-input v-model="tempData.trainingPlace" />
        </el-form-item>
        <el-form-item label="培训单位">
          <el-input v-model="tempData.trainingInstitution" />
        </el-form-item>
        <el-form-item label="指导教师">
          <el-input v-model="tempData.supervisor" />
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="tempData.professionalTitle" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button
            @click="handleCancel(DuiWuJianShe.dialogVisible)"
          >取消</el-button>
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(DuiWuJianShe)"
          >添加</el-button>
          <el-button
            v-else
            type="primary"
            @click="handleSave(DuiWuJianShe)"
          >保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '../tinymce-editor/index'
import Vue from 'vue'
import { createTable } from '@/api/declaration-form/team-building/index'
import { updateTable } from '@/api/declaration-form/team-building/index'
import { fetchInfo } from '@/api/detail-page/team-building/index'
export default {
  props: {
    teamBuildingID: {
      type:String
    }
  },
  components: {
    Tinymce
  },
  data() {
    return {
      editStatus: false,
      tempData: {},
      form: {
        content: {
          html: "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）师德建设&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）团队结构&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）教师传帮带机制&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（四）双师型教师建设&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>"
        },
        newTeachers: [
          {
            nameOfNewTeacher: '',
            trainingTime: '',
            trainingPlace: '',
            trainingInstitution: '',
            supervisor: '',
            professionalTitle: ''
          }
        ]
      },
      DuiWuJianShe: {
        tables: [[]],
        dialogVisible: [false]
      }
    }
  },
  watch: {
    teamBuildingID: function(val,old){
      this.getFormInfo()
    }
  },
  methods: {
    handleClickAdd(visible, index = 0) {
      // visible[index] = true
      this.tempData = {}
      this.editStatus = false
      Vue.set(visible, index, true)
    },
    handleAdd({ tables, dialogVisible }, index = 0) {
      tables[index].push(this.tempData)
      dialogVisible[index] = false
    },
    handleSave({ tables, dialogVisible }, index = 0) {
      Vue.set(tables[index], this.editIndex, this.tempData)
      dialogVisible[index] = false
    },
    handleCancel(visible, index = 0) {
      this.tempData = {}
      visible[index] = false
    },
    handleClickEdit({ dialogVisible }, row, rowInd, index = 0) {
      const temp = _.cloneDeep(row)
      this.tempData = temp
      this.editIndex = rowInd
      this.editStatus = true
      dialogVisible[index] = true
    },
    handleClickDelete({ tables }, rowInd, index = 0) {
      tables[index].splice(rowInd, 1)
    },
    async createTeamInfo() {
       this.getHtml()
      await createTable(this.form)
        .then((result) => {
          console.log(this.form)
          this.$emit('getTeamBuildingID', result.data.teamBuildingID)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //获取富文本编辑器内容和对象数组赋值
    getHtml() {
      //this.form.content.html = tinymce.editors[1].getContent()
      this.form.newTeachers = undefined
      this.form.newTeachers = new Array()
      for (let i = 0; i < this.DuiWuJianShe.tables[0].length; i++) {
        const item = {}
        item['nameOfNewTeacher'] = this.DuiWuJianShe.tables[0][
          i
        ].nameOfNewTeacher
        item['trainingTime'] = this.DuiWuJianShe.tables[0][
          i
        ].trainingTime
        item['trainingPlace'] = this.DuiWuJianShe.tables[0][
          i
        ].trainingPlace
        item['trainingInstitution'] = this.DuiWuJianShe.tables[0][
          i
        ].trainingInstitution
        item['supervisor'] = this.DuiWuJianShe.tables[0][
          i
        ].supervisor
        item['professionalTitle'] = this.DuiWuJianShe.tables[0][
          i
        ].professionalTitle
        this.form.newTeachers[i] = item
      }
    },
     //获取要修改的内容
    getFormInfo() {
        fetchInfo(this.teamBuildingID).then((result) => {
            //console.log(result)
            const data = result.data;
            for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          this.$refs.team.setContent(this.form.content.html)
          for (let i = 0; i < this.form.newTeachers.length; i++) {
          const item = {}
          item['nameOfNewTeacher'] = this.form.newTeachers[
            i
          ].nameOfNewTeacher
          item['trainingTime'] = this.form.newTeachers[
            i
          ].trainingTime
          item['trainingPlace'] = this.form.newTeachers[
            i
          ].trainingPlace
          item['trainingInstitution'] = this.form.newTeachers[
            i
          ].trainingInstitution
         item['supervisor'] = this.form.newTeachers[
           i
          ].supervisor
          item['professionalTitle'] = this.form.newTeachers[
            i
          ].professionalTitle
          Vue.set(this.DuiWuJianShe.tables[0],i,item)
          }
        })
    },

    //更新表中内容
    async updateFormInfo() {
     this.getHtml()
      await updateTable(this.teamBuildingID,this.form)
        .then((result) => {
         console.log(this.form)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
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
