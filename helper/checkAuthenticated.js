
const checkAuthenticated = (req , res , next) => {
    if(req.isAuthenticated()){
      res.set('Cache-control' , 'no-cache , Private, no-store, Must-revalidate, post-check=0, pre-check=0');
      return next();
    }else{
      res.redirect("/login")
    }
  } 



  export default checkAuthenticated;