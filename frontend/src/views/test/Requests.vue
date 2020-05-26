<template>
  <CRow>
    <CCol col="12" v-for="(card, i) in cards" :key="i">
      <CCard>
        <CCardHeader
          @click="card.collapse = !card.collapse"
          class="btn text-left"
        >
          <strong
            >{{ card.title }}
            {{
              card.responseTime
                ? `(Время выполнения запроса: ${card.responseTime}мс)`
                : ""
            }}</strong
          >
        </CCardHeader>
        <CCollapse :show="card.collapse">
          <CCardBody class="m-1">
            {{ card.text }} по адрессу {{ card.url }} методом {{ card.method }}
            <br />
            <br />
            <CButton @click="makeRequest(card)" color="primary"
              >Выполнить запрос</CButton
            >
            <br />
            <br />
            <CRow>
              <CCol col="6">
                <CRow>
                  <CCol col="12" v-if="card.data">
                    <CSwitch
                      :checked.sync="cards[i].dataEditable"
                      color="primary"
                    />
                    Тело запроса:

                    <pre v-if="!card.dataEditable">{{ card.data }}</pre>
                    <div v-else>
                      <CInput
                        horizontal
                        v-for="(d, j) in card.data"
                        v-model="card.data[j]"
                        :key="`${i}_${j}`"
                      />
                    </div>
                  </CCol>
                  <CCol col="12" v-if="card.header">
                    <CSwitch
                      :checked.sync="cards[i].headerEditable"
                      color="primary"
                    />
                    Шапка запроса:
                    <pre v-if="!card.headerEditable">{{ card.header }}</pre>
                    <div v-else>
                      <CInput
                        horizontal
                        v-for="(d, j) in card.header"
                        v-model="card.header[j]"
                        :key="`${i}_${j}`"
                      />
                    </div>
                  </CCol>
                  <CCol col="12" v-if="card.arg">
                    <CSwitch
                      :checked.sync="cards[i].argEditable"
                      color="primary"
                    />
                    Аргумент запроса:
                    <pre v-if="!card.argEditable">{{ card.arg }}</pre>
                    <div v-else>
                      <CInput horizontal v-model="card.arg" />
                    </div>
                  </CCol>
                </CRow>
              </CCol>

              <CCol col="6" v-if="card.response">
                Ответ сервера:
                <pre
                  >{{ card.response }}
                </pre>
              </CCol>
            </CRow>
          </CCardBody>
        </CCollapse>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { config } from "@/plugins/config";
import { urls } from "@/plugins/api";
import axios from "axios";
var testToken = localStorage.getItem("testToken");
export default {
  name: "TestRequests",
  data: () => ({
    cards: {
      auth: {
        collapse: false,
        method: "post",
        dataEditable: false,
        data: {
          username: "test",
          password: "test",
          grant_type: "password",
          client_id: config.auth.client_id,
          client_secret: config.auth.client_secret
        },
        callbackType: "vue",
        callback: "updateToken",
        response: null,
        url: urls.login,
        text: "Запрос для аутентефикации ",
        title: "Аутентефикация "
      },
      info: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        response: null,
        url: urls.uInfo,
        title: "Получение информации пользователя ",
        text: "Запрос на получение пользовательской информации "
      },
      usersAll: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        response: null,
        url: urls.users,
        title: "Получение списка пользователей ",
        text: "Запрос на получение списка пользователей "
      },
      usersCreate: {
        collapse: false,
        method: "post",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        data: {
          username: "test2",
          password: "test2",
          permissions: ["tester"],
          firstname: "Тест",
          lastname: "Тестов",
          middlename: "Тестович",
          position: "Тестовый сотрудник 2",
          role: "Тестировщик"
        },
        response: null,
        callback: "updateUserId",
        callbackType: "vue",
        url: urls.users,
        title: "Добавление пользователя",
        text: "Запрос на создание нового пользователя "
      },
      usersUpdate: {
        collapse: false,
        method: "put",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        data: {
          firstname: "Тест Updated",
          lastname: "Тестов Updated",
          middlename: "Тестович Updated"
        },
        arg: "userId",
        argName: "userId",
        argEditable: true,
        response: null,
        callback: "updateUserId",
        callbackType: "vue",
        url: urls.users,
        title: "Обновление пользователя",
        text: "Запрос на создание нового пользователя "
      },
      usersGet: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        arg: "userId",
        argName: "userId",
        argEditable: true,
        callback: "updateUserId",
        callbackType: "vue",
        response: null,
        url: urls.users,
        title: "Получение информации пользователя",
        text: "Запрос на получение информации пользователя по id"
      },
      usersDelete: {
        collapse: false,
        method: "delete",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        arg: "userId",
        argName: "userId",
        argEditable: true,
        response: null,
        url: urls.users,
        title: "Удаление пользователя",
        text: "Запрос на удаление нового пользователя "
      },
      patientsAll: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        response: null,
        url: urls.patients,
        title: "Получение списка пациентов ",
        text: "Запрос на получение списка пациентов "
      },
      patientsCreate: {
        collapse: false,
        method: "post",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        data: {
          firstname: "Пациент",
          lastname: "Тестовый",
          middlename: "Пациентович",
          phone: "+998 99 999-99-99",
          birthdate: "12.12.2012"
        },
        response: null,
        callback: "uptdatePatientId",
        callbackType: "vue",
        url: urls.patients,
        title: "Добавление пациента",
        text: "Запрос на создание нового пациента "
      },
      patientsUpdate: {
        collapse: false,
        method: "put",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        data: {
          firstname: "Пациент",
          lastname: "Обновленный",
          middlename: "Пациентович",
          phone: "+998 99 999-99-22",
          birthdate: "11.11.2011"
        },
        arg: "patientId",
        argName: "patientId",
        argEditable: true,
        response: null,
        callback: "uptdatePatientId",
        callbackType: "vue",
        url: urls.patients,
        title: "Обновление пациента",
        text: "Запрос на создание нового пациента "
      },
      patientsGet: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        arg: "patientId",
        argName: "patientId",
        argEditable: true,
        callback: "uptdatePatientId",
        callbackType: "vue",
        response: null,
        url: urls.patients,
        title: "Получение информации пациента",
        text: "Запрос на получение информации пациента по id"
      },
      patientsDelete: {
        collapse: false,
        method: "delete",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        arg: "patientId",
        argName: "patientId",
        argEditable: true,
        response: null,
        url: urls.patients,
        title: "Удаление пациента",
        text: "Запрос на удаление нового пациента "
      },
      appointmentsAll: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        response: null,
        url: urls.appointments,
        title: "Получение списка приемов ",
        text: "Запрос на получение списка приемов "
      },
      appointmentsCreate: {
        collapse: false,
        method: "post",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        data: {
          patient_id: 1,
          doctor_fio: "Тестовый Доктор Докторович",
          doctor_id: "doctor_id",
          time: new Date(),
          list: ["Лечение зуба 1", "Осмотр зуба 2"]
        },
        response: null,
        callback: "uptdateAppointmentId",
        callbackType: "vue",
        url: urls.appointments,
        title: "Добавление приема",
        text: "Запрос на создание нового приема "
      },
      appointmentsUpdate: {
        collapse: false,
        method: "put",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        data: {
          patient_id: 1,
          doctor_fio: "Тестовый Доктор Докторович",
          doctor_id: "doctor_id",
          time: new Date(),
          list: ["Лечение зуба 2", "Осмотр зуба 3"]
        },
        arg: "appointmentId",
        argName: "appointmentId",
        argEditable: true,
        response: null,
        callback: "uptdateAppointmentId",
        callbackType: "vue",
        url: urls.appointments,
        title: "Обновление приема",
        text: "Запрос на создание нового приема "
      },
      appointmentsGet: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        arg: "appointmentId",
        argName: "appointmentId",
        argEditable: true,
        callback: "uptdateAppointmentId",
        callbackType: "vue",
        response: null,
        url: urls.appointments,
        title: "Получение информации приема",
        text: "Запрос на получение информации приема по id"
      },
      appointmentsDelete: {
        collapse: false,
        method: "delete",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        arg: "appointmentId",
        argName: "appointmentId",
        argEditable: true,
        response: null,
        url: urls.appointments,
        title: "Удаление приема",
        text: "Запрос на удаление нового приема "
      },
      billsAll: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        response: null,
        url: urls.bills,
        title: "Получение списка чеков оплаты ",
        text: "Запрос на получение списка чеков оплаты "
      },
      billsCreate: {
        collapse: false,
        method: "post",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        data: {
          amount: 1000000,
          type: ["Лечение зуба 2", "Осмотр зуба 3"].join(", "),
          paymentType: 'Картой',
          firstname: "Тест",
          lastname: "Тестов",
          middlename: "Тестович",
          patient_id: 5,
          appointment_id: 2,
          doctor_id: "doctorId",
        },
        response: null,
        callback: "updateBillId",
        callbackType: "vue",
        url: urls.bills,
        title: "Добавление чека оплаты",
        text: "Запрос на создание нового чека оплаты "
      },
      billsUpdate: {
        collapse: false,
        method: "put",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        data: {
          amount: 1000000,
          type: ["Лечение зуба 2", "Осмотр зуба 3"].join(", "),
          paymentType: 'Наличными',
          firstname: "Тест",
          lastname: "Тестов",
          middlename: "Тестович",
          patient_id: 5,
          appointment_id: 2,
          doctor_id: "doctorId",
        },
        arg: "billId",
        argName: "billId",
        argEditable: true,
        response: null,
        callback: "updateBillId",
        callbackType: "vue",
        url: urls.bills,
        title: "Обновление чека оплаты",
        text: "Запрос на создание нового чека оплаты "
      },
      billsGet: {
        collapse: false,
        method: "get",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        arg: "billId",
        argName: "billId",
        argEditable: true,
        callback: "updateBillId",
        callbackType: "vue",
        response: null,
        url: urls.bills,
        title: "Получение информации чека оплаты",
        text: "Запрос на получение информации чека оплаты по id"
      },
      billsDelete: {
        collapse: false,
        method: "delete",
        dataEditable: false,
        headerEditable: false,
        header: {
          Authorization: "Bearer " + testToken,
          Accept: "application/json"
        },
        arg: "billId",
        argName: "billId",
        argEditable: true,
        response: null,
        url: urls.bills,
        title: "Удаление чека оплаты",
        text: "Запрос на удаление нового чека оплаты "
      },

    },
    cardCollapse: {
      auth: false
    },
    http: axios.create()
  }),
  notifications: {
    shwRequestSuccess: {
      title: "Ок",
      message: "Запрос выполнен успешно",
      type: "success"
    },
    shwRequestError: {
      title: "Ошибка",
      message: "Произошла ошибка при попытке отправить запрос",
      type: "error"
    }
  },
  mounted() {
    testToken = localStorage.getItem("testToken");
  },
  methods: {
    updateUserId(d) {
      console.log(d);
      if(!d.data)
        d.data = {...d}
      let id = d.data._id;
      for (var i in this.cards) {
        let e = this.cards[i];
        if (e.data) {
          if (e.data.doctor_id != undefined) this.cards[i].data.doctor_id = id;
          if (e.data.doctor_fio != undefined)
            this.cards[i].data.doctor_fio =
              d.data.lastname +
              " " +
              d.data.firstname +
              " " +
              d.data.middlename;
        }
        if (e.argName == "userId") this.cards[i].arg = id;
      }
    },
    updateBillId(d) {
      console.log(d);
      let id = d.id;
      for (var i in this.cards) {
        let e = this.cards[i];
        if (e.argName == "billId") this.cards[i].arg = id;
      }
    },
    uptdatePatientId(d) {
      console.log(d);
      let id = d.id;
      for (var i in this.cards) {
        let e = this.cards[i];
        if (e.argName == "patientId") this.cards[i].arg = id;
        if (e.data)
          if (e.data.patient_id != undefined) this.cards[i].data.patient_id = id;
      }
    },
    uptdateAppointmentId(d) {
      console.log(d);
      let id = d.id;
      for (var i in this.cards) {
        let e = this.cards[i];
        if (e.argName == "appointmentId") this.cards[i].arg = id;
        if (e.data)
          if (e.data.appointment_id) this.cards[i].data.appointment_id = id;
      }
    },
    updateToken(d) {
      let token = d.access_token;
      for (var i in this.cards) {
        let e = this.cards[i];
        if (e.header) {
          localStorage.setItem("testToken", token);
          this.cards[i].header["Authorization"] = "Bearer " + token;
        }
      }
    },
    makeRequest(card) {
      var arg = card.arg ? card.arg : "";
      if (card.header) {
        for (var i in card.header) {
          if (!this.http.defaults.headers.common[i])
            this.http.defaults.headers.common[i] = card.header[i];
        }
        this.http.defaults.headers.common = card.header;
      }
      let start = +new Date();
      this.http[card.method](card.url + arg, card.data)
        .then(res => {
          card.response = res.data;
          this.shwRequestSuccess();
          let end = +new Date();
          card.responseTime = end - start;
          if (card.callback) {
            if (card.callbackType == "vue") {
              this[card.callback](res.data);
            } else {
              card.callback(res.data);
            }
          }
        })
        .catch(e => {
          let end = +new Date();
          var message = e;
          if (e.response) {
            message = e.response;
          }
          card.responseTime = end - start;
          console.log(message);
          card.response = message;
          this.shwRequestError();
        });
    }
  }
};
</script>
