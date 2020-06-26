const [PENDING, FULFILLED, REJECTED] = ['PENDING', 'FULFILLED', 'REJECTED']
class Promise1 { //状态改变
  constructor(executor) { //new Promise((resolve,reject)=>{}),里面的箭头函数就是参数
    this.status = PENDING; //初始化状态
    this.data = ''; //resolve或reject中传递给then中回调函数的值
    executor(this.resolve.bind(this), this.reject.bind(this)) //需要改变resolve的this，否则调用的时候this并不指向promise
  }
  resolve(val) {
    this.data = val; //传递给then回调函数的值保存起来
    this.status = FULFILLED;
  }
  reject(err) {
    this.data = err;
    this.status = REJECTED;
  }
  then(onFulfilledFn, onRejectedFn) {
    if (this.status === FULFILLED) {
      onFulfilledFn(this.data);
    } else if (this.status === REJECTED) {
      onRejectedFn(this.data);
    }
  }
}
class Promise2 { //实现异步
  constructor(executor) { //new Promise((resolve,reject)=>{}),里面的箭头函数就是参数
    this.status = PENDING; //初始化状态
    this.data = ''; //resolve或reject中传递给then中回调函数的值
    //存储then中的回调函数
    this.onFulfilledFnArr = [];
    this.onRejectedFnArr = [];
    executor(this.resolve.bind(this), this.reject.bind(this)) //需要改变resolve的this，否则调用的时候this并不指向promise
  }
  resolve(val) {
    setTimeout(() => { //加上settimeout来实现异步操作
      this.data = val;
      this.status = FULFILLED;
      this.onFulfilledFnArr.map(fulfilledFn => { //执行回调数组的每个回调函数
        fulfilledFn(val);
      })
    });
  }
  reject(err) {
    setTimeout(() => {
      this.data = err;
      this.status = REJECTED;
      this.onRejectedFnArr.map(rejectedFn => {
        rejectedFn(err);
      })
    });
  }
  then(onFulfilledFn, onRejectedFn) {
    if (this.status === FULFILLED) {
      onFulfilledFn(this.data);
    } else if (this.status === REJECTED) {
      onRejectedFn(this.data);
    } else if (this.status === PENDING) { //对PENDING状态处理，此时不知道要变成成功还是失败，所以把两个回调函数推进相应的数组中
      this.onFulfilledFnArr.push(onFulfilledFn);
      this.onRejectedFnArr.push(onRejectedFn);
    }
  }
}

class Promise3 { //实现链式调用
  constructor(executor) {
    this.status = PENDING;
    this.data = '';
    this.onFulfilledFnArr = [];
    this.onRejectedFnArr = [];
    executor(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(val) {
    setTimeout(() => {
      this.data = val;
      this.status = FULFILLED;
      this.onFulfilledFnArr.map(fulfilledFn => {
        fulfilledFn(val);
      })
    });
  }
  reject(err) {
    setTimeout(() => {
      this.data = err;
      this.status = REJECTED;
      this.onRejectedFnArr.map(rejectedFn => {
        rejectedFn(err);
      })
    });
  }
  then (onFulfilledFn, onRejectedFn) {
    //对参数是否是函数进行了判断,可用于值穿透 eg. promise.then(1).then(2).then(console.log) //1
    onFulfilledFn = typeof onFulfilledFn === 'function' ? onFulfilledFn : val => val;
    onRejectedFn = typeof onRejectedFn === 'function' ?
      onRejectedFn : err => {
        throw new Error(err);
      }
    if (this.status === FULFILLED) {
      return new Promise3((resolve, reject) => {
        const result = onFulfilledFn(this.data);
        resolve(result);
      })
    } else if (this.status === REJECTED) {
      return new Promise3((resolve, reject) => {
        const result = onRejectedFn(this.data);
        reject(result);
      })
    } else if (this.status === PENDING) {
      //处于pending状态,我们不知道是会变完成还是失败,所以将成功和失败的回调函数分别推进数组中
      return new Promise3((resolve, reject) => {  //注意这个new promise的状态是在前一个promise的then方法中改变
        this.onFulfilledFnArr.push(() => {
          try { //使用trycatch防止then方法中出错
            const result = onFulfilledFn(this.data);
             resolve(result);
          } catch (err) {
            reject(err.message);
          }
        });
        this.onRejectedFnArr.push(() => {
          try { 
            const result = onRejectedFn(this.data);
            resolve(result); //为什么这里是rejected函数却是调用resolve呢
            //reject(result); 
          } catch (err) {
            reject(err.message);
          }
          
        })
      })
    }
  }
}
Promise3.prototype.catch = function (onRejectedFn) {
  return this.then(null, onRejectedFn);
}
export {
  Promise1,
  Promise2,
  Promise3
}
