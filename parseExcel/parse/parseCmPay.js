import xlsx from 'node-xlsx';
import fs from 'fs';

const cmPayConfig = xlsx.parse('./files/cmPay.xlsx')

const result = cmPayConfig[0].data.filter((it, i) => {
  if (!it[1]) {
    return false
  }
  return i != 0
}).map((it, i) => {
  return {
    value: it[1],
    label: it[2]
  }
})

fs.writeFile('./lib/cm_category.json', JSON.stringify(result))
