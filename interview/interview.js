// 尽可能全面正确的解析一个任意url的所有参数为Object。
var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled';
parseParam(url);
/**
结果：
{
   user: 'anonymous',
   id: [123, 456], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
   city: '北京', // 中文
   enabled: true, // 未指定值的 key 约定值为 true
}
*/


// 2.实现一个最简单的模板引擎
render('我是{{name}}，年龄{{age}}，性别{{sex}}',{
	name:'姓名',
	age:18
})

// 结果： 我是姓名，年龄18，性别undefined。

// 3.将一个任意长的数字变成逗号分割的格式
	// 1234.56 => "1,234.56" , 123456789 => "123,456,789"
parseToMoney(1234.56) // return "1,234.56"
