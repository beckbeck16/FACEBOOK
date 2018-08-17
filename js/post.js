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
