 const getList = (author,keyword)=>{

    // 先返回假数据
     return [
         {
             id :1,
             title :'标题A',
             content :'内容A',
             createTime :1572949548086,
             author :'zhangsan'
         },
         {
            id :1,
            title :'标题B',
            content :'内容B',
            createTime :1572949609344,
            author :'zhangsan'
        }
     ]
 }

 const getDetail = (key)=>{
     return{
         title :'博客A',
         author :'Lee',
         content : 'This is Lees blog',
         createTime :1572949548086,
     }
 }

 const newBlog = (blogData={})=>{
     return{
         id :3
     }
 }

 // 更新一篇博客
const updataBlog = (blogData={})=>{
    return{
        id : 4
    }
}

 // 删除一篇博客
const deletBlog = (blogData={})=>{
    return {
        id :5
    }
}
 module.exports={
     getList,
     getDetail,
     newBlog,
     updataBlog,
     deletBlog
 }