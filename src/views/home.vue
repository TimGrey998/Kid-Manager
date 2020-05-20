<template>
  <div>
    <div class="container">
      <div class="userWrap">
        <div class="nav-bar">
          <button @click="pointMan">积分管理</button>
          <button @click="pointMar">积分商城</button>
        </div>
        <div class="point-man" v-show="showPointMan">
          <h3>当前用户：{{ userName }} 积分：{{ point }}</h3>
          <button @click="adminWrap">管理员按钮</button>
          <div class="adminWrap" v-show="showAdminWrap">
            <input
              type="text"
              placeholder="等待输入中..."
              v-model="changedPoint"
            />
            <button @click="setPoint">修改</button>
          </div>
        </div>
        <div class="point-mar" v-show="showPointMar">
          <h3>剩余积分：{{ point }}</h3>
          <h4>兑换游戏抽奖机会(一天仅限兑换两次)</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      point: this.$http.post("api/user/point", this.userName),
      showPointMan: true,
      showPointMar: false,
      showAdminWrap: false,
      userName: this.defined.userName,
      changedPoint: 0,
      tasks: [
        {
          value: "完成全天学习任务",
          point: 15
        },
        {
          value: "洗碗",
          point: 5
        }
      ]
    };
  },
  mounted() {
    this.getPoint();
  },
  methods: {
    getPoint() {
      var data = { username: this.userName };
      this.$http.post("api/user/point", data).then(res => {
        console.log(res.body[0].point);
        this.point = res.body[0].point;
      });
    },
    pointMan() {
      this.showPointMan = true;
      this.showPointMar = false;
    },
    pointMar() {
      this.showPointMan = false;
      this.showPointMar = true;
    },
    addPoint(index) {
      var arr = this.tasks;
      this.point += arr[index].point;
      arr.splice(index, 1);
    },
    adminWrap() {
      this.showAdminWrap = !this.showAdminWrap;
    },
    setPoint() {
      this.changedPoint = "";
    }
  }
};
</script>

<style scoped>
@import "../style/homePage";
</style>
