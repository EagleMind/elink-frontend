// src/services/talentService.js
import axios from 'axios'
export const talentService = {
  getTalents: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/talents`
      )
      console.log("env", import.meta.env.VITE_REACT_APP_BACKEND)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Internal Server Error')
    }
  },

  createTalent: async (data: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND}/talents`,
        data
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Internal Server Error')
    }
  },

  deactivateTalent: async (talentId: any) => {
    try {
      const response = await axios.put(
        `${import.meta.env.REACT_APP_BACKEND}/talents/${talentId}/deactivate`
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Internal Server Error')
    }
  },

  subscribeHeadhunter: async ({ talentId, headhunterId }: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND}/talents/${talentId}/subscribe/${headhunterId}`
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Internal Server Error')
    }
  }
}

export default talentService
