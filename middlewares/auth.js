const { getUser } = require("../service/auth");


function checkforauthentication(req,res,next){
  let authorisationheadervalue = req.cookies?.uid
  req.user=null;
  console.log("authorisationheadervalue",authorisationheadervalue);
// if (authorisationheadervalue){
//   // authorisationheadervalue=req.cookies;
  
// }
console.log(req.cookies)

if(!authorisationheadervalue)
  
return next();  
  const token=authorisationheadervalue;
  
  const user =getUser(token);
  req.user=user;
  return next();
}

function restrictTo(roles=[]){
  return function (req,res,next){
    console.log("hugu", req.user)
    if (!req.user)
        return res.redirect("/login")
    if (!roles.includes(req.user.role) ) 
      return res.end("UnAuthorised");
    next()
  }
}

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.headers["authorization"];

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
  restrictTo,
  checkforauthentication
};