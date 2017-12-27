import xlsx from 'node-xlsx';
import fs from 'fs';

import componentsJson from './files/components.json'

const data = componentsJson.data
const header = ['模块名', 'group_class', 'field', 'control', 'label', 'data']

let body = getBody(data)



let result = [header, ...body]
console.log(result)

function getBody (data) {
  let common_info = getConfigList('common_info', data)
  let other_info = getConfigList('other_info', data)
  let merchant_info = getConfigList('merchant_info', data)
  let channel_info = getConfigList('channel_info', data)
  return common_info.concat(other_info).concat(merchant_info).concat(channel_info)
}

function getConfigList (configName, data) {
  return data[configName].map(it => {
    return [configName, it.group_class, it.field, it.control, it.label, JSON.stringify(it.data)]
  })
}

// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: result}]); // Returns a buffer

fs.writeFileSync('./test.xlsx', buffer)