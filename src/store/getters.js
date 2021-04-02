const getters = {
  addRoutes: addRoutes => addRoutes,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  college: state => state.user.college,
  userNumber: state => state.user.userNumber,
}
export default getters
