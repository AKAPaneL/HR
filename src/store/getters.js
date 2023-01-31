const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userId: state => state.user.userInfo.userId,
  name: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto
}
export default getters
