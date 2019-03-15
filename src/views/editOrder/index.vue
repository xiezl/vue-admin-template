<template>
  <div v-if="order" class="app-container">
    <p> Detail File<span style="color: red">*</span>:
      <span v-if="order.detail_file">
        <el-button type="text" @click="downloadFile(order.detail_file)">
          {{ order.detail_file.file_name }}
        </el-button>
        <el-button type="danger" @click.prevent="deleteFile(order.detail_file)"> Delete </el-button>
      </span>
      <span v-else>
        <el-upload
          :http-request="selectedFile"
          :limit="1"
          :on-remove="removeFile"
          action=""
          style="display: inline-block"
        >
          <span v-if="!hasFile" class="el-upload__text"> Click here to upload </span>
        </el-upload>
      </span>
    </p>

    <p> Preview File:
      <span v-if="order.preview_file">
        <el-button v-if="order.preview_file" type="text" @click="downloadFile(order.preview_file)">
          {{ order.preview_file.file_name }}
        </el-button>
        <el-button type="danger" @click.prevent="deletePreviewFile(order.preview_file)"> Delete </el-button>
      </span>
      <span v-else>
        <el-upload
          :http-request="selectedPreviewFile"
          :limit="1"
          :on-remove="removePreviewFile"
          action=""
          style="display: inline-block"
        >
          <span v-if="!hasPreviewFile" class="el-upload__text"> Click here to upload </span>
        </el-upload>
      </span>
    </p>

    <p> Scheduled Time<span style="color: red">*</span>:
      <el-date-picker
        v-model="scheduled_time"
        type="datetime"
        value-format="timestamp"
        placeholder="Select Time" /></p>

    <p> Due Time<span style="color: red">*</span>:
      <el-date-picker
        v-model="due_time"
        type="datetime"
        value-format="timestamp"
        placeholder="Select Time" /></p>

    <p> Subject<span style="color: red">*</span>: <el-input v-model="order.subject"> {{ order.subject }}</el-input></p>

    <p> Word Count<span style="color: red">*</span>: <el-input v-model="order.word"> {{ order.word }}</el-input></p>

    <p> Bonus: <el-input v-model="order.bonus"> {{ order.bonus }}</el-input></p>

    <p> Special Requirement: <el-input v-model="order.special_requirement">{{ order.special_requirement }}</el-input></p>

    <p> Additional Info: <el-input v-model="order.addition_info" type="textarea"> {{ order.addition_info }}</el-input></p>

    <el-row v-if="edit">
      <p> Marks: <el-input v-model="order.marks"> {{ order.marks }}</el-input></p>

      <p> Feedback: <el-input v-model="order.feedback" type="textarea"> {{ order.feedback }}</el-input></p>

      <p> Notes: <el-input v-model="order.notes"> {{ order.notes }}</el-input></p>

      <p> Quality inspector: <el-input v-model="order.quality_inspector"> {{ order.quality_inspector }}</el-input></p>
    </el-row>
    <el-button type="primary" @click.prevent="submitOrder"> Submit </el-button>
  </div>
</template>

<script>
import { getOrderDetail, addOrder, editOrder, getFileId, deleteDetailFile, deletePreviewFile } from '@/api/table'
import { convertDate } from '@/utils/date'
import { mapGetters } from 'vuex'

// eslint-disable-next-line
Date.prototype.format = function(fmt) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  }
  return fmt
}

const defaultOrder = {
  scheduled_time: null,
  due_time: null,
  subject: null,
  word: null,
  bonus: null,
  special_requirement: null,
  update_time: null,
  over_due: null,
  marks: null,
  feedback: null,
  writer: {
    name: null
  },
  notes: null,
  quality_inspector: null
}

export default {
  filters: {
    date(str) {
      if (!str) return ''
      return convertDate(str)
    }
  },
  data() {
    return {
      order: null,
      edit: false,
      params: null,
      hasFile: false,
      previewParams: null,
      hasPreviewFile: false,
      scheduled_time: null,
      due_time: null
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const order = this.$route.params.order
      if (order) {
        getOrderDetail(order.id).then(response => {
          this.order = response.data
          this.edit = true
        })
      } else {
        this.order = defaultOrder
        this.edit = false
      }
    },
    downloadFile(file) {
      window.location.href = `http://192.168.0.100:8808/file/${file.id}`
    },
    submitOrder() {
      const order = this.order
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (this.scheduled_time) {
        const date = new Date(this.scheduled_time)
        order.scheduled_time = date.format('yyyy-MM-dd hh:mm:ss')
      }
      if (this.due_time) {
        const date = new Date(this.due_time)
        order.due_time = date.format('yyyy-MM-dd hh:mm:ss')
      }
      console.log(order)
      if (!this.edit) {
        const flag = this.validate()
        if (!flag) {
          this.$message({
            message: 'Please set the mendatory fields',
            type: 'error'
          })
          return
        }
        if (this.hasFile && this.hasPreviewFile) {
          getFileId(this.params, config).then(detailFileRes => {
            order.detail_file_id = detailFileRes.data.id
            getFileId(this.previewParams, config).then(previewFileRes => {
              order.preview_file_id = previewFileRes.data.id
              addOrder(order).then(response => {
                this.$message({
                  message: 'Successfully add order',
                  type: 'success'
                })
                this.$router.push({ name: 'orderDetail', params: { order: response.data }})
              })
            })
          })
        } else if (this.hasFile) {
          getFileId(this.params, config).then(detailFileRes => {
            order.detail_file_id = detailFileRes.data.id
            addOrder(order).then(response => {
              this.$message({
                message: 'Successfully add order',
                type: 'success'
              })
              this.$router.push({ name: 'orderDetail', params: { order: response.data }})
            })
          })
        } else if (this.hasPreviewFile) {
          getFileId(this.previewParams, config).then(previewFileRes => {
            order.preview_file_id = previewFileRes.data.id
            addOrder(order).then(response => {
              this.$message({
                message: 'Successfully add order',
                type: 'success'
              })
              this.$router.push({ name: 'orderDetail', params: { order: response.data }})
            })
          })
        } else {
          addOrder(order).then(response => {
            this.$message({
              message: 'Successfully add order',
              type: 'success'
            })
            this.$router.push({ name: 'orderDetail', params: { order: response.data }})
          })
        }
      } else {
        if (this.hasFile && this.hasPreviewFile) {
          getFileId(this.params, config).then(detailFileRes => {
            order.detail_file_id = detailFileRes.data.id
            getFileId(this.previewParams, config).then(previewFileRes => {
              order.preview_file_id = previewFileRes.data.id
              editOrder(order).then(response => {
                this.$message({
                  message: 'Successfully edit order',
                  type: 'success'
                })
                this.$router.push({ name: 'orderDetail', params: { order: response.data }})
              })
            })
          })
        } else if (this.hasFile) {
          getFileId(this.params, config).then(detailFileRes => {
            order.detail_file_id = detailFileRes.data.id
            editOrder(order).then(response => {
              this.$message({
                message: 'Successfully edit order',
                type: 'success'
              })
              this.$router.push({ name: 'orderDetail', params: { order: response.data }})
            })
          })
        } else if (this.hasPreviewFile) {
          getFileId(this.previewParams, config).then(previewFileRes => {
            order.preview_file_id = previewFileRes.data.id
            editOrder(order).then(response => {
              this.$message({
                message: 'Successfully edit order',
                type: 'success'
              })
              this.$router.push({ name: 'orderDetail', params: { order: response.data }})
            })
          })
        } else {
          editOrder(order).then(response => {
            this.$message({
              message: 'Successfully edit order',
              type: 'success'
            })
            this.$router.push({ name: 'orderDetail', params: { order: response.data }})
          })
        }
      }
    },
    selectedFile(e) {
      const file = e.file
      this.params = new FormData()
      this.params.append('file', file)
      this.hasFile = true
    },
    removeFile(file, fileList) {
      this.hasFile = false
    },
    selectedPreviewFile(e) {
      const file = e.file
      this.previewParams = new FormData()
      this.previewParams.append('file', file)
      this.hasPreviewFile = true
    },
    removePreviewFile(file, fileList) {
      this.hasPreviewFile = false
    },
    deleteFile(file) {
      deleteDetailFile(this.order.id).then(response => {
        this.fetchData()
      })
    },
    deletePreviewFile(file) {
      deletePreviewFile(this.order.id).then(response => {
        this.fetchData()
      })
    },
    validate() {
      return this.hasFile && this.order.scheduled_time && this.order.due_time && this.order.subject && this.order.word
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.message{
  margin: 10px 0px;
}
</style>

