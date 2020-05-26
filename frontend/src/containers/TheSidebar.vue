<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="value => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none brand" to="/">
      <img
        src="/logo.png"
        class="d-inline-block align-top"
        alt="CoreuiVue"
        height="40px"
      />
      <span v-if="!minimize">
      StomSystem
      </span>
    </CSidebarBrand>
    <div>

    </div>
    <CRenderFunction flat :content-to-render.sync="$options.nav[$route.meta.tab]" :key="$router.currentRoute.meta.tab"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

export default {
  name: "TheSidebar",
  nav,
  props: {
    tab: {
      type: String
    }
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
    tabs() {
      return this.$options.nav[this.$router.currentRoute.meta.tab]
    }
  },
  watch: {
    tabs(val) {
      console.log(val)
      this.$forceUpdate()
    }
  },
  mounted () {
    console.log(this.$route)
  }
};
</script>
<style scoped>
.brand {
  font-size: 20pt;
  text-decoration: none !important;
}
.brand:hover {
  color: #e1e1e1;
}
</style>