/* eslint-disable */
export default{
  hasShownModal: false,
  validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validatePassword(password) {
    const re = /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,16}$/
    return re.test(password)
  },
  validateField(input){
    const re = /^[A-Za-z.]{1,30}\s\d/
    return re.test(input)
  },
  validateNumber(number){
    const re = /^[0-9+]{11,13}/
    return re.test(number)
  }
}
