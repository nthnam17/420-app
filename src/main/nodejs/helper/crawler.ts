function decodeToJson(encodedStr) {
  // Giải mã chuỗi URL
  const decodedStr = decodeURIComponent(encodedStr)

  // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
  return JSON.parse(decodedStr)
}

function encodeToJson(obj) {
  // Chuyển đổi đối tượng JavaScript thành chuỗi JSON
  const jsonStr = JSON.stringify(obj)

  // Mã hóa chuỗi JSON thành URL mã hóa
  return encodeURIComponent(jsonStr)
}

const jsonObj = {
  rawQuery: 'manchester',
  count: 20,
  querySource: 'typed_query',
  product: 'Top'
}

const encodedStrBack = encodeToJson(jsonObj)

console.log(encodedStrBack)
