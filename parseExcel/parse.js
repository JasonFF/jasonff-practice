import xlsx from 'node-xlsx';
import fs from 'fs';

const lakalaIndustry = xlsx.parse(`${__dirname}/files/lakala.xls`);
const lakalaProvince = xlsx.parse(`${__dirname}/files/lakalaProvince.xlsx`);

const lakalaIndustryPart1 = lakalaIndustry[0].data.map((it,i)=>{
  return {
    _index: it[0],
    code: it[1],
    name: it[2],
    sort: it[3]
  }
})
lakalaIndustryPart1.splice(0,1)
const lakalaIndustryPart2 = [];
const lakalaIndustryPart2SortIndex = {};

lakalaIndustryPart1.forEach((it,i)=>{
  if (lakalaIndustryPart2SortIndex[it.sort] == undefined) {
    lakalaIndustryPart2.push({
      id: lakalaIndustryPart2.length+1,
      name: it.sort,
      data: []
    })
    lakalaIndustryPart2SortIndex[it.sort] = lakalaIndustryPart2.length-1;
  } else {
    lakalaIndustryPart2[lakalaIndustryPart2SortIndex[it.sort]].data.push({
      id: it.code,
      name: it.name.replace(/\s/ig,"")
    })
  }
})

const lakalaProvincePart1 = lakalaProvince[0].data.map((it,i)=>{
  return {
    id: it[0],
    parentId: it[1],
    name: it[2].replace(/\s/ig,""),
  }
})
lakalaProvincePart1.splice(0,1)

const lakalaProvincePart2 = [];
const lakalaProvincePart2SortIndex = {};
console.log(lakalaProvincePart1)
lakalaProvincePart1.forEach((it,i)=>{
  if (lakalaProvincePart2SortIndex[it.parentId] == undefined) {
    lakalaProvincePart2.push({
      id: it.id,
      name: it.name,
      parentId: it.parentId,
      children: []
    })
    lakalaProvincePart2SortIndex[it.id] = lakalaProvincePart2.length-1;
  } else {
    lakalaProvincePart2[lakalaProvincePart2SortIndex[it.parentId]].children.push({
      id: it.id,
      name: it.name.replace(/\s/ig,""),
      parentId: it.parentId
    })
  }
})
console.log(lakalaProvincePart2)
const lakalaProvincePart3 = lakalaProvincePart2[0];
function parseItemFromList(list,param,value) {
  let result;
  list.forEach(it=>{
    if (it[param] == value) {
      result = it
    }
  })
  return result
}
lakalaProvincePart2.forEach((it,i)=>{
  const chooseItem = parseItemFromList(lakalaProvincePart3.children, 'id', it.parentId);
  if (chooseItem) {
    if (!chooseItem.children) {
      chooseItem.children = []
    }
    chooseItem.children.push(it)
    lakalaProvincePart2SortIndex[it.id] = undefined
  }
})


fs.writeFile('./lib/lakalaIndustry.json',JSON.stringify(lakalaIndustryPart2));
fs.writeFile('./lib/lakalaProvince.json',JSON.stringify(lakalaProvincePart3.children));
fs.writeFile('./lib/test.json',JSON.stringify(lakalaProvincePart2SortIndex));
