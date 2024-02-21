// src/services/headhunterService.js
import axios from 'axios'

const headhunterService = {
  createHeadhunter: async (data: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND}/headhunters`,
        data
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Internal Server Error')
    }
  },

  subscribeTalent: async (headhunterId: any, talentId: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND
        }/headhunters/${headhunterId}/subscribe/${talentId}`
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Internal Server Error')
    }
  },

  getHeadhunterTalents: async (headhunterId: any) => {
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BACKEND
        }/headhunters/${headhunterId}/talents`
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Internal Server Error')
    }
  }
}

export default headhunterService
