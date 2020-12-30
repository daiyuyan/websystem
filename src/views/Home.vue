<template>
  <div id="home">
    <el-container>
      <!-- 顶部栏--------------------------------------------------------------------------------------------- -->
      <el-header style="background-color: #ffffff; margin: 0px 0px 0px 0px; height:70px">
        <el-row>
          <el-col :span="3">
           <!-- <el-image :src="logoUrl" style="height:70px"></el-image>-->
          </el-col>
          <el-col :span="10">
            <h2 style="text-align:left;">云伴远程肺音听诊系统</h2>
          </el-col>
        </el-row>
      </el-header>

      <el-divider style="width:100%"></el-divider>

      <el-container>
        <!-- 侧边栏--------------------------------------------------------------------------------------------- -->
        <el-aside
          width="200px"
          style="background-color: rgb(238, 241, 246); margin: 2px 5px 0px 0px"
        >

          <!-- 导航栏 -->
          <el-menu :default-active="activeIndex" router>
            <!-- 首页 -->
            <el-menu-item index="/Home/HomePage">
              <i class="el-icon-message"></i>
              <span slot="title">肺音听诊</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主要内容显示(tab切换)------------------------------------------------------------------------------------------- -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.menu-right {
  margin-left: 200px;
}
</style>

<script>
export default {
  name: "home",
  data() {
    return {
      circleUrl:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566319876268&di=0144317d17547fbe52fb592b4af11ce5&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F09%2F20180309201807_2EhwS.jpeg",
      userName: "",

      logoUrl: require("../assets/logoPic.jpg"),

      activeIndex: "/Home/HomePage"
    };
  },

  methods: {}
};
</script>
