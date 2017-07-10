const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id:'1',
      name:'Mike',
      room:'Node Course'
    },{
      id:'2',
      name:'Jen',
      room:'React Course'
    },{
      id:'3',
      name:'Jack',
      room:'Node Course'
    }];

  });

  it('should add new user',()=>{
    var users = new Users();
    var user = {id:1,
      name:'Jack',
      room:'TheHackers'
    };
    var newUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for Node Course',()=>{
    var usersList = users.getUserList('Node Course');
    expect(usersList).toEqual(['Mike','Jack']);
  });

  it('should return names for React Course',()=>{
    var usersList = users.getUserList('React Course');
    expect(usersList).toEqual(['Jen']);
  });

  it('should remove a user',()=>{
    var removedUser = users.removeUser('1');
    expect(removedUser.name).toBe('Mike');
  });

  it('should not remove a user',()=>{
    var removedUser = users.removeUser(100);
    expect(removedUser).toNotExist();
  });

  it('should not find user',()=>{
    var foundUser = users.getUser('1');
    expect(foundUser.length).toBe(1);
    expect(foundUser[0].name).toBe('Mike');
  });

});
