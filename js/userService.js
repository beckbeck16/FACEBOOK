import User from './user.js';

export default class UserService {  
  getUser(id) {
    return new User('Becky', 'Hosgun', 'https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-1/p40x40/26992702_10213578644514950_3193940428532612544_n.jpg?_nc_cat=0&oh=d6af27545c83f67f741a4458ef48fe85&oe=5BBBA7C2');
  }
}