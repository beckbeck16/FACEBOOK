export default class User {
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