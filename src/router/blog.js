const {SuccessModel,ErrorModel} = require('../model/resModel')
const {getList,getDetail,newblog,updataBlog,deletBlog} = require('../controller/blogController')

const handleBlogRouter = (req,res)=>{
     const method = req.method;
     // 获取博客列表 /api/blog/list,  method:get, key:author keyword
     if(method == 'GET'&& req.path==='/api/blog/list'){
         const author = req.query.author || ''
         const keyword = req.query.keyword || ''
         console.log('author',author)
         console.log('keyword',keyword)
         const listData = getList(author,keyword)
         return new SuccessModel(listData)
     }

     // 获取博客详情 /api/blog/detail, method:get, key:id
     if(method == 'GET'&& req.path==='/api/blog/detail'){
        const key = req.query.key ||''
        const detailData = getDetail(key)
        return new SuccessModel(detailData)
    }
     // 新建一篇博客 /api/blog/new, method:post
     if(method == 'POST'&& req.path==='/api/blog/new'){
        postData = req.body
        console.log(postData)
        const data = newblog(postData)
        return new SuccessModel(data)
    }
     // 修改一篇博客 /api/blog/updata, method:post, id
     if(method == 'POST'&& req.path==='/api/blog/updata'){
         postData = req.body
         const data = updataBlog(postData)
         if(data){
            return new SuccessModel(data)   
         }
         return new ErrorModel("删除失败")
    }
     // 修改一篇博客 /api/blog/del, method:post id
     if(method == 'POST'&& req.path==='/api/blog/del'){
        postData = req.body
        const data = deletBlog(postData)
        if(data){
            return new SuccessModel(data)
         }
         return new ErrorModel("更新失败")

    }
}
module.exports = handleBlogRouter