class UsersService {  
  getUser(id) {
    return fetch('https://jsonplaceholder.typicode.com/users/' + id)
      .then(res => res.json())
      .then(user => new User(user))
  }
}

class PostsService {
  getPosts(user) {
    return fetch('https://jsonplaceholder.typicode.com/posts/?userId=' + user.id)
      .then(res => res.json())
      .then(posts => posts.map(post => new Post(post.body, user)));
  }
}

let userService = new UsersService();
let postsService = new PostsService();

class User {
  constructor(userObj){
    this.fullname = userObj.name;
    this.id = userObj.id;
  }
}

class Feed {
  constructor(feedEl, userId){
    this.feedEl = feedEl;
    this.fetchUser(userId);   
  }
  
  fetchUser(userId){
    userService
      .getUser(userId)
      .then(user => this.onUser(user));
  }
  
  fetchPosts() {
    postsService
      .getPosts(this.user)
      .then(posts => this.onPosts(posts));
  }
  
  onUser(user) {
    this.user = user;
    this.fetchPosts();
    this.render();
  }
  
  onPosts(posts) {
    posts.forEach(post => this.feedEl.appendChild(post.el));
  }
  
  render() {
    this.postButton = this.feedEl.querySelector('button');
    this.textArea = this.feedEl.querySelector('textarea');
    this.textArea.setAttribute('placeholder',       
          `What's on your mind, ${this.user.fullname}?`);
    
    this.postButton.addEventListener('click', () => this.createPost());
  }
  
  createPost() {
    let postBody = this.textArea.value;
    this.textArea.value = '';
    let post = new Post(postBody, this.user);
    $(post.el).appendTo(this.feedEl);
    // this.feedEl.appendChild(post.el);
  }
}

class Post {
  constructor(postBody, author){ 
  
   let postHTML = `
      <article>
        <author>${author.fullname}</author>
        <p>${postBody}</p>
        <button>remove post</button>
      </article>`;
  
   this.el = $(postHTML).get(0);
   
    // this.el = document.createElement('article');
    // this.el.innerHTML = `
    //   <author>${author.fullname}</author>
    //   <p>${postBody}</p>
    //   <button>remove post</button>
    // `;
    
//     this.removeButton = this.el.querySelector('button');
    
//     this.removeButton.addEventListener('click', () => this.remove());
  }
  
  remove() {
    this.el.parentNode.removeChild(this.el);
  }
}

let mainEl = document.querySelector('main');
new Feed(mainEl, 7);


