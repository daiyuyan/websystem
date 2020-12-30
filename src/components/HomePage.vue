<template>
 <div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="p_id"
      label="编号"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="p_name"
      label="患者"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="p_sex"
      label="性别"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="p_age"
      label="年龄"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="d_name"
      label="所属医生"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="d_institution"
      label="科室"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="detail"
      label="患者详情"
      width="100">
     <template slot-scope="scope">
        <el-button type="text" @click="view(scope.row)" size="small">查看详情</el-button>
     </template>
    </el-table-column>
    <el-table-column
       prop="caozuo"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button ref="btn1" @click="open($event,scope.row)" type="text" size="small">创建远程听诊</el-button>
      </template>
    </el-table-column>
    <el-table-column
       prop="shishi"
      label="实时听诊"
      width="100">
      <template slot-scope="scope">
        <el-button ref="btn2" @click="connect($event,scope.row)" type="text" size="small">实时听诊</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="实时听诊" :visible.sync="dialogFormVisible" > 
    <div id="container" style="width: 400px; margin: 0 auto;">
    <el-button @click="loadPCM()">播 放</el-button>
    <el-button @click="pause" :disabled=btnf>暂停播放</el-button>
    <el-button @click="continuePlay" :disabled=btnf>继续播放</el-button>
     <el-button @click="end">断开连接</el-button>
</div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">关 闭</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script src="./http/pcm.js"></script>
<script src="./http/socket.js"></script>
<script>
import axios from "axios";
import Api from "../http/api";
import PCMPlayer from "../http/pcm";
import websocket from "../http/socket";
export default {
 name: "homepage", 
 data() {
  return {
        patient_id:'',
        ws:null,
        dialogFormVisible: false,
        btnf:true,
        stuname:'肺音数据',
        newData:[],
        tableData:[]
      }
    },
    created(){
      const that=this;
      console.log(this.$root.doctorid)
      var d_id=this.$root.doctorid
      if(sessionStorage.getItem("d_id"))
      {
        d_id=sessionStorage.getItem("d_id");
        this.$root.doctorid=d_id;
      }
      console.log(this.$root.doctorid)
      this.$axios.get(Api.registerUrl+"/"+d_id,
     )
           .then(function(response){
                  console.info(response.data);
                  that.tableData=response.data;
               
                 })
           .catch(function(error){
                   console.info(error);
                 });
          
           window.addEventListener('beforeunload', () => {
             this.$root.doctorid=sessionStorage.getItem("d_id")
             console.log(this.$root.doctorid)
    })

    },
    methods:{
    open(val,row) {
        if(val.target.innerText=="创建远程听诊")
        {
          this.$confirm('您确定创建远程肺音听诊?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          });
         console.log(val.target.innerText )
         var name = this.stuname;
         val.target.innerText= name
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
     }
     else if(val.target.innerText=="肺音数据")
     {
         this.$router.push({
           name:'voicedata',
           params:{
             p_id:row.p_id,
             p_name:row.p_name,
             p_age:row.p_age,
             p_sex:row.p_sex,
             p_hospNum: row.p_hospNum,
             d_institution:row.d_institution
           }
         })
     }
      },
      view(row)
      {
            console.log(row)
            console.log(row.p_id)
            console.log(row.p_name)
            console.log(row.p_age)
         this.$router.push({
           name:'detail',
           params:{
             p_id:row.p_id,
             p_name:row.p_name,
             p_age:row.p_age,
             p_sex:row.p_sex,
             d_name:row.d_name,
             p_hospNum: row.p_hospNum,
             d_institution:row.d_institution
           }
         })
      },
      connect(val,row)
      {
        this.dialogFormVisible = true
        this.ws = new WebSocket(Api.socketURL+"/"+this.$root.doctorid);
        this.ws.binaryType = 'arraybuffer';
        this.patient_id=row.p_id;
        console.log(this.patient_id)
        console.log(row.p_id)
        console.log(row)
      },
      loadPCM(row)
      {
        var that=this;
        var player = new PCMPlayer({
            inputCodec: 'Int16',
            channels: 2,
            sampleRate: 8000,
            flushTime: 200
        });
        console.log(that.p_id)
         var messageObj = {
          messageType:1,
          textmessage:"start",
          fromUsername:this.$root.doctorid,
          toUsername: this.patient_id
          };
          console.log(messageObj)
        that.ws.send(JSON.stringify(messageObj));
         that.ws.addEventListener('message', function (event) {
           console.log(event.data)
         //  console.log(event.data[5])
         var message = eval("(" + event.data + ")");
         console.log(message)
           if(message.messageType==3)
           {
             console.log(message);
             that.$message('对方尚未建立连接请稍后再试');
           }
           else
           {
             var voice=window.atob(message.textmessage)
             player.feed(voice);
             that.btnf=true;
           }
           
        });
    },
    changeVolume(e) {
        player.volume(document.querySelector('#range').value)
    },
    async pause() {
        await player.pause()
    },
    continuePlay() {
        player.continue()
    },
    end()
    {
        console.log("断开");
        this.ws.close();
        console.log("Close"+this.ws.readyState)
    }
  }
}
</script>>
