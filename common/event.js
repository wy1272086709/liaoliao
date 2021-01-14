class Event {
	throttle(fn, wait = 500, isImmediate = false) {  
	  let flag = true;  
	  console.log('t1:'+new Date().getTime()+',flag=1');
	  if (isImmediate) {  
	    return function() {  
	      if (flag) {  
	        fn.apply(this, arguments);  
	        flag = false;  
	        setTimeout(() => {  
	          flag = true  
	        }, wait)  
	      }  
	    }  
	  }  
	  return function() {  
	    if (flag == true) {
			console.log('t:'+new Date().getTime()+',flag=1');
	      flag = false  
	      setTimeout(() => {  
	        fn.apply(this, arguments)  
	        flag = true  
	      }, wait)  
	    }  
	  }  
	}  
}

export default new Event;