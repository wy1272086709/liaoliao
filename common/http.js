class http {
	static request(url, params = {}, method = "POST", contentType = "application/x-www-form-urlencoded") {
		return new Promise((resolve, reject) => {
				uni.request({
					url, //仅为示例，并非真实接口地址。
					data: params,
					header: {
						'Content-Type': contentType
					},
					method,
					success: (res) => {
						resolve(res.data.data);
					}
				});
			});
	}
}

export default http