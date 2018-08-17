
import UserService from "./userService.js";
import PostsService from "./postsService.js";
import User from './user.js';

let us = new UserService();
let userService = new UserService();
let postsService = new PostsService();

export default class Feed {
  constructor(feedEl, userId){
    this.feedEl = feedEl;
    this.fetchUser(userId);
  }
  
  fetchUser(userId){
    let currUser = userService.getUser(userId);
    this.onUser(currUser);
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
    // this.postButton = this.feedEl.querySelector('button');
    // this.textArea = this.feedEl.querySelector('textarea');
    // this.textArea.setAttribute('placeholder',       
    //       `What's on your mind, ${this.user.fullname}?`);
    // this.postButton.addEventListener('click', () => this.createPost());

    this.postForm = document.querySelector('#mind-form');
    this.postText = document.querySelector('#post-text');

    this.postForm.addEventListener('submit', () => this.postMessage());    
  }  
  
  postMessage() {
    let postBody = this.postText.value;
    this.postText.value = '';
    this.createPost(postBody, this.user, new Date().toLocaleTimeString());
  }

  createPost() {
    let postBody = this.textArea.value;
    this.textArea.value = '';
    let post = new Post(postBody, this.user);
    this.feedEl.insertBefore(post.el, this.feedEl.firstChild);
    // $(post.el).appendTo(this.feedEl);
    // this.feedEl.appendChild(post.el);
  }
}