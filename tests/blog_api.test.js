const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
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
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log('blogsToDelete', blogToDelete)
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    console.log('blogsAtEnd.length', blogsAtEnd.length)
    console.log('blogsAtStart.length', blogsAtStart.length)
    expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length -1
    )

    // const contents= blogsAtEnd.map(r => r.name)
    // console.log('contents', contents)
    // expect(contents).not.toContain(blogToDelete.name)

})

test('updating a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    console.log('blogsAtStart[27]', blogsAtStart[27])
    const blogToModify = blogsAtStart[27]
    const updated = {
        name: 'surani',
        title: 'i love you',
        content: 'i love meows',
        likes: 52
    }
    await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(updated)
    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd[27])

    expect(blogToModify.likes).toEqual(
        52
    )
    
})

test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      //username: 'roberto',
      //name: 'milkaneetan',
      password: 'salainen',
    }
    jest.setTimeout(100000)
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('short username does not succeed', async () => {
   // const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Sosadfasfdsa',
      name: 'Sosadfasfdsa',
      password: 'samsonite',
    }
    jest.setTimeout(100000)
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    //   .expect(201)
    //   .expect('Content-Type', /application\/json/)
    console.log(usersAtEnd)
    // const usersAtEnd = await helper.usersInDb()
    // expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    // const usernames = usersAtEnd.map(u => u.username)
    // expect(usernames).toContain(newUser.username)
  })


afterAll(() => {
    mongoose.connection.close()
})