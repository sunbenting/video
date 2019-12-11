<template>
  <div>
    <h1>cart</h1>
    <ul style="list-style:none">
      <li v-for="item in productCarts" :key="item.id" style="margin-bottom:10px">
        <span>商品名称：{{item.name}}====></span>
        <span>商品价格：${{item.price}}====></span>
        <span>购买商品数量：{{item.number}}</span>
      </li>
    </ul>
    <span>总计:{{total}}</span>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("cart", { productCarts: "carts" }),
    ...mapGetters("cart", ["total"])
  }
};
</script>