<template>
<div>
  <el-row justify="end">
  <el-button round  @click="download">下载已选文件</el-button>
  </el-row>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
     @selection-change="handleSelectionChange">>
    <el-table-column
    type="selection"
    width="55">
  </el-table-column>
    <el-table-column
      fixed
      prop="f_id"
      label="文件编号"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="p_id"
      label="患者编号"
      width="100">
    </el-table-column>
    <el-table-column
    fixed
      prop="d_institution"
      label="科室"
      width="100">
    </el-table-column>
    <el-table-column
      prop="f_url"
      label="肺音文件"
      width="100">
     <template slot-scope="scope">
        <el-button type="text" @click="view(scope.row)" size="small">肺音文件</el-button>
     </template>
    </el-table-column>
    <el-table-column
      prop="descript"
      label="肺音类型"
      width="100"
      column-key="descript"
      :filters="[{ text: '干啰音', value: '干啰音' }, { text: '湿啰音', value: '湿啰音',value: '正常' }]"
      :filter-method="filterTag">
    </el-table-column>
    <el-table-column
      prop="f_date"
      label="采集时间"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="collect_site"
      label="采集部位"
      width="100">
    </el-table-column>
    <el-table-column
      prop="lung_type"
      label="诊断结果"
      width="100">
    </el-table-column>
    <el-table-column
      prop="d_id"
      label="采集医生编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="image"
      label="频谱图"
      width="100">
     <template slot-scope="scope">
        <el-button type="text" @click="show(scope.row)" size="small">查看频谱图</el-button>
     </template>
    </el-table-column>
    <el-table-column
      prop="ct_image"
      label="CT影像"
      width="100">
     <template slot-scope="scope">
        <el-button type="text" @click="s(scope.row)" size="small">查看CT影像</el-button>
     </template>
    </el-table-column>
    <el-table-column
      prop="ct_description"
      label="ct影像描述"
      width="100">
    </el-table-column>
  </el-table>
  <el-dialog title="频谱图" :visible.sync="imagevisible" >
      <template>
        <center>
          <el-image
            :src="i_src"
          ></el-image>
        </center>
      </template>
    </el-dialog>
    <el-dialog title="CT影像" :visible.sync="visible" >
      <template>
        <center>
          <el-image
            :src="ct_src"
          ></el-image>
        </center>
      </template>
    </el-dialog>
    <el-dialog title="录音播放" :visible.sync="dialogVisible" :before-close="stop">
      <template>
        <center>
          <audio
            :src="src"
            autoplay="autoplay"
            controls="controls"
            ref="audio"
          >Your browser does not support the audio element.</audio>
        </center>
      </template>
    </el-dialog>
    
  </div>
</template>

<script>
import axios from "axios";
import Api from "../http/api";
import JSZip from 'jszip'
import FileSaver from 'file-saver'
const getFile = url => {
 return new Promise((resolve, reject) => {
 axios({
  method:'get',
  url,
  responseType: 'arraybuffer'
 }).then(data => {
  resolve(data.data)
 }).catch(error => {
  reject(error.toString())
 })
 })
}
 
export default {
   name: "voicedata",
  data() {
  return {
      src: "",
      i_src:"",
      ct_src:"",
      descript:"",
      d_id:"",
      dialogVisible: false,
      imagevisible: false,
      visible: false,
      f_id:"",
      image:"",
      p_id:this.$route.params.p_id,
      p_name:this.$route.params.p_name,
      p_age:this.$route.params.p_age,
      p_sex:this.$route.params.p_sex,
      d_institution:this.$route.params.d_institution,
      newData:[],
      tableData: [],
      multipleSelection: []
    }
    },
    onload(){
      const that=this;
      if(sessionStorage.getItem("p_id"))
      {
        p_id=sessionStorage.getItem("p_id");
      }
      console.log("p_id="+that.p_id)
      this.$axios.get(Api.removeMedicationUrl+that.p_id)
           .then(function(response){
                  console.log("This is response!");
                  console.info(response.data.data);
                 // console.info(response.data[0].patientList);
                  that.newData=response.data.data;
                   console.info(response.data.data.length);
                   var n=response.data.data.length;
                  console.info(that.newData);
                   that.newData.forEach((item,index)=>{
                  // for(let i=0;i<n;i++)
                    //{
                      let current={
                        lung_type: item.lung_type,
                        f_id: item.f_id,
                        image: item.spectrum_image,
                        p_id:that.p_id,
                        p_name:that.p_name,
                        p_age:that.p_age,
                        descript:item.lung_description,
                        p_sex:that.p_sex,
                        d_id:item.collect_d_id,
                        d_institution:that.d_institution,
                        f_url:item.lung_file,
                        f_date:item.collect_time,
                        ct_description:item.ct_description,
                        ct_image:item.ct_image,
                        collect_site:item.collect_site,                   }
                    that.tableData.push(current);
                   // console.info(that.tableData);
                   // console.log(i);
                  //  }
                  })
                   console.info(that.tableData);
                 })
           .catch(function(error){
                   console.info(error);
                 });
    },
    created(){
      const that=this;
      if(this.$route.params.p_id==undefined)
        {
          that.p_id=sessionStorage.getItem("p_id")
          that.p_name=sessionStorage.getItem("p_name")
          that.p_age=sessionStorage.getItem("p_age")
          that.p_sex=sessionStorage.getItem("p_sex")
          that.d_institution=sessionStorage.getItem("d_institution")
        }
     // var d_id=this.$root.doctorid

     console.log(that.$route.params)
      this.$axios.get(Api.removeMedicationUrl+that.p_id)
           .then(function(response){
                  console.log("This is response!");
                  console.info(response.data.data);
                 // console.info(response.data[0].patientList);
                  that.newData=response.data.data;
                   console.info(response.data.data.length);
                   var n=response.data.data.length;
                  console.info(that.newData);
                   that.newData.forEach((item,index)=>{
                  // for(let i=0;i<n;i++)
                    //{
                      let current={
                        lung_type: item.lung_type,
                        f_id: item.f_id,
                        image: item.spectrum_image,
                        p_id:that.p_id,
                        p_name:that.p_name,
                        p_age:that.p_age,
                        descript:item.lung_description,
                        p_sex:that.p_sex,
                        d_id:item.collect_d_id,
                        d_institution:that.d_institution,
                        f_url:item.lung_file,
                        f_date:item.collect_time,
                        ct_description:item.ct_description,
                        ct_image:item.ct_image,
                        collect_site:item.collect_site,                   }
                    that.tableData.push(current);
                   // console.info(that.tableData);
                   // console.log(i);
                  //  }
                  })
                   console.info(that.tableData);
                 })
           .catch(function(error){
                   console.info(error);
                 });
             window.addEventListener('beforeunload', () => {
             sessionStorage.setItem("p_id",that.p_id)
             sessionStorage.setItem("p_name",that.p_name)
             sessionStorage.setItem("p_age",that.p_age)
             sessionStorage.setItem("p_sex",that.p_sex)
             sessionStorage.setItem("d_institution",that.d_institution)
             console.log(sessionStorage.getItem("p_id"))
    })
          
    },
    methods:{
    view(row)
      {
            var that =this;
            that.dialogVisible = true;
            console.log(row)
            var url=row.f_url
            that.src=url
           console.log(that.src);
            //this.$refs.audio.play();
      },
      show(row)
      {
            var that =this;
            that.imagevisible = true;
            console.log(row)
            that.i_src=row.image
           console.log(that.i_src);
      },
      s(row)
      {
            var that =this;
            that.visible = true;
            console.log(row)
            that.ct_src=row.ct_image
           console.log(that.ct_src);
      },
    //音频暂停
    stop() {
      this.dialogVisible = false;
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
    },
    filterTag(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    download()
    {              
        console.log(this.multipleSelection)
        var mes=[];
        this.multipleSelection.forEach(element => {
          if(element.f_url!=null)
            mes.push(element.f_url);
        });
        console.log(mes); 
        if(mes.length==0) 
        {
          this.$alert('文件路径不正确', '警告', {
            confirmButtonText: '确定',
          });
          return;
        }
        
        
        const zip = new JSZip()
        const cache = {}
        const promises = []
        mes.forEach(item => {
        const promise = getFile(item).then(mes => { // 下载文件, 并存成ArrayBuffer对象
         const arr_name = item.split("/")
         const file_name = arr_name[arr_name.length - 1] // 获取文件名
         zip.file(file_name, mes, { binary: true }) // 逐个添加文件
         cache[file_name] = mes
        })
        promises.push(promise)
        })
        Promise.all(promises).then(() => {
        zip.generateAsync({type:"blob"}).then(content => { // 生成二进制流
         FileSaver.saveAs(content, "打包下载.zip") // 利用file-saver保存文件
        })
        })
       }
    },
}
</script>