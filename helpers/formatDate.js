const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
]

module.exports = {
  toString: (dateInstance = new Date()) => {
    let date = dateInstance.getDate()
    let month = parseInt(dateInstance.getMonth())
    let year = dateInstance.getFullYear()

    if (date < 10) {
      date = `0${date}`
    }
  
    return `${date} ${months[month]} ${year}`
  }
}