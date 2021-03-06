class PostsService {
    getPosts() {
        fetch('http://127.0.0.1:3000')
            .then((data) => {
                data.json()
                    .then((res) => {
                        res.posts.forEach(element => {
                            feed.createPost(element.message,
                                new User(element.firstname, element.lastname, element.userimage),
                                element.time,
                                element.postimage,
                                element.likes);
                        });
                        localStorage.setItem("posts", JSON.stringify(res.posts));
                    });
            })
            .catch(() => {
                let postsArr = JSON.parse(localStorage.getItem("posts"));
                postsArr.forEach(element => {
                    feed.createPost(element.message,
                        new User(element.firstname, element.lastname, element.userimage),
                        element.time,
                        element.postimage,
                        element.likes);
                });
            });
    }
}

class User {
    constructor(name, lastname, profileimage) {
        this.name = name;
        this.lastname = lastname;
        if (profileimage == '') {
            this.profileimage = 'https://image.jimcdn.com/app/cms/image/transf/none/path/scee97f16a549ecc0/image/i365dfb048b31ef62/version/1525282413/image.png';
        } else {
            this.profileimage = profileimage;
        }
    }

    get fullname() {
        return `${this.name} ${this.lastname}`;
    }
}

class Feed {
    constructor(feedEl) {
        this.feedEl = feedEl;
        this.user = new User('Becky', 'Hosgun', 'https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-1/p40x40/26992702_10213578644514950_3193940428532612544_n.jpg?_nc_cat=0&oh=d6af27545c83f67f741a4458ef48fe85&oe=5BBBA7C2');
        this.postForm = document.querySelector('#mind-form');
        this.postText = document.querySelector('#post-text');

        this.postForm.addEventListener('submit', () => this.postMessage());
        (new PostsService).getPosts();
    }

    postMessage() {
        let postBody = this.postText.value;
        this.postText.value = '';
        this.createPost(postBody, this.user, new Date().toLocaleTimeString());
    }

    createPost(postMessage, postAuthor, postTime, postImage, postLikes) {
        let post = new Post(postMessage, postAuthor, postTime, postImage, postLikes);
        this.feedEl.insertBefore(post.el, this.feedEl.firstChild);
    }
}

class Post {
    constructor(postBody, author, postTime, postImage, postLikes) {
        this.likes = postLikes;
        this.posttime = postTime;
        this.author = author;
        this.text = postBody;
        this.postimage = postImage;

        this.el = document.createElement('article');
        this.el.className = 'post-item';
        this.el.innerHTML = `
                <a class="post-profile">
                    <figure>
                        <img class="post-profile-img" src=${author.profileimage}></img>
                        <figcaption>
                            <author>${author.fullname}</author>
                            <div class="post-details">
                                <span class="post-time">${postTime}</span>
                                <span class="post-type-icon">
                                    <i class="fas fa-globe"></i>
                                </span>
                            </div>
                        </figcaption>
                    </figure>
                    <div class="post-buttons">
                        <img class="post-button" id="post-edit" src="https://image.flaticon.com/icons/svg/61/61456.svg" alt="">
                        <img class="post-button" id="post-delete" src="https://image.flaticon.com/icons/svg/61/61848.svg" alt="">
                    </div>
                </a>
                <div class="post-text">
                    <span class="text">${postBody}</span>
                </div>
                <div class="post-footer">
                    <div class="post-likes">
                    </div>
                    <div class="footer-buttons">
                        <span><a class="footer-button footer-button-like">Like</a></span>
                        <span><a class="footer-button footer-button-comment">Comment</a></span>
                        <span><a class="footer-button footer-button-share">Share</a></span>
                    </div>
                    <div class="post-comments">
                        <img class="footer-comment-img" src=${feed.user.profileimage}></img>
                        <div class="footer-comment-text"><input placeholder="Write a comment..."></input></div>
                    </div>
                </div>
            `;

        let posttext = this.el.querySelector(".post-text");
        posttext.innerHTML = this.createPostTextArea(postBody, this.postimage);

        let likes = this.el.querySelector(".post-likes");
        if (postLikes) {
            likes.innerHTML = `<span><a class="footer-likes">${postLikes}</a></span>`;
        }
        else {
            likes.parentNode.removeChild(likes);
        }

        this.removeButton = this.el.querySelector('#post-delete');
        this.removeButton.addEventListener('click', () => this.remove());

        this.editButton = this.el.querySelector('#post-edit');
        this.editButton.addEventListener("click", () => this.edit());
    }

    remove() {
        this.el.parentNode.removeChild(this.el);
    }

    edit() {
        this.editButton.disabled = true;
        let currentPostText = this.text;
        let editPost = document.createElement("input", "edit_post", this.el);
        editPost.className = "edit-post-text";
        let textpost = this.el.querySelector('.post-text');
        this.el.replaceChild(editPost, textpost);
        editPost.value = currentPostText;
        editPost.focus();
        editPost.addEventListener('keydown', (event) => {
            let newPostText = editPost.value;
            if (event.key === "Enter") {
                this.editButton.disabled = false;
                this.el.replaceChild(textpost, editPost);
                textpost.innerHTML = this.createPostTextArea(newPostText, this.postimage);

                this.posttimeEdited = new Date().toLocaleTimeString()
                let postime = this.el.querySelector('.post-time');
                postime.innerText = `Last Edit: ${this.posttimeEdited}`;
            }
        });
    }

    createPostTextArea(text, image) {
        if (image) {
            return `<span class="text">${text}</span>
                <img src="${image}"><img>`;
        } else {
            return `<span class="text">${text}</span>`;
        }
    }
}

let feed = new Feed(document.querySelector('#posts-area'));
