function crud(name) {
  return [name, 'create-' + name, 'read-' + name, 'update-' + name, 'delete-' + name]
}
export default {
  admin: {
    title: "Админинстратор",
    name: 'admin',
    permissions: ['admin', 'dashboard', ...crud('users'), ...crud('roles'), ...crud('patients'), ...crud('bills')]
  },
  register: {
    title: "Админинстратор",
    name: 'register',
    permissions: ['register', ...crud('patients'),]
  },
  accounter: {
    title: "Админинстратор",
    name: 'accounter',
    permissions: ['accounter', ...crud('bills')]
  },
}