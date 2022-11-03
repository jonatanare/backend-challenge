function handleErrors (error, request, response, next) {
  response.status(error.status || 500).json({
    succes: false,
    message: error.message
  })
}
export default handleErrors
