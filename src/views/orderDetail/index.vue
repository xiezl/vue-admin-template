<template>
  <div class="app-container">
    <h4> Order No.: {{ order.id }} </h4>
    <h4> Scheduled Time: {{ order.scheduled_time }} </h4>
    <h4> Subject: {{ order.subject }} </h4>
    <h4> Word Count: {{ order.word }} </h4>
    <h4> Special Requirement: {{ order.special_requirement }} </h4>
    <h4> Reference Style and Number:  </h4>
    <h4> Details zip: <el-button type="primary">Click to Download</el-button> </h4>
    <h4> Remaining Time: {{ order.remain_time }} </h4>
    <h4> Additional Info: {{ order.additio_info }} </h4>
    <h4> Marks: {{ order.mark }} </h4>
    <el-form v-if="roles[0] === 'editor'" ref="form" :model="form" label-width="120px">
      <h5> Add Upload Area</h5>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
    <el-form v-else ref="form" :model="form" label-width="120px">
      <el-form-item label="Message From Admin">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // props: {
  //   order: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },
  data() {
    console.log(this.$route)
    return {
      form: {
        desc: ''
      },
      order: this.$route.params.order
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    }
    // onCancel() {
    //   this.$message({
    //     message: 'cancel!',
    //     type: 'warning'
    //   })
    // }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

