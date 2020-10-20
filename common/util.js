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
	
	static setUserInfoToStrorage(userInfo) {
		let value = JSON.stringify(userInfo);
		this.cache('wx_userinfo', value);
	}
	
	static dateDifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式 
		let dateSpan,
			tempDate,
			iMinutes;
		sDate1 = Date.parse(sDate1);
		sDate2 = Date.parse(sDate2);
		dateSpan = sDate2 - sDate1;
		dateSpan = Math.abs(dateSpan);
		iMinutes = Math.floor(dateSpan / 1000);
		return iMinutes;
	};
	
	static getUserInfoFromStorage() {
		return this.getObjectFromStorage('wx_userinfo');
	}
	
	static getObjectFromStorage(key)
	{
		const userStr = this.cache(key, null);
		if(userStr) {
			return JSON.parse(userStr);
		} else {
			return '';
		}
	}
	
	static cache (key, value, seconds) {
		let timestamp = Date.parse(new Date()) / 1000;
		console.log(timestamp+"==="+key);
		if (key && value === null) {
			//删除缓存
			//获取缓存
			let val = uni.getStorageSync(key);
			let tmp = val.split("|");
			if(tmp[1] == -1) {
				return tmp[0];
			}
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
				expire = -1;
			}else{
				expire = timestamp + seconds;
			}
			value = value + "|" + expire;
			uni.setStorageSync(key, value);
		} else {
			console.log("key不能空")
		}
	}
	
	static getRect(selector){
		return new Promise((resolve) => {
			let view = uni.createSelectorQuery().select(selector);
			view.fields({
				size: true,
				rect: true,
				scrollOffset:true
			}, (res) => {
				resolve(res);
			}).exec();
		})
	}
	
	static getVersionValue() {
		const v = 100;
		let k = 'app_version_'+v;
		let value = uni.getStorageSync(k);
		return value;
	}
	
	static removeVersionValue() {
		const v = 100;
		let k = 'app_version_'+v;
		let value = uni.removeStorageSync(k);
		return value;
	}
	
	static setVersionValue() {
		const v = 100;
		let k = 'app_version_'+v;
		let value = uni.setStorageSync(k, 1);
		return value;
	}

}

export default {
	buidQuery:util.buidQuery,
	setUserInfoToStrorage:util.setUserInfoToStrorage,
	getUserInfoFromStorage:util.getUserInfoFromStorage,
	getObjectFromStorage:util.getObjectFromStorage,
	cache:util.cache,
	dateDifference:util.dateDifference,
	getRect: util.getRect,
	getVersionValue: util.getVersionValue,
	setVersionValue: util.setVersionValue,
	removeVersionValue: util.removeVersionValue
};