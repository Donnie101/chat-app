class Users{
  constructor(){
    this.users = [];
  }

  addUser(id,name,room){
    var user = {id,name,room}
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var removedUsers = this.users.filter((user)=>{
      return user.id ===id;
    });
    var removedUser = removedUsers[0];

    var users = this.users.filter((user)=>{
      return user.id !==id;
    });

    this.users = users;
    return removedUser;
  }

  getUser(id){
    var foundUser = this.users.filter((user)=>{
      return user.id === id;
    });
    return foundUser;
  }

  getUserList(room){
    var users = this.users.filter((user)=>{
      return user.room === room
    });
    var namesArray = users.map((user)=>{
      return user.name;
    });
    return namesArray;

  }

}
module.exports = {Users};
