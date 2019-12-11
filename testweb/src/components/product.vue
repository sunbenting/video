<template>
  <div>
    <h1>product</h1>
    <ul style="list-style:none">
      <li v-for="item in product" :key="item.id" style="margin-bottom:10px">
        <span>商品名称：{{item.name}}====></span>
        <span>商品价格：${{item.price}}====></span>
        <span>商品库存数量：{{item.number}}</span>
        <el-button
          type="primary"
          style="margin-left:10px"
          @click="addCart(item)"
          :disabled="item.number==0"
        >加入购物车</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("product", [
      // 映射 this.count 为 store.state.count
      "product"
    ])
  },
  created() {
    this.getProduct();
  },
  methods: {
    ...mapActions("product", ["getProduct"]),
    ...mapActions("cart", ["addCart"])
  }
};
</script>