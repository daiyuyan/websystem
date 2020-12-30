<template>
  <div id="login">
    <el-row style="height:50px"></el-row>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-card>
              <el-row>
                <el-col :span="18">
                  <el-image :src="imageUrl" style="height:500px" :fit="fit"></el-image>
                </el-col>

                <el-col :span="5" :offset="1">
                  <el-form
                    :model="LoginForm"
                    ref="LoginForm"
                    :rules="rule"
                    label-width="0"
                    style="align:'center'"
                    class=".login-form"
                  >
                    <h3
                      style="font-weight:bolder; font-size:larger; marginTop: 80px; margin-bottom: 30px"
                    >登录</h3>

                    <el-form-item prop="id">
                      <el-input type="text" v-model="LoginForm.id" placeholder="请输入电话号码或者电子邮箱"></el-input>
                    </el-form-item>

                    <el-form-item prop="pwd">
                      <el-input type="password" v-model="LoginForm.pwd" placeholder="请输入密码"></el-input>
                    </el-form-item>
                                        <el-form-item>
                      <el-button
                        type="danger"
                        class="submitBtn"
                        align="center"
                        round
                        @click.native.prevent="submit('LoginForm')"
                      >登录</el-button>

                      <el-divider></el-divider>
                    </el-form-item>
                      <el-divider></el-divider>
                  </el-form>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <el-footer style="marginTop:30px">
        <el-divider content-position="center">云伴远程肺音听诊系统服务由深圳市深大云伴健康科技有限公司提供</el-divider>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import Api from "../http/api";
//axios.defaults.withCredentials = true;

export default {
  name: "login",
  // ....
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.LoginForm.checkPass !== "") {
          this.$refs.LoginForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      activeName: "first",
      LoginForm: {
        id: "",
        pwd: ""
      },
      rule: {
        id: [
          {
            required: true,
            max: 14,
            min: 2,
            message: "用户名是必须的，长度为2-14位",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "密码是必须的！",
            trigger: "blur",
            validator: validatePass
          }
        ]
      },

      imageUrl: require("../assets/loginPic.jpg"),
      fit: "cover"
    };
  },
  methods: {
    // 提交表单
    // "http://192.168.0.5:8080/hims/auth/login",

    submit(formName) {
       //this.$router.push("/home");
      var jsons={  
    d_id:this.LoginForm.id,
    d_Password:this.LoginForm.pwd
      }
    this.$axios({
        url:Api.loginUrl,
       // url:'/api',
        method: 'post',
        data:jsons,
        dataType: 'text',
        contentType: "application/json;charset=UTF-8",
      //  datatype:"text",
   //    header:{
    //      'Content-Type':'application/json;charset=utf-8'  //如果写成contentType会报错
    //  }
      })
      .then(res => {
              console.log(res.data);
              console.log(res.data.status);
              if (res.data == true) {
                //this.$root.doctorid=this.$refs[formName].id
                this.$root.doctorid=this.LoginForm.id
                console.log(this.$root.doctorid)
                this.$router.push("/home");
              }
            });
  },
    
  }
};
</script>

<style scoped>
.login-form {
  margin: 20px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #b4bccc;
  padding: 30px 30px 0 30px;
  border-radius: 25px;
}
.submitBtn {
  width: 65%;
}
.to {
  color: #67c23a;
  cursor: pointer;
}
</style>
