class File {
	createDir(url) {
		console.log('createDir...');
		const arr1 = url.split('//');
		// 存放三个目录
		const arr2 = arr1[1].split('/');
		plus.io.resolveLocalFileSystemURL("_downloads/", (entry)=> {
			console.log('fs', entry);
			const isDir = entry.isDirectory;
			console.log('isDir', isDir);
			let isSuccess = false;
			if (isDir) {
				console.log('isDir', isDir, 'arr2[0]', arr2[1]);
				entry.getDirectory(arr2[1]+"/", { create:true, exclusive:false }, (dir)=> {
					console.log('dir', dir.name);
					entry.getDirectory(arr2[1]+'/'+arr2[2], { create:true, exclusive:false }, (e2)=> {
						// 这里开始下载文件到此目录下...
						const dtask = plus.downloader.createDownload(url, {filename:arr2[3]}, (d, status)=>{
							// 下载完成
							if ( status == 200 ) {
								if ( d.downloadedSize==0 ) {
									
								} else {
									console.log("2.2下载网络文件成功"+d.url);
								}
							}
						});
						dtask.start();
						console.log('e2', e2.name);
					}, (e1)=> {
						console.log('e1', e1);
					});
				}, (e)=> {
					console.log('e', e);
				});
			}
		}, (e) => {
			console.log( "Request file system failed: " + e.message );
		});
	}
	
	// 复制图片到指定的位置
	copyImg(url) {
		
	}
}

export default (new File);