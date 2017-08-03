// 尽可能全面正确的解析一个任意url的所有参数为Object。
// var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled';
// parseParam(url);
/**
结果：
{
   user: 'anonymous',
   id: [123, 456], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
   city: '北京', // 中文
   enabled: true, // 未指定值的 key 约定值为 true
}
*/

export default function parseUrl(){
  const url = 'http://www.domain.com/?user=anonymous&id=123&id=456&id=111&city=%E5%8C%97%E4%BA%AC&enabled';
  const decodeUrl = decodeURIComponent(url)
  const place_ask = decodeUrl.indexOf('?')
  const search = decodeUrl.slice(place_ask+1)
  const partList = search.split('&')
  const result = {}
  partList.forEach(it=>{
    const spart = it.split('=')
    const pro = spart[0]
    const val = spart[1]==undefined?true:spart[1]
    if (result[pro]) {
      if (result[pro] instanceof Array) {
        result[pro].push(val)
      } else {
        result[pro] = [result[pro],val]
      }
    } else {
      result[pro] = val
    }
  })
  console.log(result)
  return result
}
