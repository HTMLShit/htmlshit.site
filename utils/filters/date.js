module.exports = function (value) {
  const dateObject = new Date(value)

  const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]

  return `${dateObject.getDate()} ${
    months[dateObject.getMonth()]
  } ${dateObject.getFullYear()}`
}
