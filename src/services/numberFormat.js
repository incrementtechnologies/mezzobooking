export default{
  format(number){
    let temp = number.toString().split('.')
    temp[0] = temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return temp.join('.')
  }
}
