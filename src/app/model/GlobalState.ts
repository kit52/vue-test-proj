import { defaultLocale, locales } from '@/shared/data/Data'
import { COOKIE_TOKEN_NAME } from '@/shared/data/const'
import { getCookieValue, recordCookieValue } from '@/shared/lib/helpers'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useGlobalState = defineStore('GlobalStore', {
  state: () => {
    return {
      token: '',
      auth: false,
      firstName: '',
      lastName: '',
      login: '',
      email: '',
      cookie: '',
      selectedLocale: '0',
      pending: false,
      activateKeyError: false
    }
  },

  actions: {
    setActivateKeyError(val: boolean) {
      this.activateKeyError = val
    },
    setSelectedLocale(val: string) {
      this.selectedLocale = val
    },
    setPending(val: boolean) {
      this.pending = val
    },
    setAuth(val: boolean) {
      this.auth = val
    },

    setCookie(val: string) {
      recordCookieValue(COOKIE_TOKEN_NAME, val, import.meta.env.APP_DOMAIN)
    },
    setFirstName(val: string) {
      this.firstName = val
    },

    setLastName(val: string) {
      this.lastName = val
    },

    setLogin(val: string) {
      this.login = val
    },

    setEmail(val: string) {
      this.email = val
    },
    setData(data: any, token?: string) {
      this.setAuth(true)
      this.setFirstName(data.firstName)
      this.setLastName(data.lastName)
      this.setLogin(data.userName)
      this.setEmail(data.email)
      token ? (this.token = token) : null
      this.auth = true
    },
    resetStore() {
      this.token = ''
      this.auth = false
      this.firstName = ''
      this.lastName = ''
      this.login = ''
      this.email = ''
    },
    setToken(token: string) {
      this.token = token
    },
    setTokenAndCookie(guid?: string) {
      if (guid) {
        this.setToken(guid)
        this.setCookie(guid)
        return guid
      } else {
        const token = getCookieValue(COOKIE_TOKEN_NAME) || ''
        this.setToken(token)
        return token
      }
    },
    authHandler() {
      if (this.getToken()) {
        this.setPending(true)
        axios
          .get(`/login/v2/auth_with_token_site/${this.token}`)
          .then(({ data }) => {
            if (data.is_registered) {
              const selectedLocale =
                locales.find((item) => item.code == data.selected_language) || defaultLocale

              this.setSelectedLocale(data.selected_language)

              this.setData(data, data.token_guid)
            } else {
              this.setToken(getCookieValue(COOKIE_TOKEN_NAME))
            }
          })
          .catch(() => {
            this.setToken(getCookieValue(COOKIE_TOKEN_NAME))
          })
          .finally(() => this.setPending(false))
      }
    },
    updateUserInfo() {
      if (this.getToken()) {
        this.setPending(true)
        axios
          .get(`login/get?token_guid_string=${this.token}`)
          .then(({ data }) => {
            this.setData(data)
          })
          .finally(() => this.setPending(false))
      }
    }
  },
  getters: {
    returnUser: (state) => {
      return {
        token: state.token,
        auth: state.auth,
        firstName: state.firstName,
        lastName: state.lastName,
        login: state.login,
        email: state.email
      }
    }
  }
})
