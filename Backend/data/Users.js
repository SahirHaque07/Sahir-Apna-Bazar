import bcrypt from "bcryptjs";
const users = [
  {
    name: "Sahir",
    email: "Sahir@sahir.com",
    password: bcrypt.hashSync("123456", 10),
    IsAdmin: true,
  },
  {
    name: "King",
    email: "king@king.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user",
    email: "user@user.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
