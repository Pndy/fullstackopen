const _ = require('lodash')

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


const mostBlogs = (blogs) => {
    let grouped = _.groupBy(blogs, 'author')
    let counted = _.mapValues(grouped, (value) => { return value.length })
    let author = Object.keys(counted).reduce((a,b) => counted[a] > counted[b] ? a : b)
    
    let returnVal = {
        author: author,
        blogs: counted[author]
    }

    return returnVal
}

const mostLikes = (blogs) => {
    let grouped = _.groupBy(blogs, 'author')
    let counted = _.mapValues(grouped, (value) => { return _.reduce(value, (sum, o) => {return sum+o.likes}, 0) })
    let author = Object.keys(counted).reduce((a,b) => counted[a] > counted[b] ? a : b)
    
    let returnVal = {
        author: author,
        likes: counted[author]
    }

    return returnVal
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}