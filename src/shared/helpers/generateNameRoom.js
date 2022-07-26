export function nameRoom() {
  let result = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let charactersLength = characters.length
  for ( var i = 0; i < 6; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  
  return result
}