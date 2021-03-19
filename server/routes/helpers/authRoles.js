
const handleRoles = (reqUser) => {
  let userRoles = [];
  if(reqUser){
    reqUser.roles.forEach(role => {
      userRoles.push(role.name)
    })
  }
  return userRoles;
}

const staffAndInstructor = async function(req, res, next){
  try{
    let userRoles = handleRoles(req.user);
   
     if(userRoles.includes("staff") || userRoles.includes("instructor") || userRoles.includes('admin')){
        next()
       return;
     }
       return res.status(401).send({ message: 'Access denied' })
  }catch (error){
    return res.status(401).json({message: "Access denied"})
  }
  
}

const isStaff = async function(req, res, next) {
  try {
    let userRoles = handleRoles(req.user);
    
    if (userRoles.includes("staff") || userRoles.includes('admin')) {
      next()
      return;
    }
    return res.status(401).send({ message: 'Access denied' })
  } catch (error) {
    return res.status(401).json({message: "Access denied"})
  }
}

const isInstructor = async function(req, res, next) {
  try {
    let userRoles = handleRoles(req.user);
    
    if (userRoles.includes("instructor") || userRoles.includes('admin') || userRoles.includes('staff')) {
      next()
      return;
    }
    return res.status(401).send({ message: 'Access denied' })
  } catch (error) {
    return res.status(401).json({message: "Access denied"})
  }
}

const isStudent = async function(req, res, next) {
  try {
    let userRoles = handleRoles(req.user);
    
    if (userRoles.includes("student")) {
      next()
      return;
    }
    return res.status(401).send({ message: 'Access denied' })
  } catch (error) {
    return res.status(401).json({ message: "Access denied" })
  }
}




module.exports = {
  isStaff,
  isStudent,
  isInstructor,
  staffAndInstructor
};



