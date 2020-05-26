<template>
  <div :class="{ 'c-app': true, 'c-dark-theme': dark }">
    <TheSidebar :tab.sync="tab" />
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <TheFooter />
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  mounted() {
    var user = this.$store.state.user
    if (!user.permissions) {
      this.$http
        .get(this.$api.uInfo)
        .then(res => {
          this.$store.commit('setUser', res.data)
          console.log(res.data, this.$store.state.user)
        })
        .catch(err => {
          console.log(err);
          this.$router.push({ path: "/503" });
        });
    }
  },
  computed: {
    tab() {
      return this.$router.currentRoute.meta.tab;
    },
    dark() {
      return this.$store.state.dark;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
