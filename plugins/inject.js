export default (context, inject) => {
  const permission = check => {
    if (!context.store.$auth.loggedIn || !context.store.$auth.user.permissions) { return false }

    if (!context.store.$auth.user.permissions.includes(check)) { return false }

    return true
  }

  inject('permission', permission)
}