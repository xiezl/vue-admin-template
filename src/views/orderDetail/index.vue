<template>
  <div v-if="order" class="app-container">
    <el-button type="primary" @click.prevent="goEditPage"> Edit </el-button>
    <p><span class="item">Order Id:</span>{{ order.id }} </p>
    <p> Order Status: {{ order.status }} </p>
    <p> Detail File: <el-button v-if="order.detail_file" type="text" @click="downloadFile(order.detail_file)">{{ order.detail_file.file_name }}</el-button> </p>
    <p> Preview File: <el-button v-if="order.preview_file" type="text" @click="downloadFile(order.preview_file)">{{ order.preview_file.file_name }}</el-button> </p>
    <p> Scheduled Time: {{ order.scheduled_time }} </p>
    <p> Due Time: {{ order.due_time }} </p>
    <p> Subject: {{ order.subject }} </p>
    <p> Word Count: {{ order.word }} </p>
    <p> Bonus: {{ order.bonus }} </p>
    <p> Special Requirement: {{ order.special_requirement }} </p>
    <p> Update Time: {{ order.update_time }} </p>
    <p> Overdue Time: {{ order.over_due }} </p>
    <p> Marks: {{ order.marks }} </p>
    <p> Feedback: {{ order.feedback }} </p>
    <p v-if="order.writer"> Writer: {{ order.writer.name }}</p>
    <p v-if="order.notes"> Notes: {{ order.notes }}</p>
    <p v-if="order.quality_inspector"> Quality inspector: {{ order.quality_inspector }}</p>
    <p v-if="order.uploaded_file"> Submission File: <el-button v-if="order.uploaded_file" type="text" @click="downloadFile(order.uploaded_file)">{{ order.uploaded_file.file_name }}</el-button> </p>
    <p v-if="order.uploaded_file"> Submission Time: {{ order.upload_time }} </p>
    <el-form v-else ref="submissionForm" :model="submissionForm" label-position="left" label-width="200px" @submit.native.prevent>
      <el-form-item label="Upload the assignment">
        <el-upload
          :http-request="selectedSubmissionFile"
          :limit="1"
          :on-remove="removeSubmissionFile"
          action=""
        >
          <div v-if="!hasSubmissionFile" class="el-upload__text"> Click here to upload </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="completeOrder()">Submit</el-button>
      </el-form-item>
    </el-form>
    <el-row v-for="msg in msgList" :key="msg.id" class="message">
      <el-alert
        :title="msg.content"
        :closable="false"
        type="warning"
      >
        <p>MessageTime: {{ msg.create_time | date }}</p>
        <p>File: <el-button v-if="msg.file" type="text" @click="downloadFile(msg.file)">{{ msg.file.file_name }}</el-button></p>
      </el-alert>
    </el-row>
    <el-form ref="form" :model="form" label-position="left" label-width="200px" @submit.native.prevent>
      <el-form-item label="Write a message">
        <el-input v-model="message" type="textarea"/>
      </el-form-item>
      <el-form-item label="Upload a File">
        <el-upload
          :http-request="selectedFile"
          :limit="1"
          :on-remove="removeFile"
          action=""
        >
          <div v-if="!hasFile" class="el-upload__text"> Click here to upload </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit()">Submit the message</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOrderDetail, getDiscussion, getFileId, sendDiscussion, completeOrder } from '@/api/table'
import { convertDate } from '@/utils/date'
import { mapGetters } from 'vuex'

export default {
  // props: {
  //   order: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },
  filters: {
    date(str) {
      if (!str) return ''
      return convertDate(str)
    }
  },
  data() {
    console.log(this.$route)
    return {
      form: {},
      submissionForm: {},
      order: null,
      msgList: null,
      message: null,
      params: null,
      hasFile: false,
      hasSubmissionFile: false,
      submissionParams: null
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    uploadFileName() {
      return this.uploadFileList[0].file.name
    }
  },
  created() {
    const order = this.$route.params.order
    getOrderDetail(order.id).then(response => {
      this.order = response.data
      // console.log(response)
    })
    const data = { order_id: order.id }
    getDiscussion(data).then(response => {
      this.msgList = response.data
      // console.log(response)
    })
  },
  methods: {
    onSubmit() {
      console.log(this.message)
      console.log(this.params)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const data = {
        order_id: this.order.id,
        content: this.message
      }
      if (this.hasFile) {
        getFileId(this.params, config).then(response => {
          console.log(response)
          data.file_id = response.data.id
          sendDiscussion(data).then(r => {
            this.hasFile = false
            console.log(r)
          })
        })
      } else {
        sendDiscussion(data).then(response => {
          console.log(response)
        })
      }
    },
    completeOrder() {
      console.log(this.submissionParams)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const data = {}
      if (this.hasSubmissionFile) {
        getFileId(this.submissionParams, config).then(response => {
          console.log(response)
          data.file_id = response.data.id
          completeOrder(this.order.id, data).then(r => {
            this.hasSubmissionFile = false
            console.log(r)
          })
        })
      }
    },
    downloadFile(file) {
      window.location.href = `http://192.168.0.100:8808/file/${file.id}`
    },
    selectedFile(e) {
      const file = e.file
      this.params = new FormData()
      this.params.append('file', file)
      this.hasFile = true
      console.log(file)
    },
    selectedSubmissionFile(e) {
      const file = e.file
      this.submissionParams = new FormData()
      this.submissionParams.append('file', file)
      this.hasSubmissionFile = true
      console.log(file)
      for (e of this.submissionParams.values()) {
        console.log(e)
      }
    },
    removeFile(file, fileList) {
      this.hasFile = false
    },
    removeSubmissionFile(file, fileList) {
      this.hasSubmissionFile = false
    },
    goEditPage() {
      this.$router.push({ name: 'orderDetailil', params: { order: this.order }})
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
p {
  height: 40px;
  line-height: 40px;
}
.el-form /deep/ .el-form-item__label {
  font-weight: inherit;
  font-size: inherit;
  color: black;
}
.el-form /deep/ .el-textarea {
  width: 300px;
}
.el-form /deep/ .el-textarea__inner {
  min-height: 100px !important;
}
.item {
  font-weight: 600;
  width: 100px;
}
</style>

