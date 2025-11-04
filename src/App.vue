<template>
  <div id="app">
    <!-- 侧边栏  -->
    <sidebar></sidebar>
    <div class="main-container">
      <!-- 顶栏 -->
      <TopHeader></TopHeader>

      <div class="app-main">
        <!-- 用户管理页面 -->
        <UserManagement></UserManagement>
      </div>
    </div>
  </div>
</template>

<script>

import Sidebar from '@/components/SiderBar.vue';
import TopHeader from '@/components/TopHeader.vue';
import UserManagement from '@/components/views/UserManagement.vue';
export default {
  name: 'App',
  components: {
    Sidebar,
    TopHeader,
    UserManagement
  }
}
</script>

<style lang="scss" scoped>

</style>
