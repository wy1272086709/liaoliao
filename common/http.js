class http {
	async request(url, params = {}, method = "POST", contentType = "application/x-www-form-urlencoded") {
		if (!params.version) {
			params.version = 'v2';
		}
		return new Promise((resolve, reject) => {
				uni.request({
					url:url, //仅为示例，并非真实接口地址。
					data: params,
					header: {
						'Content-Type': contentType
					},
					method:method,
					success: (res) => {
						if (!params.filterData ) {
							resolve(res.data.data);
						} else {
							resolve(res.data);
						}
					}
				});
			});
	}
}

export default (new http)