const expect = require("expect");

const {Users} = require("./users");

describe("Users",() => {
    var users;

    beforeEach(() => {
        users=new Users();
        users.users=[{
            id:"1",
            name:"Mustafa",
            room:"Node Course"
        },{
            id:"2",
            name:"Vedat",
            room:"Node Course"
            },{
            id:"3",
            name:"Hakki",
            room:"React Course"
            }
        ]
    });

    it("should add new user",() => {
       var users=new Users();
       var user = {
           id:"123",
           name:"Ali",
           room:"The Office Fans"
       };
       var resUser=users.addUser(user.id,user.name,user.room);

       expect(users.users).toEqual([user]); // arraylar için toEqual

    });

    it("should remove the user",() => {
        var userId="1";
        var user=users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("should not remove the user",() => {
        var userId="1231";
        var user=users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it("should find the user",() => {
        var userId="2";
        var user=users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it("should not find the user",() => {
        var userId="99";
        var user=users.getUser(userId);

        expect(user).toNotExist();
    });


    it("should return names for node course",() => {
       var userList=users.getUserList("Node Course");

       expect(userList).toEqual(['Mustafa','Vedat'])
    });
    it("should return names for react course",() => {
        var userList=users.getUserList("React Course");

        expect(userList).toEqual(['Hakki']);
    });
});