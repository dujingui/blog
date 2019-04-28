// @flow Created by 陈其丰 on 2019/4/18.



const debounce = function(func,wait,immediate){
    let timer = null,
        result,
        debounced = function(...args){
            if (timer) {
                clearTimeout(timer);
            }

            if(immediate){
                let callNow = !timer;
                timer = setTimeout(()=>{
                    timer = null;
                },wait)
                if (callNow) {
                    result = func.apply(this,args);
                }
            }else{
                timer = setTimeout(()=>{
                    func.apply(this,args);
                },wait)
            }
            return result;
        }
    debounced.cancel = function(){
        clearTimeout(timer);
        timer = null;
    }
    return debounced;
}



const throttle = function(func,wait,opt = {}){
    let timer = null;
    let preTime = 0;
    let {leading = true,trailing = true} = opt;
    let throttled = function(...args){
        let now = Date.now();
        if(!leading && !preTime){
            preTime = now;
        }
        if(now - preTime >= wait){
            clearTimeout(timer);
            timer = null;
            preTime = now;
            func.apply(this,args);
        }else if(trailing && !timer){
            timer = setTimeout(()=>{
                preTime = Date.now();
                clearTimeout(timer);
                timer = null;
                func.apply(this,args);
            },wait - now + preTime) 
        }
    }
    throttled.cancel = function(){
        preTime = 0;
        clearTimeout(timer);
        timer = null;
    }
    
}








const flatten = function(arr = []){
    return [].concat(...arr.map(item=>Array.isArray(item) ? flatten(item):item))
}


let arr = [1,[2,3],[4,5,[6,7,[8],9,[10,11],[12]],[13,14,[15,16]],[17,18]],19,[20,21]];


console.log(flatten(arr));





