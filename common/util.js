class util {
	static  buidQuery(params)
	{
		let keys = Object.keys(params);
		let len  = keys.length;
		let str  = '';
		for(let m = 0;m<len;m++)
		{
			let name  = keys[m];
			let value = params[name];
			str+=name+"="+value+"&";
		}
		let m = str.length;
		return str.substr(0, m-1);
	}
}

export default util;