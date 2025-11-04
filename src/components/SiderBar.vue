<template>
  <div class="side-bar">
    <div class="logo">Admin System</div>
    <!-- 使用nav -->
    <nav class="menu">
      <ul>
        <li class="menu-item active">用户管理</li>
        <li class="menu-item">商品管理 (空)</li>
        <li class="menu-item">订单管理 (空)</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
.side-bar {
  // Grid布局下不需要设置宽高和定位，由父容器控制
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  .logo {
    padding: $base-padding;
    height: $top-header-height; //同顶栏高度一致
    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-large;
    font-weight: bold;
    border-bottom: 1px solid #34495e;
    // letter-spacing: 1px;//增加字间距
  }
  .menu {
    flex: 1; // 菜单区域占满剩余空间
    // overflow-y: auto; // 菜单过多时内部滚动
    
    ul {
      //清除默认样式
      list-style: none;
      padding: 0;
      margin: 0;

      .menu-item {
        padding: 15px $base-padding;
        cursor: pointer;
    
        &.active {
          // background-color: $primary-color;
          background-color: #1a252f;
          color: #fff;
        }
        &:hover:not(.active) {
          background-color: #263445;
        }
      }
    }
  }
}
</style>
