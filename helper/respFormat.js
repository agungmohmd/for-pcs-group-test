function send(msg, status, data = [], resp_code) { 
    let rpx = {
    "message": `${msg}`,
    "status": status,
    "data": data,
    "response_code": resp_code
  }
  return rpx;
}

module.exports = {
  send
}