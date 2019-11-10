const http = require('http');
const querystring = require('querystring');

// GET请求
// const server = http.createServer((req,res)=>{
//     console.log('mehod:',req.method);
//     const url = req.url;
//     console.log('url:',url);
//     req.query = querystring.parse(url.split('?')[1]);
//     res.end(JSON.stringify(req.query));
// })

// POST请求
// const server = http.createServer((req,res)=>{
//     console.log('method:',req.method);
//     const url = req.url;
//     console.log('url: ',url);
//     const method = req.method;
//     console.log('method:',req.method)
//     if(method === 'POST'){
//         console.log('req content-type:',req.headers['content-type']);
//         let postdata = '';
//         req.on('data',chunk=>{
//             postdata+= chunk.toString();
//         })
//         req.on('end',()=>{
//             res.end(postdata);
//         })
//     }
// })

// 综合 GET POST
const server = http.createServer((req,res)=>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = url.split('?')[1];

    // 设置返回格式：JSON
    res.setHeader('Content-type','application/json');
    // 返回数据
    const resData = {
        method,
        url,
        path,
        query
    }
    // 处理/返回
    if(method === 'GET'){
        res.end(
            JSON.stringify(resData)
        );
    }
    if(method === 'POST'){
        let postData = '';
        req.on('data',chunk =>{
            postData+=chunk.toString();
        })
        req.on('end', ()=>{
            resData.postData = postData;
            console.log(postData);
            res.end(
                JSON.stringify(resData)
            )
        })
       
    }

})
server.listen(8000);
console.log("server start at 8000:")
