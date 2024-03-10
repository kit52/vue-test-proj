import { locales, localesSubject } from '@/shared/data/Data'

export function isValidEmail(email: string) {
  const valid = /\S+@\S+\.\S+/.test(email) && email.length >= 6
  return valid
}
export const toDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('.')
  // @ts-ignore
  return new Date(year, month - 1, day)
}
export function dateFormat(date: Date) {
  date = new Date(date)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
  const yyyy = date.getFullYear()

  return `${dd}.${mm}.${yyyy}`
}
export function removeNonABC(val: string) {
  const reg = /[0-9~!@#№$%:;^&()-=+_.,?><}[{|\]\\"'`]/g

  const res = val.replace(reg, '')

  return res
}
export function removeSpecialCharacters(val: string) {
  const reg = /[^a-zA-Zа-яА-Я0-9]/g

  const res = val.replace(reg, '')

  return res
}

export function keepOnlyNumbers(inputString: string) {
  const regex = /\D/g
  const result = inputString.replace(regex, '')

  return result
}
export function removeNonLatinAndNumber(val: string) {
  const reg = /[a-zA-Z0-9]/g
  const res = val.match(reg)
  return res && res.length ? res.join('') : ''
}
export function removeNotPasswordSymbol(val: string) {
  const reg = /[a-zA-Z0-9~!@#$%^&()-=+_.,?]/g
  const res = val.match(reg)
  if (res && res.length) {
    return res.join('')
  }
  return ''
}
export function isValidPasswordSymbols(val: string) {
  const regBigLetter = /[A-Z]/g
  const regSmallLetter = /[a-z]/g
  const regDigits = /[0-9~!]/g
  return regBigLetter.test(val) && regSmallLetter.test(val) && regDigits.test(val)
}

export function lengthControl(str: string, control: number) {
  const string = str.trim()
  if (string.length >= control) {
    return true
  }
  return false
}
export function validPassword(val: string) {
  return !!val.match(/^[^a-zA-Z0-9]/g)
}
export function parseBooksData(data: any) {
  const newData = data.map((item: any) => ({
    ...item,
    name: JSON.parse(item.name),
    description: JSON.parse(item.description)[0].split(','),
    age: JSON.parse(item.age),
    classDescription: JSON.parse(item.classDescription),
    date: new Date(item.expirationDate),
    isActive: true,
    isClicked: false
  }))
  return newData
}
export function findLocaleCode(lang: string) {
  const selected = localesSubject.find((el) => el.iso == lang)
  return selected
}
export function findLocale(code: string) {
  const selected = localesSubject.find((el) => el.code == code)
  return selected
}
export function debounce(callback: Function, delay: number) {
  let timer: NodeJS.Timeout = null
  return (args: any) => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      callback(args)
      setTimeout(() => {
        clearInterval(timer)
      }, delay)
    }, delay)
  }
}

export function splitNames(firstName: string, lastName: string) {
  let lastNameNew = ''
  if (lastName.length > 10) {
    lastNameNew = `${lastName.slice(0, 10)}...`
  } else {
    lastNameNew = lastName
  }
  return `${lastNameNew} ${firstName.split('')[0]}.`
}
export function getCookieValue(cookieName: string) {
  const cookieString = document.cookie
  const cookieArray = cookieString.split(';')
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(cookieName + '=') == 0) {
      return cookie.substring(cookieName.length + 1, cookie.length)
    }
  }

  return undefined
}
export function recordCookieValue(cookieName: string, value: string, domain: string, age?: string) {
  document.cookie = `${cookieName}=${value}; max-age=${age ?? 15768000}; domain=.${domain}; path=/`
}
export function deleteCookie(cookieName: string, domain: string) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`
}
export const generateKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`
}
export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime() //Timestamp
  var d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function selectCardTheme(name: string) {
  let theme = undefined

  //   switch (name) {
  //     case 'Словесность':
  //       theme = CardTheme.BLUE
  //       break
  //     case 'Математика':
  //       theme = CardTheme.PINK
  //       break
  //     case 'Окружающий мир':
  //       theme = CardTheme.BROWN
  //       break
  //     case 'Азбука':
  //       theme = CardTheme.WHITE
  //       break
  //     default:
  //       theme = CardTheme.BIG
  //       break
  //   }
  return theme
}
export function returnMonth(val: string, t: any) {
  if (val == '1') {
    return val + ' ' + t('month')
  }
  if (val <= '4') {
    return val + ' ' + t('months')
  }
  return val + ' ' + t('месяцев')
}
export const calcDiscount = (base: number, discountPrice: number) => {
  if (discountPrice < base) {
    return Math.round(((base - discountPrice) / base) * 100) + '%'
  }
}
export function calculatePrice(item: any, BasketStore: any, priceOneMonth: number) {
  if (BasketStore.selectedPeriod) {
    return Math.round(
      item.pricesPerPeriod[BasketStore.getSelectedPeriod()] *
        BasketStore.periods[BasketStore.getSelectedPeriod()].periodInMonths
    )
  }
  return priceOneMonth
}
export function calculateFullPrice(item: any, BasketStore: any) {
  return Math.round(
    item.pricesPerPeriod[0] * BasketStore.periods[BasketStore.getSelectedPeriod()].periodInMonths
  )
}
function returnLang(code: string) {
  const selectedLocale = localesSubject.find((item) => item.code == code)
  return selectedLocale.name
}
export function transformSubs(items: any, id: string) {
  const subs = items.map((sub: any) => ({
    ...sub,
    lang: returnLang(sub.languageId),
    date: sub.expirationDate,
    subName: JSON.parse(sub.subName),
    childId: id,
    classDescription: JSON.parse(sub.classDescription),
    age: JSON.parse(sub.age)
  }))
  return subs
}
export function detectMobile() {
  const userAgent = window.navigator.userAgent

  if (userAgent.match(/Android/i)) {
    return 'mob'
  } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
    return 'mob'
  } else {
    return 'pc'
  }
}
export function detectPlatform() {
  const userAgent = window.navigator.userAgent

  if (userAgent.match(/Android/i)) {
    return 'Android'
  } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
    return 'IOS'
  } else {
    return 'Android'
  }
}
