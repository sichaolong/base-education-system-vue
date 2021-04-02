import { login, logout, getInfo } from '@/api/login/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role: '',
    college: '',
    userNumber: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_COLLEGE: (state, college) => {
    state.college = college
  },
  SET_USERNUMBER: (state, userNumber) => {
    state.userNumber = userNumber
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userNumber, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userNumber: userNumber.trim(), password: password }).then(response => {
        const { data } = response
        //console.log(data.token+"debug1")
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        console.log(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        //这里处理后端返回来的数据显示在页面
        const { username, role, college, userNumber } = data


        commit('SET_NAME', username)

        //新增的显示属性
        commit('SET_ROLE', role)
        commit('SET_COLLEGE', college)
        commit('SET_USERNUMBER', userNumber)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        // 重置路由记忆
        resetRouter()
        
        
       
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

