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
	
	static getUserInfoFromStorage() {
		const userStr = uni.getStorageSync('wx_userinfo');
		//console.log('userStr from storage:', userStr);
		if(userStr) {
			return JSON.parse(userStr);
		} else {
			return '';
		}
	}
	
	static cache (key, value, seconds) {
		let timestamp = Date.parse(new Date()) / 1000
		console.log(timestamp+"==="+key)
		if (key && value === null) {
			//删除缓存
			//获取缓存
			let val = uni.getStorageSync(key);
			let tmp = val.split("|");
			if (!tmp[1] || timestamp >= tmp[1]) {
				console.log("key已失效");
				uni.removeStorageSync(key);
				return "";
			} else {
				console.log("key未失效")
				return tmp[0]
			}
		} else if (key && value) {
			//设置缓存
			let expire = '';
			if (!seconds) {
				expire = timestamp + (3600 * 1);
			}else{
				expire = timestamp + seconds;
			}
			value = value + "|" + expire;
			uni.setStorageSync(key, value);
		} else {
			console.log("key不能空")
		}
	}
}

export default util;