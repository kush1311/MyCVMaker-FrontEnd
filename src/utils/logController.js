
function logController() {
if (process.env.REACT_APP_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}
}

export default logController;