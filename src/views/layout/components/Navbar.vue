<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <el-badge :hidden="roles[0] === 'admin'" :value="msgNum" class="item">
        <div class="avatar-wrapper">
          <img class="user-avatar">
          <i class="el-icon-cart-bottom"/>
        </div>
      </el-badge>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/notification">
          <el-dropdown-item v-if="roles[0] !== 'admin'" class="clear-fix">
            Notification
            <el-badge :value="msgNum" class="mark"/>
          </el-dropdown-item>
        </router-link>
        <!-- <el-dropdown-item divided> -->
        <el-dropdown-item class="clear-fix">
          <span style="display:block;" @click="logout">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getMsgNum } from '@/api/table'
import { mapGetters } from 'vuex'
import store from '@/store'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      msgNum: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'roles'
    ])
  },
  created() {
    const role = store.getters.roles
    if (role[0] !== 'admin') {
      getMsgNum().then(response => {
        console.log(response)
        this.msgNum = response.data.number
      })
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

