const IO = require("../utils/io");
const io = new IO("./database/db.json");
const Register = require("../models/model.register");

const register = async (req, res) => {
    const users = await io.read();
    const { firstname, lastname, email, username, password } = req.body;
    if(!email){
        res.status(400).json({ error: "Email is required!" });
    }

    // Regular expression for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }else{
        const id = (users[users.length - 1]?.id || 0) + 1;
        const exist = users.find((user) => user.username === username);
    
        if(!exist) {
            const newUser = new Register(id, firstname, lastname, email, username, password);
            const data = users.length ? [...users, newUser] : [newUser];
            await io.write(data);
            res.status(201).json({message: "Created"});
        }else{
            res.status(400).json({error: "This user exists"});
        }    
    }

}

const login = async (req, res) => {
    const users = await io.read();
    const { username, password } = req.body;
    const exist = users.find((user) => user.username === username && user.password === password);
    if(exist) {
        res.status(200).json({message: "Success"});
    }else{
        res.status(404).json({message: "Not Found"});
    }
}

const show = async (req, res) => {
    const users = await io.read();
    users ? res.status(200).json({message: "Success", users}) : [];
}

const showById = async (req, res) => {
    const users = await io.read();
    const { id } = req.params;
    const user = users.find(user => user.id == id);
    res.status(200).json({message: "Success", user});
}

module.exports = {
    register,
    login,
    show,
    showById
}