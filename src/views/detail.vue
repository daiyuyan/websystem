<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="编号">
    <el-input v-model="form.p_id"  :disabled="true" ></el-input>
  </el-form-item>
  <el-form-item label="姓名">
    <el-input v-model="form.p_name"  :disabled="true" ></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-input v-model="form.p_sex" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="年龄">
    <el-input v-model="form.p_age" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="所属医生">
   <el-input v-model="form.d_name" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="科室">
   <el-input v-model="form.d_institution" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="住院号">
    <el-input v-model="form.p_hospNum"  :disabled="true" ></el-input>
  </el-form-item>
  <el-form-item label="诊断结果">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
            p_id:this.$route.params.p_id,
             p_name:this.$route.params.p_name,
             p_age:this.$route.params.p_age,
             p_sex:this.$route.params.p_sex,
             d_name:this.$route.params.d_name,
             d_institution:this.$route.params.d_institution,  
             p_hospNum:this.$route.params.p_hospNum,          
             desc: ''
        }
      }
    },
     created()
      {
        var that=this;
        console.log(that.form.p_id)
        if(this.$route.params.p_id==undefined)
        {
          that.form.p_id=sessionStorage.getItem("p_id")
          that.form.p_name=sessionStorage.getItem("p_name")
          that.form.p_age=sessionStorage.getItem("p_age")
          that.form.p_hospNum=sessionStorage.getItem("p_hospNum")
          that.form.p_sex=sessionStorage.getItem("p_sex")
          that.form.d_name=sessionStorage.getItem("d_name")
          that.form.d_institution=sessionStorage.getItem("d_institution")
        }
        console.log(that.form.p_id)
         window.addEventListener('beforeunload', () => {
             sessionStorage.setItem("p_id",that.form.p_id)
             sessionStorage.setItem("p_name",that.form.p_name)
             sessionStorage.setItem("p_hospNum",that.form.p_hospNum)
             sessionStorage.setItem("p_age",that.form.p_age)
             sessionStorage.setItem("p_sex",that.form.p_sex)
             sessionStorage.setItem("d_name",that.form.d_name)
             sessionStorage.setItem("d_institution",that.form.d_institution)
             console.log(sessionStorage.getItem("p_id"))
    })
      },
    methods: {
     cancel()
     {
        this.$router.push("/Home/HomePage");
     },
        onSubmit() {
        console.log('submit!');
        console.log(this.form)
        console.log(this.$route.params)
        this.$router.push("/Home/HomePage");

    /*     this.form.validate(valid => {
          if (valid) {
          axios.post(
              Api.loginUrl,    //后台地址
              qs.stringify(
                { id: this.form.id, desc: this.form.desc },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              )
            )
            .then(res => {
              console.log(res.data.status);
              if (res.data.status == 200) {
                //this.$root.doctorid=this.$refs[formName].id
                this.$root.doctorid=this.LoginForm.id
                console.log(this.$root.doctorid)
                this.$router.push("/home");
            //  }
            //});
        //}*/
    //  });
      }
    }
  }
</script>