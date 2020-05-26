<template>
  <div>
    <c-row>
      <c-col col="12">
        <CCard>
          <CCardHeader>
            Пользователи
            <CButton @click="addItem" color="success" style="float:right; margin:-5px 0 -5px"><CIcon name="cil-user-follow" /> Добавить пользователя</CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              hover
              striped
              :items="items"
              :fields="tableFields"
              :items-per-page="10"
              :active-page="activePage"
              @row-clicked="rowClicked"
              :pagination="{ doubleArrows: false, align: 'center' }"
              @page-change="pageChange"
            >
              <template #action="data">
                <td>
                  <CButton color="primary" @click="viewItem(data.item)"> <CIcon name="cil-grid" /> </CButton>
                  <CButton color="warning" @click="editItem(data.item)"> <CIcon name="cil-pencil" /> </CButton>
                  <CButton color="danger" @click="removeItem(data.item, data.index)"> <CIcon name="cil-trash" /> </CButton>
                </td>
              </template>
              <template #fio="data">
                <td>
                  {{data.item.lastname}} {{data.item.firstname}} {{data.item.middlename}}
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </c-col>
      <c-col col="6"> </c-col>
    </c-row>
    <c-row>
      <c-col col="4"> </c-col>
      <c-col col="4"> </c-col>
      <c-col col="4"> </c-col>
    </c-row>
  </div>
</template>
<script>
export default {
  name: "TestDashboard",
  notifications: {
    shwDeleteSuccess: {
      title: "Удалено",
      message: "Удаление прошло успешно",
      type: "success"
    },
    shwDeleteError: {
      title: "Что-то пошло не так",
      message: "Не получилось удалить запись",
      type: "error"
    },
    shwCreateSuccess: {
      title: "Создано",
      message: "Добавление прошло успешно",
      type: "success"
    },
    shwCreateError: {
      title: "Что-то пошло не так",
      message: "Не получилось добавить запись",
      type: "error"
    },
    shwEditSuccess: {
      title: "Изменено",
      message: "Изменение прошло успешно",
      type: "success"
    },
    shwEditError: {
      title: "Что-то пошло не так",
      message: "Не получилось  запись",
      type: "error"
    },
  },
  data: () => ({
    items: [],
    formFields: {
      username: 'Логин',
      password: 'Пароль',
      lastname: 'Фамилия',
      firstname: 'Имя',
      middlename: 'Отчество',
      position: 'Должность',
      permissions: 'Привилегии',
      role: 'Роль',
    },
    selectedItem: null,
    deletedItem: null,
    tableFields: [
      { key: "username", label: "Логин", _classes: "font-weight-bold" },
      { key: "fio", label: "Ф.И.О" },
      { key: "position", label: "Должность" },
      { key: "role", label: "Роль" },
      { key: 'action', label: 'Действия'}
    ],
    activePage: 1,
  }),
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      }
    }
  },
  mounted () {
    this.$http.get(this.$api.users).then(res => {
      this.items = res.data
    })
  },
  methods: {
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },
    viewItem(data) {
      console.log(data)
    },
    editItem(data) {
      console.log(data)
    },
    deleteItem(data, index) {
      this.$http.delete(this.$api.users).then(res => {
        if(res.data = success){
          this.deletedItem = null
          this.items.splice(1, index)
        }
      })
    },
    removeItem(data, index) {
      this.deletedItem = data
    },
    rowClicked (item, index) {
      console.log(item, index)
    },
    pageChange (val) {
      this.$router.push({ query: { page: val }})
    }
  }
};
</script>
