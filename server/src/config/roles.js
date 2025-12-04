
const UserRoles= Object.freeze({
    ADMIN: {
      name : "admin",
      level : 1
    },
    USER: {
      name : "user",
      level : 0
    },
    getRole(name){
      name = name.toUpperCase();
      return this[name];
    }
  });


module.exports = UserRoles;


