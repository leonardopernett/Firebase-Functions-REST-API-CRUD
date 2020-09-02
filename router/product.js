const {Router}= require('express')
const admin = require('firebase-admin')
const router = Router();

const accountService = require('../../nodejs-877f6-firebase-adminsdk-u674s-518a8edc85.json') 


admin.initializeApp({
  credential:admin.credential.cert(accountService),
  databaseURL:"https://nodejs-877f6.firebaseio.com"
})

const db = admin.firestore()


router.post('/api/products',async (req,res)=>{
  try {
     await  db.collection('products').doc('/'+req.body.id + '/').create({name:req.body.name})
     return res.status(204).json()
  } catch (error) {
     return res.status(500).send(error)
  }
 })
 
 
 router.get('/api/products/:product_id',async (req,res)=>{
   try {
       const response =  await db.collection('products').doc(req.params.product_id).get()
       const product = response.data();
       return res.status(204).json(product)
   } catch (error) {
       return res.status(500).send(error)
   }
  })
 
  router.get('/api/products/',async (req,res)=>{
      db.collection('products').get().then((snapshot)=>{
           let products = [];
           snapshot.forEach((doc)=>{
               products.push({...doc.data(), id:doc.id})
           })
           res.json(products)
          })
        .catch((err)=> console.log(err))
  })
 
 
  router.delete('/api/products/:product_id',async (req,res)=>{
   try {
       await db.collection('products').doc(req.params.product_id).delete();
       return res.status(204).json()
   } catch (error) {
       return res.status(500).send(error)
   }
  })
 
  router.put('/api/products/:product_id',async (req,res)=>{
   try {
       await db.collection('products').doc(req.params.product_id).update({
         name:req.body.name
       });
       return res.status(204).json()
   } catch (error) {
       return res.status(500).send(error)
   }
  })
 



module.exports = router;