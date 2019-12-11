<template>
  <div class="home">
    <el-card>
      <el-button type="primary" @click="derection(0)">向上转动</el-button>
      <el-button type="success" @click="derection(1)">向下转动</el-button>
      <el-button type="info" @click="derection(2)">向左转动</el-button>
      <el-button type="warning" @click="derection(3)">向右转动</el-button>
      <el-button type="danger" @click="StopCamral">停止转动</el-button>
      <div class="player">
        <div id="dplayer" style="width:600px;height:400px"></div>
      </div>
      <div></div>
    </el-card>
  </div>
</template>

<script>
import "dplayer/dist/DPlayer.min.css";

import DPlayer from "dplayer";
import {
  getCamalToken,
  getCarmalControl,
  getCompanyList,
  getCarmalStop,
  getMock
} from "@/api";
export default {
  name: "home",
  // components: { product, cart },
  data() {
    return {
      accessToken: "",
      expireTime: "",
      derectionswitch: ""
    };
  },
  created() {
    // this.getCom();
    let data = JSON.parse(localStorage.getItem("accessToken"));
    let timestamp = Date.parse(new Date());
    if (timestamp > data.expireTime) {
      console.log(3333);
      this.getToken();
    } else {
      this.accessToken = data.accessToken;
    }
  },
  mounted() {
    this.initDeplayer();
  },
  methods: {
    initDeplayer() {
      const dp = new DPlayer({
        container: document.getElementById("dplayer"),
        autoplay: true,
        theme: "#FADFA3",
        loop: false,
        lang: "zh-cn",
        screenshot: true,
        hotkey: true,
        video: {
          url:
            "http://hls.open.ys7.com/openlive/6ca33613ea9d4139be96d8e210c5761f.hd.m3u8",
          type: "hls"
        }
      });
    },
    async getToken() {
      const res = await getCamalToken(
        "bb677fa1f588469082ff58f42e286758",
        "55555f17b33dca73b4d4cda6eaa1a34b"
      );
      if (res != undefined) {
        this.accessToken = res.data.accessToken;
        this.expireTime = res.data.expireTime;
        let local = {
          accessToken: this.accessToken,
          expireTime: this.expireTime
        };
        localStorage.setItem("accessToken", JSON.stringify(local));
      }
    },
    async derection(data) {
      this.derectionswitch = data;
      const res = await getCarmalControl(this.accessToken, data);
      if (res != undefined) {
        this.$message.success("操作成功");
      }
    },
    async StopCamral() {
      const res = await getCarmalStop(this.accessToken, this.derectionswitch);
      if (res != undefined) {
        this.$message.success("停止成功");
      }
    },

    async getCom() {
      const res1 = await getCompanyList();
      if (res1) {
        console.log(res1, 1111);
      }
    }
  }
};
</script>
<style lang="less">
.player {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>
