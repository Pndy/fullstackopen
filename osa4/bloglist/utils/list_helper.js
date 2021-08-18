const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes += blog.likes
    });
    return likes
}

const favoriteBlog = (blogs) => {
    let favBlog = {}
    blogs.forEach(blog => {
        if(!favBlog.hasOwnProperty('likes') || blog.likes >= favBlog.likes){
            favBlog = blog
        }
    })
    return {"title": favBlog.title, "author": favBlog.author, "likes": favBlog.likes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}