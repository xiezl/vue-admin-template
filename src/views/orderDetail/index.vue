<template>
  <div v-if="order" class="app-container">
    <el-row v-if="roles[0] === 'admin'">
      <el-button type="primary" @click.prevent="goEditPage"> Edit </el-button>
      <el-button type="danger" @click.prevent="deleteOrder()"> Delete </el-button>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item">Order Id:</p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p>{{ order.id }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Order Status:</p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ statusToString(order.status) }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Detail File:</p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <el-button v-if="order.detail_file" type="text" @click="downloadFile(order.detail_file)">{{ order.detail_file.file_name }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Preview File: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <el-button v-if="order.preview_file" type="text" @click="downloadFile(order.preview_file)">{{ order.preview_file.file_name }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Scheduled Time:</p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p>{{ order.scheduled_time }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Due Time:</p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.due_time }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Subject:</p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.subject }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Word Count:</p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.word }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Bonus: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.bonus }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Special Requirement: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.special_requirement }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Update Time: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.update_time }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Overdue Time: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ formatMinutes(order.over_due) }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Marks: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.marks }} </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Feedback: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.feedback }} </p>
      </el-col>
    </el-row>
    <el-row v-if="order.writer">
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Writer: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.writer.name }} </p>
      </el-col>
    </el-row>
    <el-row v-if="order.notes">
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Notes: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.notes }} </p>
      </el-col>
    </el-row>
    <el-row v-if="order.quality_inspector">
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Quality inspector: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.quality_inspector }} </p>
      </el-col>
    </el-row>
    <el-row v-if="order.uploaded_file">
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Submission File: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <el-button v-if="order.uploaded_file" type="text" @click="downloadFile(order.uploaded_file)">{{ order.uploaded_file.file_name }}</el-button>
      </el-col>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Submission Time: </p>
      </el-col>
      <el-col :sm="24 - smSpan" :xs="24 - xsSpan">
        <p> {{ order.upload_time }} </p>
      </el-col>
    </el-row>
    <el-row v-else-if="roles[0] !== 'admin'">
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Upload the assignment: </p>
      </el-col>
      <el-col :sm="smSpan" :xs="xsSpan - 2">
        <el-upload
          :http-request="selectedSubmissionFile"
          :limit="1"
          :on-remove="removeSubmissionFile"
          action=""
        >
          <div v-if="!hasSubmissionFile" class="el-upload__text"> Click here to upload </div>
        </el-upload>
      </el-col>
      <el-col :sm="20 - 2 * smSpan" :xs="xsSpan + 4">
        <el-button type="primary" @click.prevent="completeOrder()">Submit</el-button>
      </el-col>
    </el-row>
    <div v-if="showMsg">
      <el-row v-for="msg in msgList" :key="msg.id" class="message">
        <el-col :sm="smSpan * 2" :xs="xsSpan * 2 + 4">
          <el-alert
            type="warning"
            close-text="delete"
            @close="deleteMsg(msg.id)"
          >
            <slot name="title">
              <span> {{ msg.user.username }}: </span>
              <span> {{ msg.content }} </span>
            </slot>
            <p class="">Time: {{ msg.create_time | date }}</p>
            <p class="">File: <el-button v-if="msg.file" type="text" @click="downloadFile(msg.file)">{{ msg.file.file_name }}</el-button></p>
          </el-alert>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Writer a Message </p>
      </el-col>
      <el-col :sm="smSpan+2" :xs="xsSpan">
        <el-input v-model="message" type="textarea"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="smSpan" :xs="xsSpan">
        <p class="item"> Upload a File</p>
      </el-col>
      <el-col :sm="smSpan" :xs="xsSpan-2">
        <el-upload
          :http-request="selectedFile"
          :limit="1"
          :on-remove="removeFile"
          action=""
        >
          <div v-if="!hasFile" class="el-upload__text"> Click here to upload </div>
        </el-upload>
      </el-col>
      <el-col :sm="24 - 2 * smSpan" :xs="26 - 2 * xsSpan">
        <el-button type="primary" @click.prevent="onSubmit()">Submit message</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getOrderDetail, getDiscussion, getFileId, sendDiscussion, completeOrder, deleteOrder, deleteDiscussion } from '@/api/table'
import { convertDate, statusToString, formatMinutes } from '@/utils/date'
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
    return {
      form: {},
      submissionForm: {},
      order: null,
      msgList: null,
      message: null,
      params: null,
      hasFile: false,
      hasSubmissionFile: false,
      submissionParams: null,
      smSpan: 6,
      xsSpan: 8,
      showMsg: true
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
    }).catch(err => {
      console.log(err)
      this.$message({
        message: 'Login failed. Please relogin',
        type: 'error'
      })
      this.$router.push({ path: '/login' })
    })
    const data = { order_id: order.id }
    getDiscussion(data).then(response => {
      this.msgList = response.data
    })
  },
  methods: {
    onSubmit() {
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
          data.file_id = response.data.id
          sendDiscussion(data).then(r => {
            this.hasFile = false
            const data = { order_id: this.order.id }
            getDiscussion(data).then(response => {
              this.msgList = response.data
            })
          })
        })
      } else {
        sendDiscussion(data).then(response => {
          const data = { order_id: this.order.id }
          getDiscussion(data).then(response => {
            this.msgList = response.data
          })
        })
      }
    },
    completeOrder() {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const data = {}
      if (this.hasSubmissionFile) {
        getFileId(this.submissionParams, config).then(response => {
          data.file_id = response.data.id
          completeOrder(this.order.id, data).then(r => {
            this.hasSubmissionFile = false
            getOrderDetail(this.order.id).then(res => {
              this.order = res.data
            })
          })
        })
      }
    },
    downloadFile(file) {
      window.location.href = `http://47.75.203.197:8808/file/${file.id}`
    },
    selectedFile(e) {
      const file = e.file
      this.params = new FormData()
      this.params.append('file', file)
      this.hasFile = true
    },
    selectedSubmissionFile(e) {
      const file = e.file
      this.submissionParams = new FormData()
      this.submissionParams.append('file', file)
      this.hasSubmissionFile = true
    },
    removeFile(file, fileList) {
      this.hasFile = false
    },
    removeSubmissionFile(file, fileList) {
      this.hasSubmissionFile = false
    },
    goEditPage() {
      this.$router.push({ name: 'editOrder', params: { order: this.order }})
    },
    deleteOrder() {
      deleteOrder(this.order.id).then(response => {
        this.$message({
          message: 'delete succeed',
          type: 'success'
        })
        this.$router.go(-1)
      })
    },
    deleteMsg(msgId) {
      deleteDiscussion(msgId).then(response => {
        this.$message({
          message: 'delete succeed',
          type: 'success'
        })
        const data = { order_id: this.order.id }
        getDiscussion(data).then(response => {
          this.msgList = response.data
        })
      }).catch(err => {
        console.log(err)
        if (err.response.status === 403) {
          this.$message({
            message: 'No permission',
            type: 'error'
          })
        }
        const data = { order_id: this.order.id }
        getDiscussion(data).then(response => {
          console.log(response)
          this.msgList = response.data
          this.showMsg = false
          this.$nextTick(() => {
            this.showMsg = true
          })
          // location.reload()
          // this.$router.go(0)
        })
      })
    },
    formatMinutes,
    statusToString
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
  /* height: 40px; */
  line-height: 40px;
}
.item {
  font-weight: 600;
}
.app-container /deep/ .el-row {
  display: flex;
  align-items: center;
}
</style>

