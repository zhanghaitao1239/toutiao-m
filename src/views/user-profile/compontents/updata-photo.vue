<template>
  <div class="updata-photo">
    <img class="img" ref="img" :src="img" alt="" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onconfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css' // 裁切工具css样式
import Cropper from 'cropperjs' // 裁切工具的js
// 导入接口模块
import { updataUserPhotoAPI } from '@/Api/index.js'
export default {
  name: 'UpdataPhoto',
  components: {},
  props: {
    img: {
      // 要裁切的图片
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null, // 裁切完成后的图片
    }
  },

  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 视图模式
      dragMode: 'move', // 拖动模式
      aspectRatio: 1, // 纵横比
      autoCropArea: 1, // 自动裁剪区域
      cropBoxMovable: false, // 裁剪框是否可以移动
      cropBoxResizable: false, // 裁剪框是否可以调整大小
      background: false, // 背景是否需要
      movable: true, // 图片是否可以移动
    })
  },
  methods: {
    // 点击完成后,将裁切完成后的图片发送难服务器
    onconfirm() {
      // 基于服务器的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        // 调用发送到服务器的方法
        this.updataUserPhoto(blob)
      })
    },
    // 将裁切完成的图片结果发送到服务器
    async updataUserPhoto(blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        // 如果接口要求Content-Type是application/json
        // 则传递普通 JavaScript 对象

        // 如果接口要求 Content-Type 是multipart/form-data
        // 则你必须传递 FormData 对象
        const formData = new FormData()
        formData.append('photo', blob)

        const { data } = await updataUserPhotoAPI(formData)
        // 更新视图
        this.$emit('updata-photo', data.data.photo)
        // 关闭弹层
        this.$emit('close')
        // 成功提示
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败,请重试')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.updata-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
