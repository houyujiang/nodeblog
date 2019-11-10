const querystring = require('querystring')
const handlerBlogRouter = require('./src/router/blog')

// 用于处理POST
const getPostData = (req)=>{
    const promise = new Promise((resolve,reject)=>{
        // 非POST请求返回空
        if(req.method != 'POST'){
            resolve({})
            return
        }
        // 非json格式的数据返回空
        if(req.headers['content-type'] !='application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data',chunk=>{
            postData+=chunk
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.stringify(postData)
            )
        })
    })
    return promise
}

const serverHandler = (req,res)=>{
    res.setHeader('Content-type','application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    // 处理postData
    getPostData(req).then(postData => {

        req.body = postData
    // 处理blog路由
    const blogData = handlerBlogRouter(req,res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return
    }
    // 未命中路由，返回404
    res.writeHead(404,{'Content-type':"text/plain"})
    res.write("404 Not Found\n")
    res.end()
    })
   
}

module.exports=serverHandler