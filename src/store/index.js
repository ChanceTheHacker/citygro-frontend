import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const url = "https://chat-demo-db.herokuapp.com"

export default new Vuex.Store({
  state: {
    // just storing the userID here, will implement actual auth later to keep tokens secret
    // needless to say, but don't have any private conversations here... This is not secure
    userId: "9049ba9f-8004-4f29-b038-757e463eab03",
    // userId: "",
    conversations: {},
    tracking: 0,
    activeConvo: "18326597981",
    thisPhoneNumber: "16178551376",
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
    },
    setconversations(state, payload) {
      state.conversations = payload;
    },
    setTracking(state, payload) {
      state.tracking = payload;
    },
    setActiveConvo(state, payload) {
      state.activeConvo = payload;
    },
  },
  actions: {
    async attemptLogin(state, info){
      const response = await axios.post(`${url}/signin`, info)
      const userId = response.data.id;
      userId ? state.commit("setUserId", userId) : console.log("Failed")
      return userId ? true : false
    },
    async setActiveConvo(state, info){
      return setActiveConvo(state, info)
    },
    async initialize(state){
      const info = {id: this.state.userId}
      const response = await axios.post(`${url}/messages/update/initialize`, info)
      const conversations = response.data;
      const tracking = parseInt(conversations.tracking)
      if (tracking) state.commit("setTracking", tracking)
      // remove tracking from data so it isn't stored in state.conversations
      delete conversations.tracking
      if (conversations) {
        state.commit("setconversations", conversations)
        return {conversations: conversations, activeConvo: this.state.activeConvo}
      }
    },
    async syncMessages(state){
      const { conversations, userId, tracking } = this.state
      const info = {id: userId, tracking: tracking}
      const response = await axios.post(`${url}/messages/update/sync`, info)
      const newMessages = response.data;
      const newTracking = parseInt(newMessages.tracking)
      if(newTracking) {
        state.commit("setTracking", newTracking)
        // remove tracking from data so it isn't stored in state.conversations
        delete newMessages.tracking
        // loop through all the new messages, add them to the conversations data we pulled from state
        // this is so we don't need to pull all our messages every single time
        for (const convo in newMessages){
          if (conversations[convo]){
            conversations[convo].messages = conversations[convo].messages.concat(newMessages[convo].messages)
          } else {
            conversations[convo] = newMessages[convo]
          }
        }

        if ( newMessages ) {
          state.commit("setconversations", conversations)
          return {conversations: this.state.conversations, activeConvo: this.state.activeConvo}
        }
        // const tracking = parseInt(conversations[conversations.length - 1].tracking)
        // tracking ? state.commit("setTracking", tracking) : console.log("Failed")
      }
    },
    async attemptSendMsg(state, info){
      info.id = this.state.userId
      const response = await axios.post(`${url}/messages/send`, info)
      const success = (response.status === 200) ? true : false
      if ( success ) state.commit("setActiveConvo", info.to)
      return success
    },
  },
  modules: {
  },
  getters: {
    getUserId: state => state.userId ? state.userId : "",
    isLoggedIn: state => state.userId ? true : false,
    getConversations: state => state.conversations
  }
})
