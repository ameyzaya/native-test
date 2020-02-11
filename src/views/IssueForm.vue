<template>
  <div class="container">
    <div class="form">
      <div class="form-header">Issue Form</div>
      <div class="form-content">
        <div class="form-field">
          <div class="title" style="padding-top:4%;">Issue Title*</div>
          <div class="content">
            <a-textarea
              v-model="title"
              :autosize="{ minRows: 2, maxRows: 2 }"
              @change="error.title = ''"
            ></a-textarea>
            <div class="errors">
              <span>{{error.title}}</span>
            </div>
          </div>
        </div>
        <a-divider class="divider" />
        <div class="form-field">
          <div class="title" style="padding-top:4%;">Issue Description*</div>
          <div class="content">
            <a-textarea
              v-model="description"
              :autosize="{ minRows: 4, maxRows: 6 }"
              @change="error.description = ''"
            ></a-textarea>
            <div class="errors">
              <span>{{error.description}}</span>
            </div>
          </div>
        </div>
        <a-divider class="divider" />
        <div class="form-field">
          <div class="title" style="padding-top:2%;">Product*</div>
          <div class="content">
            <a-select
              v-model="product"
              placeholder="Select Product"
              style="width: 60%"
              @change="error.product = ''"
            >
              <a-select-option v-for="item in productList" :key="item.id">{{item.name}}</a-select-option>
            </a-select>
            <div class="errors">
              <span>{{error.product}}</span>
            </div>
          </div>
        </div>
        <div class="form-field">
          <div class="title" style="padding-top:2%;">Priority*</div>
          <div class="content">
            <a-select
              v-model="priority"
              placeholder="Select Priority"
              style="width: 60%"
              @change="error.product = ''"
            >
              <a-select-option v-for="item in priorityList" :key="item.id">{{item.title}}</a-select-option>
            </a-select>
            <div class="errors">
              <span>{{error.product}}</span>
            </div>
          </div>
        </div>
        <div class="form-field">
          <div class="title" style="padding-top:2%;">Email Address*</div>
          <div class="content">
            <a-input v-model="email" type="text" style="width: 60%;" @change="error.email = ''"></a-input>
            <div class="errors">
              <span>{{error.email}}</span>
            </div>
          </div>
        </div>
        <div class="form-field">
          <div class="title" style="padding-top:5%;">Attach File</div>
          <div class="content" style="padding-top:4.3%;">
            <input type="file" @change="handleFileUpload" multiple />
          </div>
        </div>
        <div class="button-container">
          <a-button type="primary" style="background-color: #00a7e7" @click="handleSubmit">Submit</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { VFileInput } from "vuetify/lib";
import { PostIssue } from "@/api/issue.js";
import { ProductList } from "@/api/product.js";
// import { Button, Input, Select } from "ant-design-vue";

export default {
  name: "IssueForm",
  data: function() {
    return {
      title: "",
      description: "",
      product: "",
      productList: [],
      priority: "",
      priorityList: [
        { id: "1", title: "Low Priority" },
        { id: "2", title: "Medium Priority" },
        { id: "3", title: "High Priority" }
      ],
      email: "",
      files: "",
      error: {
        title: "",
        description: "",
        product: "",
        priority: "",
        email: ""
      }
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    handleFileUpload(event) {
      console.log(event.target.files);
    },
    getProductList() {
      ProductList()
        .then(response => {
          console.log(response.data);
          this.productList = response.data;
        })
        .error(error => {
          console.log(error);
        });
    },
    handleSubmit() {
      if (!this.title.length) this.error.title = "title is required";
      if (!this.product.length) this.error.product = "product is required";
      if (!this.priority.length) this.error.priority = "priority is required";
      if (!this.email.length) this.error.email = "email is required";
      if (
        this.title.length &&
        this.product.length &&
        this.priority.length &&
        this.email.length
      ) {
        console.log("posting");

        let payload = {
          title: this.title,
          description: this.description,
          priority: this.priority,
          client_email: this.email,
          product: this.product
        };
        PostIssue(payload)
          .then(response => {
            console.log(response);
            alert("Issue submitted");
          })
          .error(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  background-color: #eceff1;
}
.form {
  display: flex;
  flex-direction: column;
  width: 45%;
  height: fit-content;
  background-color: #fafafa;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.form-header {
  font-size: 20px;
  width: 100%;
  padding: 3% 2%;
  background-color: #00a7e7;
  /* background-color: #5300e8; */
  color: white;
}
.form-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 5%;
}
.form-field {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.title {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 22%;
  /* padding: 1%; */
  font-size: 16px !important;
}
.content {
  width: 78%;
  padding: 1%;
  justify-content: flex-start;
  align-items: flex-start;
}
.button-container {
  display: flex;
  justify-content: center;
  padding-top: 5%;
}
.errors {
  display: flex;
  height: 16px;
  font-size: 14px;
  margin-bottom: 2%;
}
.errors span {
  color: red;
  margin-left: 2px;
}
.divider {
  background-color: rgba(0, 0, 0, 0.15);
  margin-top: 0;
}
</style>