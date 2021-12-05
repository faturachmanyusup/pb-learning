export default class Time extends Date {
  // remove parent's methods (polymorphism)
  getFullYear = undefined
  getMonth = undefined
  getDate = undefined
  getDay = undefined

  #locale = 'id'

  constructor(...args) {
    super(...args)
  }

  get date() {
    return super.getDate()
  }

  get month() {
    return super.getMonth()
  }

  get monthString() {
    return new Intl.DateTimeFormat(this.locale, { month: 'long' })
      .format(this);
  }

  get year() {
    return super.getFullYear()
  }

  get locale() {
    return this.#locale
  }

  set locale(local = 'en') {
    this.#locale = local
  }

  get localeString() {
    return super.toLocaleDateString(this.locale, { dateStyle: 'full' })
  }

  get day() {
    return super.getDay()
  }

  get dayString() {
    return new Intl.DateTimeFormat(this.locale, { weekday: 'long' })
      .format(this);
  }

  get firstDayOfMonth() {
    let temp = new Time(this)

    temp.setDate(1)
    return temp.day
  }

  get lastDateOfMonth() {
    let temp = new Time(this)

    temp.addMonth(1)
    temp.setDate(0)
    return temp.date
  }

  get hour() {
    return super.getHours() > 9 ? super.getHours() : `0${super.getHours()}`
  }

  get minute() {
    return super.getMinutes() > 9 ? super.getMinutes() : `0${super.getMinutes()}`
  }

  setLocale(local = 'en') {
    this.#locale = local
  }

  addDate(num = 0) {
    this.setDate(super.getDate() + num)
  }

  addMonth(num = 0) {
    this.setMonth(super.getMonth() + num)
  }

  addYear(num = 0) {
    this.setFullYear(super.getFullYear() + num)
  }

  subtractDate(num = 0) {
    this.setDate(super.getDate() - num)
  }

  subtractMonth(num = 0) {
    this.setMonth(super.getMonth() - num)
  }
}
