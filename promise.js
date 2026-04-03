function Promise(invoker)
{
    let status="default";
    let resolveList=[];
    let rejectList=[];
    let res=null;
    let err=null;
    this.then=(resolve)=>{
        if(status=="default"){
            resolveList.push(resolve)
        }else if(status=="resolve"){
            resolve(res);
        }
        return this;
    };
    this.catch=(reject)=>{
        if(status=="default"){
            rejectList.push(reject)
        }else if(status=="reject"){
            reject(err);
        }
        return this;
    };
    invoker((_res)=>{
        res=_res;
        status="resolve";
        resolveList.forEach(t=>t(_res));
    }, 
    (_err)=>{
        err=_err;
        status="reject";
        rejectList.forEach(t=>t(_err))
    });

}

let p1=new Promise((resolve,reject)=>{
    console.log("Promise test1 starting");
    setTimeout(()=>{
        var s="Promise test1"
        resolve(s);
    },3000)
}).then((res)=>{console.log(res)});
setTimeout(()=>{
        p1.then(res=>{console.log("waiting p1 end")})
    },3100)
