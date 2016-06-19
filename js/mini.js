var toolkit = {
  addClass:function(element,_className){
    //element代表我们传进来那个标签元素，_className就是我们想要添加类名
    var originalClassName = element.className;
    if(originalClassName.match(this.trim(_className))){
      return; //如果要添加的类名已经存在的话就跳出此方法
    }
    element.className = this.trim(originalClassName +' '+_className);
  },
  //判断标签是否拥有某个类型
  hasClass:function(element,_className){
    var originalClassName = element.className; //取到原始的类名
    //字符串的match方法，如果匹配的话是返回一个数组给我们,如果匹配不到返回一个null给我们
    if(originalClassName.match(_className)){
      return true;
    }else{
      return false;
    }
  },
  removeClass:function(element,_className){
    //当第二个参数不传的时候，删除掉全部类名
    if(!_className){
      element.className =''; //类名全部清空
    }else{ //就是用户传第二个参数的时候
      var originalClassName = element.className;
      var newClassName = originalClassName.replace(_className,'');
      element.className = newClassName;
    }
  },
  //找到指定的类名之后，把这个类名替换掉
  replaceClass:function(element,targetName,newClassName){
    var originalClassName = element.className;
    var newClassName = originalClassName.replace(targetName,newClassName);
    if(newClassName == originalClassName){
      console.log('没有找到想要替换掉的那个类名')
    }else{
      element.className = newClassName;
    }
  },
  getElementByClassName:function(element,_className){
    if(document.getElementsByClassName){ //老版本IE不兼容此方法
      var sonElements = element.getElementsByClassName(_className);
      return sonElements;
    }else{  //为了兼容老版本的IE
      var arr = [];
      var allElements = element.getElementsByTagName('*');
      for(var i=0;i<allElements.length;i++){
        if(allElements[i].className == _className){
          arr.push(allElements[i]);
        }
      }
      return arr;
    }
  },
  getAttr:function(element,_attrName){
    var attrValue = element.getAttribute(_attrName);
    if(attrValue){ //不是null的情况下
      return attrValue;
    }else{
      console.log('你想得到的属性节点找不到！！');
    }
  },
  removeAttr:function(element,_attrName){
     var attrValue = element.getAttribute(_attrName);
    if(attrValue){ //不是null的情况下,说明已经找到了那个属性节点
      element.removeAttribute(_attrName);
    }else{
      console.log('你想移除的属性节点找不到！！');
    }
  },
  //判断标签有没有这个属性节点，如果有的话就返回true,否则就返回false
  hasAttr:function(element,_attrName){
    var attrValue = element.getAttribute(_attrName);
    if(attrValue){
      return true;
    }else{
      return false;
    }
  },
  addEvent:function(obj,type,fn){
    //兼容谷歌火狐
    if(obj.addEventListener){
      obj.addEventListener(type,fn,false);
    }else if(obj.attachEvent){ //兼容IE
      obj.attachEvent('on'+type,fn);
    }
  },
  removeEvent:function(obj,type,fn){
    if(obj.removeEventListener){ //兼容谷歌火狐
      obj.removeEventListener(type,fn,false);
    }else if(obj.detachEvent){ //兼容IE的写法
      obj.detachEvent('on'+type,fn);
    }
  },
  //获取非内联样式
  getStyle:function(ele){
    if(document.documentElement.currentStyle){ //兼容IE
        return ele.currentStyle;
    } else {
        return getComputedStyle(ele, null); //兼容谷歌火狐
    }
  },
  stopPropagation:function(event){ //阻止事件冒泡
    event = event || window.event;
    if(event.stopPropagation){ //兼容谷歌和火狐
      event.stopPropagation();
    }else{
      event.cancelBubble = true; //兼容IE
    }
  },
  //获取事件的源对象
  getEventTarget:function(event){
    event = event || window.event;
    var target = event.target || event.srcElement;
    return target;
  },
  toggle:function(element){ //如果标签显示的话，就让他隐藏，如果标签隐藏的话，就让他显示
    var isShow = this.getStyle(element).display;
    if(isShow == 'block'){
      element.style.display = 'none';
    }else if(isShow == 'none'){
      element.style.display = 'block'
    }else{
      console.log('你传入的参数不是一个标签对象');
    }
  },
  toggleClass:function(element,_className){ //如果标签里面有这个类名的话就把它删除，如果没有这个类名的话就把这个类名添加
    var originalClassName = element.className;
    if(originalClassName.match(_className)){
      originalClassName.replace(_className,'');
      this.replaceClass(element,_className,'');
    }else{
      this.addClass(element,_className);
    }
  },
  show:function(element){ //让标签显示
    element.style.display = 'block';
  },
  hide:function(element){ //让标签隐藏
    element.style.display = 'none';
  },
  getOddElements:function(elements){ //传入的标签是数组类型的时候，取下标为奇数的标签组成的数组
    var arr = [];
    for(var i=0;i<elements.length;i++){
      if(i%2==1){
        arr.push(elements[i]);
      }
    }
    return arr;
  },
  getEvenElements:function(elements){//传入的标签是数组类型的时候，取下标为偶数的标签组成的数组
    var arr = [];
    for(var i=0;i<elements.length;i++){
      if(i%2==0){
        arr.push(elements[i]);
      }
    }
    return arr;
  },
  getCookie:function(name){ //取到cookie里面存储属性名对应的那个属性值
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('='); 
        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return ''; //如果上面return实行不到的话就会返回一个空的字符串
  },
  removeCookie:function(name,value){ //手动删除掉cookie
    this.setCookie(name,value,-1)
  },
  setCookie:function(name,value,day){ //设置cookie的属性名和属性值和有效天数
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+day);
    document.cookie=name+'='+value+';expires='+oDate;//expires代表过期时间，
  },
  trim:function(value){
    var reg = /(^\s*)|(\s*$)/g; //正则去掉左右空格
    return value.replace(reg,'');
  },
  insertAfter:function(newNode,targetNode){ //插入指定标签的后面
    var parent = targetNode.parentNode;
    if(parent.lastElementChild == targetNode){
      parent.appendChild(newNode);
    }else{
      parent.insertBefore(newNode,targetNode.nextElementSibling);
    }
  },
  //通过ID获取元素
  $:function(id){
  document.getElementById(id);
  },
  //tab切换自定义版，arr1/2为切换tab的对应元素数组，btnL/R为两端动作的按钮(可选)，className1/2为切换前后的样式，必须用类名写样式.
  tab:function(arr1,arr2,className1,className2,btnL,btnR){
    var k = 0;
    for(var i=0;i<arr2.length;i++){   
        arr2[i].index=i;
        arr2[i].onclick=function(){
            for(var j=0;j<arr2.length;j++){
                arr2[j].className='';
                arr1[j].className='';	
            }	
            this.className=className2;
            arr1[this.index].className=className1;
            k = this.index;
        }	
    }
    if(btnR){
        btnR.onclick=function(){
            for(var j=0;j<arr2.length;j++){
                arr2[j].className='';
                arr1[j].className='';		
            }
                if(k == arr2.length-1){
                    k = 0;
                    arr1[k].className=className1;
                    arr2[k].className=className2;
                }else{
                    arr1[k].nextElementSibling.className=className1;
                    arr2[k].nextElementSibling.className=className2;
                     k++;
                }
        }
    }
    if(btnL){
        btnL.onclick=function(){
            for(var j=0;j<arr2.length;j++){
                arr2[j].className='';
                arr1[j].className='';		
            }
                if(k == 0){
                    k = arr2.length-1;
                    arr1[k].className=className1;
                    arr2[k].className=className2;
                }else{
                    arr1[k].previousElementSibling.className=className1;
                    arr2[k].previousElementSibling.className=className2;
                     k--;
                }
       }
    }    
  },
  doAjax:function(fn,method,url,isTY){
    var pp = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
    pp.onreadystatechange = function () {
        if(pp.readyState == 4){
            var jsonData = eval("("+pp.response+")");
            console.log(jsonData);
            fn(jsonData);
        }
    };
    pp.open(method,url,isTY);
    pp.send();
}
}




