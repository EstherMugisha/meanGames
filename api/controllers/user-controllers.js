var mongoose=require("mongoose")
var User=mongoose.model("User"); 
var bcrypt=require("bcrypt-nodejs");
var jwt = require("jsonwebtoken")

function addUser(req,res){
    console.log("registering user");
    var username=req.body.username;
    var name=req.body.name ||null;

    bcrypt.genSalt(10, function(err,salt){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            bcrypt.hash(req.body.password, salt,null, function(err,hashedPassword){
                if(err){
                    console.log(err);
                    res.status(400).json(err)
                }
                else{
                    console.log("no error");
                var password=hashedPassword;
                User.create({username:username, name:name, password:password},function(err,user){
                    if(err){
                        console.log(err);
                        res.status(400).json(err);
                    }
                    else{
                        console.log("user created", user);
                        res.status(200).json(user);
                    }
                }); 
            }
            });
        }
    })

  
}


function userLogin(req,res){
    console.log("Backend Login user controller");
    const username=req.body.username; 
    User.finc({username:username}).exec(function(err,user){
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        if(user){
            console.log(user);
            if(bcrypt.compareSync(password,user.password)){
                const token=jwt.sign({name:user.name},"cs572",{expiresIn:3600})
                res.status(200).json({success: true, token: token})
            }else{
                console.log("Password incorrect");
                res.status(401).json("use correct user name and password")
            }
            
        }
        else{
            res.status(401).json({"message":"user not found"})
        }
    })
}

function authenticate(req,res,next){
    const headerExists=req.headers.authorization;
    if(headerExists){
        const token=req.headers.authorization.split(" ")[1];
        jwt.verify(token, "cs572",function(err,decoded){
            if(err){
                console.log(err);
                res.status(401).json("unauthorized")
            }else{
                next();
            }
        })
    }else{
        res.status(403).json("no token provided")
    }
}

module.exports={
    register:addUser,
    login : userLogin,
    authenticate:authenticate
}