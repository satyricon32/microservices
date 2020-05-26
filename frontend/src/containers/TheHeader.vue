<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    >
      <CIcon name="cil-menu" />
    </CToggler>
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CNavbarBrand href="#">
        <img src="/logo.png" class="d-inline-block align-top" alt="CoreuiVue" />
        StomSystem
      </CNavbarBrand>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto" v-if="$store.state.user.permissions">
      <CHeaderNavItem class="px-3" v-if="$can($store.state.user, 'admin')">
        <CHeaderNavLink to="/dashboard" >
          Администрирование 
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3" v-if="$can($store.state.user, 'register')">
        <CHeaderNavLink to="/registry" exact >
          Регистратура
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3" v-if="$can($store.state.user, 'accounter')">
        <CHeaderNavLink to="/accounting" exact >
          Бухгалтерия
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3" v-if="$can($store.state.user, 'tester')">
        <CHeaderNavLink to="/tests" exact >
          Тестирование
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="d-md-down-none mx-2" v-if="dark">
        <a href="#" class="c-header-nav-link" @click="toggleDark">
          <CIcon name="cil-sun" />
        </a>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2" v-else>
        <a href="#" class="c-header-nav-link" @click="toggleDark">
          <CIcon name="cil-moon" />
        </a>
      </CHeaderNavItem>
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt
  },
  computed: {
    dark() {
      return this.$store.state.dark;
    }
  },
  methods: {
    toggleDark(e) {
      e.preventDefault();
      console.log(this.dark);
      this.$store.commit("toggleDark");
    }
  }
};
</script>
