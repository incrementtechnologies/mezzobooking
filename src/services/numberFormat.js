export default{
  format(number){
    let temp = number.toString().split('.')
    temp[0] = temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    let wholeNumber = temp.join('.')
    if(wholeNumber.indexOf('.') === -1){
      return wholeNumber + '.00'
    }else{
      return wholeNumber
    }
  }
}
