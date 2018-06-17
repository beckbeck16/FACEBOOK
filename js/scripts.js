function onEditPost(event){
    alert('TODO Edit');
}

function onDeletePost(event){
    alert('TODO Delete');
}

function onCreatePost(){

    let postText = document.querySelector("#post-text");
    let postArea = document.querySelector("#posts-area");
    
    let newPost = document.createElement('div');
    // newPost.classList.add('post-item');
    // newPost.innerText = postText.value;
    newPost.innerHTML=`                
    <div class="post-item">
        <a class="post-profile">
            <img class="post-profile-img" src="https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-1/p40x40/26992702_10213578644514950_3193940428532612544_n.jpg?_nc_cat=0&oh=d6af27545c83f67f741a4458ef48fe85&oe=5BBBA7C2"></img>
            <span>Becky Hosgun</span>
            <img class="post-button" id="post-edit" onclick="onEditPost()" src="https://image.flaticon.com/icons/svg/61/61456.svg" alt="">
            <img class="post-button" id="post-delete" onclick="onDeletePost()" src="https://image.flaticon.com/icons/svg/61/61848.svg" alt="">
        </a>
        <div class="post-text">
            <span>` + postText.value + `</span>
        </div>
    </div>`;
    postArea.insertBefore(newPost, postArea.firstChild);

    postText.value = "";
}
