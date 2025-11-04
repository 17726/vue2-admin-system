<template>
  <div id="app">
    <!-- 侧边栏  -->
    <sidebar class="sidebar"></sidebar>
    <!-- 顶栏 -->
    <TopHeader class="header"></TopHeader>
    <!-- 主内容区 -->
    <div class="main">
      <UserManagement></UserManagement>
    </div>
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
#app {
  display: grid;
  grid-template-areas: 
  "sidebar header"
  "sidebar main";
  // 侧边栏200px,主区域自适应
  grid-template-columns: 200px 1fr; 
  // 行高: 顶栏固定60px, 主区域自适应
  grid-template-rows: $top-header-height 1fr;
  height: 100vh;//min-height?
  overflow: hidden; // 防止整体滚动
}

// 侧边栏区域
.sidebar {
  grid-area: sidebar;
  // overflow-y: auto; // 内部滚动
}

// 顶栏区域
.header {
  grid-area: header;
  // z-index: 100; // 保证在内容之上
}

// 主内容区域
.main {
  grid-area: main;
  background-color: $bg-page;
  // ？
  // overflow-y: auto; // 内部滚动
  // overflow-x: hidden;
}

// 响应式: 小屏幕隐藏侧边栏
@media (max-width: 768px) {
  #app {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none; // 或改为抽屉式
  }
}
</style>
