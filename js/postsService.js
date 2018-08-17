import User from './user.js';
import Post from './post.js';

export default class PostsService {
    getPosts() {
        return fetch('http://127.0.0.1:3000')
        .then(res => { 
            res.json()})
            .then(posts => { 
                posts.map(post => new Post(element.message,
                                           new User(element.firstname, element.lastname, element.userimage),
                                           element.time,
                                           element.postimage,
                                           element.likes));
                    localStorage.setItem("posts", JSON.stringify(res.posts));
                })
        // })
        .catch(() => {
            let postsArr = JSON.parse(localStorage.getItem("posts"));
            postsArr.map(post => new Post(element.message,
                                          new User(element.firstname, element.lastname, element.userimage),
                                          element.time,
                                          element.postimage,
                                          element.likes));
        });
    }
}