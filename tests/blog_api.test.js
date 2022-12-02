const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_helper')

const api = supertest(app)

test('unique identifier id is defined', async () => {
    const response = await api .get('/api/blogs')
    console.log(response.body[0].id)
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const initialResponse = await api .get('/api/blogs')
    let initialTestBlogs = initialResponse.body.length
    console.log(initialTestBlogs)
    const newBlog = {
        name: 'sankiomatic',
        number: '911-82732642'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.name)
    expect(response.body).toHaveLength(initialTestBlogs +1)
    expect(contents).toContain(
        'sankiomatic'
    )
})
test('likes', async () => {
    console.log('zoom')
    const newBlog = {
        name: "So",
        title: "racing",
        content: "I love honda lollll"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
    const response = await api.get('/api/blogs')
    console.log('this is response', response)
    const newPost = response.body.filter(response => {
        return response.name.includes('So')
    })
    console.log('the new post', newPost)
    console.log('end')
})
test('title or name missing', async ()=> {
    console.log('tits')
    const newBlogTitle = {
        name: 'benjimoto',
        content: 'i like to wompus'
    }
    const newBlogName = {
        title: 'lolb00m',
        content: 'I have created a monster'
    }
    await api
        .post('/api/blogs')
        .send(newBlogTitle)
        .expect(400)
    await api
        .post('/api/blogs')
        .send(newBlogName)
        .expect(400)
})
test('delete a blog', async ()=> {
    const newBlog = {
        name: "Sosadfasfdsa",
        title: "racing",
        content: "I love honda lollll",
        likes: 56,
        id: 10076
    }
    console.log('deleteABlog loaded')
    await api
        .post('/api/blogs')
        .send(newBlog)

})


afterAll(() => {
    mongoose.connection.close()
})