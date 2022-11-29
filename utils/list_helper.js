const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) =>{
  return blogs[0].likes
}

const favoriteBlog = (blogs) => {
  let x = 0
  let z = 0
  for(let i =0; i<blogs.length; i++){
    if(blogs[i].likes > x){
      x = blogs[i].likes
      z = i
    }
  }
  return blogs[z]
}

const mostBlogs = (blogs) => {
  let authors = []
  let total = 0
  for (let i = 0; i< blogs.length; i++){
    authors.push(blogs[i].author)
  }
  function mostFrequent(arr) {
  let n = arr.length
  let maxcount = 0;
    let element_having_max_freq;
    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (arr[i] == arr[j])
                count++;
        }
 
        if (count > maxcount) {
            maxcount = count;
            total = maxcount
            element_having_max_freq = arr[i];
        }
    }
 
    return element_having_max_freq;
  }
  return ({
    author: mostFrequent(authors),
    blogs: total,
  })
}

// const mostLikes = (blogs) => {
//   let authors = []

//   for (let i = 0; i< blogs.length; i++){
//     authors.push(blogs[i].author)
//   }
//   function removeDuplicates(arr) {
//     return arr.filter((item,
//         index) => arr.indexOf(item) === index);
// }
// authors = removeDuplicates(authors)
// let maxLikes= 0
// for (let i = 0; i< blogs.length; i++){
  
// }

//   function mostFrequent(arr) {
//   let n = arr.length
//   let maxcount = 0;
//     let element_having_max_freq;
//     for (let i = 0; i < n; i++) {
//         let count = 0;
//         for (let j = 0; j < n; j++) {
//             if (arr[i] == arr[j])
//                 count++;
//         }
 
//         if (count > maxcount) {
//             maxcount = count;
//             total = maxcount
//             element_having_max_freq = arr[i];
//         }
//     }
 
//     return element_having_max_freq;
//   }
//   return ({
//     author: mostFrequent(authors),
//     blogs: total,
//   })
// }

  
   module.exports = {
     dummy, totalLikes, favoriteBlog, mostBlogs
   }