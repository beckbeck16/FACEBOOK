class User {
    constructor(name, lastname, profileimage){
      this.name = name;
      this.lastname = lastname;
      if(profileimage == ''){
          this.profileimage = 'https://image.jimcdn.com/app/cms/image/transf/none/path/scee97f16a549ecc0/image/i365dfb048b31ef62/version/1525282413/image.png';
      } else{
         this.profileimage = profileimage;
      }
    }
    
    get fullname() {
      return `${this.name} ${this.lastname}`;
    }
}
  
class Feed {
    constructor(feedEl){
        this.feedEl = feedEl;
        this.user = new User('Becky', 'Hosgun', 'https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-1/p40x40/26992702_10213578644514950_3193940428532612544_n.jpg?_nc_cat=0&oh=d6af27545c83f67f741a4458ef48fe85&oe=5BBBA7C2');
        this.postForm = document.querySelector('#mind-form');
        this.postText = document.querySelector('#post-text');
    
        this.postForm.addEventListener('submit', () => this.postMessage());
    }

    postMessage() {
        let postBody = this.postText.value;
        this.postText.value = '';
        this.createPost(postBody, this.user);
    }

    createPost(postMessage, postAuthor) {
        let post = new Post(postMessage, postAuthor);
        this.feedEl.insertBefore(post.el, this.feedEl.firstChild);
    }
}
  
class Post {
    constructor(postBody, author) {
        this.el = document.createElement('article');
        this.el.className = 'post-item';
        this.el.innerHTML = `
            <a class="post-profile">
                <img class="post-profile-img" 
                     src=${author.profileimage}></img>
                <author>${author.fullname}</author>
                <img class="post-button" id="post-edit" onclick="onEditPost()" src="https://image.flaticon.com/icons/svg/61/61456.svg" alt="">
                <img class="post-button" id="post-delete" src="https://image.flaticon.com/icons/svg/61/61848.svg" alt="">
            </a>
            <div class="post-text">
                <span>${postBody}</span>
            </div>`;
      
        this.removeButton = this.el.querySelector('#post-delete');
        this.removeButton.addEventListener('click', () => this.remove());
    }
    
    remove() {
        this.el.parentNode.removeChild(this.el);
    }
}
  
let feed = new Feed(document.querySelector('#posts-area'));

fetch('http://127.0.0.1:3000')
  .then((data) => {
    data.json()
      .then((res) => {
        res.posts.forEach(element => {
          feed.createPost(element.message,  new User(element.firstname, element.lastname, element.userimage));
        });
      });
  });