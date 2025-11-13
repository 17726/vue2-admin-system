<template>
  <header class="top-header">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span class="breadcrumb-item">首页</span>
      <span class="separator">/</span>
      <span class="breadcrumb-item active">用户管理</span>
    </div>
    <!-- 右侧用户信息 -->
    <div class="user-info">
      <span class="welcome">欢迎,</span>
      <span class="username">admin</span>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $top-header-height;
  padding: 0 $base-padding;
  background-color: $bg-white;
  border-bottom: 1px solid $border-lighter;

  // 面包屑导航
  .breadcrumb {
    display: flex;
    align-items: center;
    font-size: $font-size-base;

    .breadcrumb-item {
      color: $text-regular;
      // transition: $transition-fast;

      &.active {
        color: $primary-color;
        font-weight: $font-weight-medium;
      }

      &:hover:not(.active) {
        color: $text-regular;
        cursor: pointer;
      }
    }

    .separator {
      margin: 0 8px;
      // 占位色
      color: $text-placeholder;
    }
  }

  // 用户信息
  .user-info {
    display: flex;
    align-items: center;
    font-size: $font-size-small;
    color: #606266;
    gap: 4px;
    .username {
      color: $primary-color;
      font-weight: 500;
    }
  }
}
</style>
