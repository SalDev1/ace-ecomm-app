/*
   This helps us in dealing with async errors , 
   for eg :- while creating a product , if someone forgots to put the product name .
   It will go into infinite loop.

   So due to this ,  we are creating the middleware for this.
*/
export default (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
