<template>
  <div id="app">
    <el-container class="app-container">
      <!-- 1. 侧边栏  -->
      <el-aside width="200px" class="sidebar">
        <sidebar> </sidebar>
      </el-aside>
      <!-- 2. 右侧主体内容区 -->
      <!--方向默认为 "vertical"垂直，它会占据侧边栏右侧的所有剩余空间-->
      <el-container>
        <!-- 2a.顶栏 -->
        <el-header height="60px" class="header">
          <TopHeader></TopHeader>
        </el-header>
        <!-- 2b.主内容区 -->
        <!-- el-main 会自动撑满 Header 下方的所有剩余空间
          设置 overflow: auto，让它自己处理滚动-->
        <el-main class="main-content">
          <UserManagement></UserManagement>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "@/components/SiderBar.vue";
import TopHeader from "@/components/TopHeader.vue";
import UserManagement from "@/views/UserManagement.vue";
export default {
  name: "App",
  components: {
    Sidebar,
    TopHeader,
    UserManagement,
  },
};
</script>

<style lang="scss" scoped>
#app,
.app-container {
  // 让根容器占满整个视口高度
  height: 100vh;
  width: 100vw;
  // 防止整体滚动区域（是否必须？？
  // 未测试出双滚动条异常
  overflow: hidden;
}

.sidebar {
  // height: 100vh;？
  background-color: $sidebar-bg;
  /* 让侧边栏自己处理垂直溢出 */
  overflow-y: auto;
  /* 隐藏不需要的水平滚动条 */
  overflow-x: hidden;
  transition: margin-left 0.3s ease; //移动端隐藏动画
}
.main-content {
  // flex: 1; // 主内容区占满剩余空间
  background-color: $bg-page;
  overflow-y: auto;
  padding: 0; // 去掉 Element UI 默认 padding
}
.header {
  padding: 0;
}

// 响应式: 小屏幕隐藏侧边栏
@media (max-width: 768px) {
  .sidebar.el-aside {
    /* 简单粗暴但有效：在小屏幕上直接隐藏侧边栏。
      el-container (flex布局) 会自动让 .main-content 占满100%宽度。
    */
    display: none; // 之后改为抽屉式
  }
}
</style>
