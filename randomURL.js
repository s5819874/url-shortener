function randomURL(digits) {
  const character_pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < digits; i++) {
    let random_index = Math.floor(Math.random() * character_pool.length)
    result += character_pool[random_index]
  }
  return result
}

module.exports = randomURL
