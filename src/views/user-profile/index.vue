<template>
  <div class="user-profile">
    <!-- 头部导航栏 -->
    <van-nav-bar title="个人信息" class="page-nav-bar" left-arrow @click-left="$router.back()" />
    <!-- /头部导航栏 -->
    <!-- 个人信息 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell class="photo-cell" title="头像" is-link center @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdataNameShow = true" />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdataGenderShow = true" />
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdataBirthdayShow = true" />
    <!-- /个人信息 -->
    <!-- 编辑昵称 弹出层 -->
    <van-popup v-model="isUpdataNameShow" position="bottom" style="height: 100%"> <updata-name v-if="isUpdataNameShow" v-model="user.name" @close="isUpdataNameShow = false" /> </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdataGenderShow" position="bottom"> <updata-gender v-if="isUpdataGenderShow" v-model="user.gender" @close="isUpdataGenderShow = false" /> </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdataBirthdayShow" position="bottom"><updata-birthday v-if="isUpdataBirthdayShow" v-model="user.birthday" @close="isUpdataBirthdayShow = false" /> </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->

    <van-popup v-model="isUpdataPhotoShow" position="bottom" style="height: 100%"><updata-photo v-if="isUpdataPhotoShow" :img="img" @close="isUpdataPhotoShow = false" @updata-photo="user.photo = $event" /></van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
// 导入获取用户个人资料接口
import { getuserProfileAPI } from '@/Api/index.js'
// 导入修改昵称组件
import UpdataName from './compontents/updata-name.vue'
// 导入修改性别组件
import UpdataGender from './compontents/updata-gender.vue'
// 导入修改生日组件
import UpdataBirthday from './compontents/updata-birthday.vue'
// 导入修改头像组件
import UpdataPhoto from './compontents/updata-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdataName,
    UpdataGender,
    UpdataBirthday,
    UpdataPhoto,
  },
  props: {},
  data() {
    return {
      user: {}, // 用户个人资料数据
      isUpdataNameShow: false, // 控制昵称弹出层的显示与隐藏
      isUpdataGenderShow: false, // 控制性别弹出层的显示与隐藏
      isUpdataBirthdayShow: false, // 控制生日弹层的显示与隐藏
      isUpdataPhotoShow: false, // 控制头像弹层的显示与隐藏
      img: null, // 预览的图片
    }
  },
  created() {
    // 调用获取用户资料方法
    this.loadUserPofile()
  },
  methods: {
    // 获取用户资料数据
    async loadUserPofile() {
      try {
        const { data } = await getuserProfileAPI()
        // 将请求回来的数据保存到data变量user中
        this.user = data.data
      } catch (err) {
        this.$toast('获取数据失败,请稍后重试')
      }
    },
    // 获取用户选择的文件
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      // const data = window.URL.createObjectURL(file)
      // console.log(data)
      // 将预览的图片保存到img中
      this.img = window.URL.createObjectURL(file)
      // 让弹层显示
      this.isUpdataPhotoShow = true
      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕,把它的value 清空
      this.$refs.file.value = ''
    },
  },
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
