export default ({ app }, inject) => {
  const permission = check => {
    if (!app.store.$auth.loggedIn || !app.store.$auth.user.permissions) { return false }

    if (!app.store.$auth.user.permissions.includes(check)) { return false }

    return true
  }

  inject('permission', permission)
}