function addList(list1, list2, index = list1.length) {
  list2.map(item => {
    list1.splice(index, 0, item)
    index += 1;
  })
}

function getScrollTop() {
  var scroll_top = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop;
  } else if (document.body) {
    scroll_top = document.body.scrollTop;
  }
  return scroll_top;
}

function setScrollTop(val) {
  if (document.documentElement && document.documentElement.scrollTop) {
    document.documentElement.scrollTop = val;
  } else if (document.body) {
    document.body.scrollTop = val;
  }
}


function isLogin() {
  var login = false;
  let token = localStorage.getItem('token');
  let expire = Date.now() - localStorage.getItem('date') > 3600000; //过期时间为1小时
  if (token && !expire) {
    login = true;
  }
  return login;
}

export {addList, getScrollTop, setScrollTop, isLogin }
