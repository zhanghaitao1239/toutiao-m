<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" :column-num="4" class="my-grid">
      <van-grid-item class="grid-item" v-for="(item, index) in MyChannels" :key="index" @click="onMychannelClick(item, index)">
        <van-icon slot="icon" name="clear" v-show="isEdit && !fiexChannels.includes(item.id)"></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{ item.name }} </span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10" :column-num="4">
      <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" :key="index" icon="plus" :text="channel.name" @click="onAddChannel(channel)" />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
// 目标1：使用vant 组件中的弹出层组件，渲染页面
// 目标2：请求频道数据，并渲染到页面上
// 目标3：使用计算属性来显示 响应式我的频道和推荐频道中的数据
// 目标4：点击编辑按钮进行删除和跳转到对应的频道
// 目标5：频道编辑，让数据持久化
// 目标6：删除频道，数据持久化
// 导入获取所有频道列表接口
import { getChannelAllAPI, addUserChannelAPI, deleteUserChannelAPI } from '@/Api/index.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'channel-edit',
  props: {
    myChannels: {
      // 我的频道列表
      type: Array,
      required: true,
    },
    active: {
      // 激活状态
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      MyChannels: this.myChannels, // 我的频道的数据
      channelAll: [], // 所有频道数据
      isEdit: false, // 控股是否显示删除图标
      fiexChannels: [0], // 固定频道，不允许删除
    }
  },
  created() {
    // 调用获取所有频道的方法
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    // 计算频道推荐响应式数据
    recommendChannels() {
      return this.channelAll.filter((channel) => {
        return !this.MyChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
      // const channels = []
      // this.channelAll.forEach((channel) => {
      //   // find 遍历数组，找满足条件的元素项
      //   const ret = this.myChannels.find((myChannel) => {
      //     return myChannel.id === channel.id
      //   })
      //   // 如果我的频道中不包括该频道项，则收集到推荐频道中
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // // 把计算结果返回
      // return channels
    },
  },
  methods: {
    // 获取所有频道的数据
    async loadAllChannels() {
      try {
        const { data } = await getChannelAllAPI()
        this.channelAll = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 点击将频道推荐当前项添加到我的频道里
    async onAddChannel(channel) {
      this.MyChannels.push(channel)

      // 5.1 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannelAPI({
            id: channel.id, // 频道ID
            seq: this.MyChannels.length, // 序号
          })
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.MyChannels)
      }
    },
    // 点击修改我的频道
    onMychannelClick(item, index) {
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.fiexChannels.includes(index)) {
          return this.$toast('固定频道不允许删除!')
        }
        // 编辑状态，则执行删除频道
        if (index <= this.active) {
          // 让激活频道的索引-1
          this.$emit('UpdataActive', this.active - 1, true)
        }
        this.MyChannels.splice(index, 1)
        // 6.1处理持久化
        // 调用删除方法
        this.deleteChannel(item)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('UpdataActive', index, false)
      }
    },
    // 删除持久化方法
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，则数据更新到线上
          await deleteUserChannelAPI(channel.id)
        } else {
          // 未便当，将数据存储到本地
          setItem('TOUTIAO_CHANNELS', this.MyChannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  // 编辑按钮
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border-color: #f85959;
  }
  // 我的频道
  /deep/.my-grid {
    .van-icon-clear {
      position: absolute;
      top: -12px;
      right: -9px;
      color: #cacaca;
      z-index: 2;
    }
    .van-grid-item__icon {
      font-size: 36px;
    }
    .active {
      color: #f85959;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      font-size: 28px;
      color: #222;
      .van-grid-item__text,
      .text {
        margin-top: 0;
      }
    }
  }
  // 推荐频道
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
