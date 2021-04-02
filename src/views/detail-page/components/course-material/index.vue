<template>
    <div>
      <el-form>
        <div class="form-header">
          <span>课程教材概述</span>
        </div>
        <Tinymce  value="form.content" v-model="form.content"/>
        <el-table :data="form.infoOnLine"  empty-text="暂无数据"><!--:data="form.part3.KeChengJiaoCaiGaiShu.tables[0]"-->
          <el-table-column prop="onlineCourseName" label="在线开放课程"></el-table-column>
          <el-table-column prop="platformSite" label="平台网址"></el-table-column>
          <el-table-column prop="chosenNumbers" label="选课人数"></el-table-column>
          <el-table-column prop="period" label="总课时"></el-table-column>
          <el-table-column prop="completionTime" :formatter="dateFormatFir" label="建成时间"></el-table-column>
          <el-table-column prop="level" label="校级/省级"></el-table-column>
        </el-table>
        <el-table :data="form.infoText"  empty-text="暂无数据"> <!--:data="form.part3.KeChengJiaoCaiGaiShu.tables[1]"-->
          <el-table-column prop="nameOfTeachingMaterial" label="规划教材名称"></el-table-column>
          <el-table-column prop="participatingEditor" label="主编/参编"></el-table-column><!--editorInChief这个也得显示(主编)-->
          <el-table-column prop="theNumberOfWordsInTheChapter" label="章节字数"></el-table-column>
          <el-table-column prop="yearOfPublication" :formatter="dateFormatSec" label="出版年"></el-table-column>
          <el-table-column prop="press" label="出版社"></el-table-column>
          <el-table-column prop="level" label="省级/国家级"></el-table-column>
        </el-table>
      </el-form>
    </div>
</template>

<script>
import Tinymce from '../tinymce-editor/index'
import { fetchInfo } from '@/api/detail-page/course-material/index'
import moment from 'moment'
export default {
    components: {
    Tinymce,
  },
    props: {
   header: {
     type: String,
     required: true
   },
    courseMaterialID: {
      type: String,
      required: true 
    }
  },
   data() {
    return {
      form: {
        infoOnLine:[],
        infoText: [],
        content: ''
      },
      
    }
  },
  watch: {
    courseMaterialID: function (n, o) {
      this.courseMaterialID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfo(this.courseMaterialID).then((result) => {
       // this.form = result.data;
        //this.info = result.data.info
        this.form.infoOnLine = result.data.onlineCourses
        this.form.infoText = result.data.textbooks
        this.form.content = result.data.content.html
        //console.log(result)

      }).catch((err) => {
        console.log(err)
      })
    },
     dateFormatFir:function(row,column){
        var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY-MM-DD")
    },
    dateFormatSec:function(row,column){
        var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY")
    }
  }
}

</script>
<style  lang="scss"  scoped>
.form-header {
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 10px;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}

.cell-content span {
  padding: 1px 10px;
  border-bottom: 1px solid #000000;
}

.section-content {
  margin-top: -20px;
  p {
    min-height: 110px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
}
</style>
