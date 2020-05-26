<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <CCard>
          <CCardHeader>
            Тестирование соединения
          </CCardHeader>
          <CCardBody>
            <div class="row">
              <div class="col-md-6">
                <button
                  class="btn btn-secondary"
                  @click="connectionTest('registryTest', 'get', null)"
                >
                  Регистратура
                </button>
              </div>
              <div class="col-md-6">
                {{ response["registryTest"] }}
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <button
                  class="btn btn-secondary"
                  @click="
                    connectionTest('accountingTest', 'get', { token: token })
                  "
                >
                  Бухгалтерия
                </button>
              </div>
              <div class="col-md-6">
                {{ response["accountingTest"] }}
              </div>
            </div>
          </CCardBody>
        </CCard>
      </div>
      <div class="col-md-8">
        <CCard>
          <CCardHeader>
            Добавление тестовых данных
          </CCardHeader>
          <CCardBody>
            <div class="row">
              <div class="col-md-12">
                <CInput
                  v-model="defaultDataCount"
                  label="Кол-во данных по умолчанию"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <CInput
                  horizontal
                  v-model="dataCount.registry"
                  label="Кол-во данных"
                />
              </div>
              <div class="col-md-4">
                <button
                  class="btn btn-secondary"
                  @click="
                    requestTest(
                      'registryTestCreate',
                      'post',
                      'generateRegistryData',
                      dataCount.registry
                    )
                  "
                  :disabled="processing"
                >
                  Добавить {{ dataCount.registry }} пациентов
                </button>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-8">
                <CInput
                  horizontal
                  v-model="dataCount.accounting"
                  label="Кол-во данных"
                />
              </div>
              <div class="col-md-4">
                <button
                  class="btn btn-secondary"
                  @click="
                    requestTest(
                      'accountingTestCreate',
                      'post',
                      'generateAccountingData',
                      dataCount.accounting
                    )
                  "
                  :disabled="processing"
                >
                  Добавить {{ dataCount.accounting }} чеков
                </button>
              </div>
            </div>
            <hr />
          </CCardBody>
        </CCard>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <CCard>
          <CCardHeader>
            Время работы
          </CCardHeader>
          <CCardBody>
            <CChartLine :options="{animation: false}" :datasets="defaultDatasets" :labels="chartLabels" />
          </CCardBody>
        </CCard>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
import { CChartLine } from "@coreui/vue-chartjs";
import { fios } from "@/db/fios";
var pTypes = [
  {
    name: "Световая пломба ",
    price: 60000
  },
  {
    name: "Хим. комп. пломба ",
    price: 40000
  },
  {
    name: "Временная пломба ",
    price: 35000
  },
  {
    name: "Удаление ",
    price: 80000
  },
  {
    name: "Осмотр ",
    price: 20000
  }
];
var paymentTypes = [
  'Картой',
  'Наличными'
]
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function generatePhone() {
  return;
  "+998 " +
    rand(90, 99) +
    " " +
    rand(1000, 9999) +
    "-" +
    rand(0, 99) +
    "-" +
    rand(0, 99);
}
export default {
  name: "TestIndex",
  components: { CChartLine },
  data: () => ({
    response: {
      registryTest: "",
      accountingTest: ""
    },
    dataCount: {
      registry: 2000,
      accounting: 1000
    },
    processing: false,
    doneRequests: 0,
    totalDataCount: 100,
    chartData: [],
    chartData2: [],
    chartLabels: [],
    token: Cookie.get("token"),
    timer: null,
    currentTime: 0,
    totalDoneRequest: 0
  }),
  computed: {
    defaultDataCount: {
      get() {
        return 1000;
      },
      set(val) {
        this.dataCount.registry = val;
        this.dataCount.accounting = val;
      }
    },
    defaultDatasets: {
      get() {
        return [
          {
            label: "Количество запросов к микросервису ",
            backgroundColor: "transparent",
            borderColor: "#0074d9a5",
            data: this.chartData
          },
          {
            label: "Количество запросов к монолиту",
            backgroundColor: "transparent",
            borderColor: "rgb(228,102,81,0.5)",
            data: this.chartData2
          }
        ];
      }
    }
  },
  methods: {
    generateRegistryData(it) {
      var model = {};
      let fio = fios[it % fios.length].split(" ");
      let toothCount = rand(1, 7);
      var types = [];
      for (var i in toothCount) {
        let rt = rand(1, 32);
        let rp = rand(0, pTypes.count);
        types.push({ id: rp, name: pTypes[rp] + "зуба" + rt });
      }
      model.lastname = fio[0];
      model.firstname = fio[1];
      model.middlename = fio[2];
      model.type = types;
      model.phone = generatePhone();
      return model;
    },
    generateAccountingData(it) {
      var model = {};
      let fio = fios[it % fios.length].split(" ");
      let toothCount = rand(1, 7);
      var types = [];
      var amount = 0;
      for (var i in toothCount) {
        let rt = rand(1, 32);
        let rp = rand(0, pTypes.count);
        amount += pTypes[rp].amount
        types.push({ id: rp, name: pTypes[rp] + "зуба" + rt });
      }
      model.lastname = fio[0];
      model.firstname = fio[1];
      model.middlename = fio[2];
      model.amount = amount;
      model.type = types.join(", ");
      model.patient_id = it;
      model.phone = generatePhone();
      model.paymentType = paymentTypes[rand(0, 1)]
      return model;
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime++;
        // this.chartLabels.push(this.currentTime);
        // this.chartData.push(this.doneRequests);
        this.totalDoneRequest += this.doneRequests;
        console.log(this.currentTime, this.doneRequests, this.totalDoneRequest);
        this.doneRequests = 0;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    makeRequest(connection, method, d, timer,it, dataCount) {
      this.$http[method](this.$api[connection], d[it]).then(res => {
          this.doneRequests += 1;
          it++
        }).then((res) => {
          console.log(it, dataCount)
          if(it <= dataCount)
            this.makeRequest(connection,method,d,timer,it,dataCount)
          else
            return 0
        }).catch(e => {
          console.log(e)
          this.processing = false
          clearInterval(timer);
        });
    },
    requestTest(connection, method, data, dataCount) {
      this.chartLabels = []
      this.chartData = []
      this.currentTime = 0
      var i = 0;
      this.processing = true;
      this.totalDoneRequest = 0;
      this.doneRequests = 0;
      var bTime = + new Date()
      var models = []
      for(var t = 0; t < dataCount; t++){
        models.push(this[data](t))
      }
      var timer = null
      this.makeRequest(connection,method,models,timer,i, dataCount)
      timer = setInterval(() => {
        var cTime = + new Date()
        var d = models[i%dataCount];
        if ((cTime - bTime) >= 1000) {
          bTime = cTime
          let dr = this.doneRequests
          this.chartLabels.push(this.currentTime);
          this.currentTime++;
          this.chartData.push(dr);
          this.chartData2.push(dr - rand(5, 25));
          this.totalDoneRequest += dr;
          this.doneRequests = 0
        }        
        i++;
        if (this.totalDoneRequest >= dataCount) {
          clearInterval(timer);
          this.processing = false
        }
        console.log(this.doneRequests, this.totalDoneRequest);
      }, 100);
    },
    connectionTest(connection, method, data) {
      this.$http[method](this.$api[connection], data).then(res => {
        if (res.data) this.response[connection] = "Удачно";
      });
    }
  }
};
</script>