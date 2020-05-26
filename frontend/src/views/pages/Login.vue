<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm @submit:before="login($event)">
                <h1>Вход</h1>
                <p class="text-muted">
                  Введите логин и пароль для авторизации в системе
                </p>
                <CInput
                  placeholder="Username"
                  autocomplete="username email"
                  v-model="user.username"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                  v-model="user.password"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CRow>
                  <CCol col="12" class="text-center">
                    <CButton color="primary" class="px-4" @click="login($event)"
                      >Войти</CButton
                    >
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import { config as conf } from "../../plugins/config";
import Cookie from "js-cookie";
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    user: {
      password: "",
      username: "",
      grant_type: "password",
      ...conf.auth
    }
  }),
  notifications: {
    shwLoginSuccess: {
      title: "Успешная авторизация",
      message: "Вход выполнен успешно",
      type: "success"
    },
    shwLoginError: {
      title: "Не удалось войти",
      message: "Произошла ошибка при попытке входа в систему",
      type: "error"
    }
  },
  mounted() {
    Cookie.remove("token");
    // Cookie.remove("user");
    sessionStorage.removeItem("user");
    this.$store.commit("setUser", {});
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.$http
        .post(this.$api.login, this.user)
        .then(res => {
          Cookie.set("token", res.data.access_token);
          axios
            .get(this.$api.uInfo, {
              headers: {
                Authorization: "Bearer " + res.data.access_token
              }
            })
            .then(res => {
              var item = this.$router.options.routes.find(route => {
                return route.meta.tab == res.data.permissions[0]
              })
              this.$store.commit("setUser", res.data);
              sessionStorage.setItem("user", JSON.stringify(res.data));
              this.$router.push(item);
            }).catch(e => {
              console.log(e)

            });
          return true;
        })
        .catch(err => {
          console.log(err);
          this.shwLoginError();
        });
    }
  }
};
</script>
