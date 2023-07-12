var exp = require("express")
var router = exp();
var bodyparser = require("body-parser")
var mongoose = require("mongoose");
mongoose.connect('mongodb://0.0.0.0:27017/LoginForm', { useNewUrlParser: true });
console.log('Connected to database!');
router.engine('html',require('ejs').renderFile)
router.use(exp.static("./public"))
let alert = require('alert'); 
const userSchema = new mongoose.Schema({
    username: String,
    email:String,
    address:String,
    phone:Number,
    password:String,
    confirm_password:String
  });
const User = mongoose.model('signup', userSchema);
const cartSchemanew = new mongoose.Schema({
  username: String,
  total:String,
  dosai:String,
  idly:String,
  poori:String,
  pongal:String,
  biriyani:String,
  rice:String,
  cost:String,
  createdAt: {type: Date, default: Date.now}
});

const cartSchemaall = new mongoose.Schema({
  username: String,
  total:String,
  dosai:String,
  idly:String,
  poori:String,
  pongal:String,
  biriyani:String,
  rice:String,
  cost:String,
  createdAt: {type: Date, default: Date.now}
});

const Cart = mongoose.model('cart', cartSchemanew);
const Cartalls = mongoose.model('cartall', cartSchemaall);
router.use(bodyparser.urlencoded ({extended : true}))

router.get("/signup",function(req,res){
    res.sendFile(__dirname+'/signup.html')
});

router.get("/aboutus",function(req,res){
  res.sendFile(__dirname+'/aboutus.html')
});

router.get("/login11",function(req,res){
  res.sendFile(__dirname+'/login.html')
});

// router.get("/orders",async function(req,res){
//   if(await Cart.find({username:username1}))
//   {
//     const cart = await Cart.find({username:username1})
//     const total3=cart.total;
//     const dosai3=cart.dosai;
//     const idly3=cart.idly;
//     const poori3=cart.poori;
//     const pongal3=cart.pongal;
//     const biriyani3=cart.biriyani;
//     const rice3=cart.rice;
//     const cost3=cart.cost;
//     res.render(__dirname+'/myorder.html',{username1,total3,dosai3,idly3,poori3,pongal3,biriyani3,rice3,cost3})
//   }
//   else{
//     res.status(500).send('No previous orders exists');
//   }
// });

router.get("/orders", async function(req, res) {
  try {
    const carts = await Cartalls.find({username:username1}); // Fetch all documents from the "Cart" collection
    if (carts.length > 0) {
      res.render(__dirname+'/myorder.html', { carts });
    } else {
      res.status(500).send("No previous orders exist");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
});

router.post("/login11",function(req,res){
  res.sendFile(__dirname+'/login.html')
});
router.get("/",function(req,res){
    res.sendFile(__dirname+'/home.html')
});

router.get("/profile",async function(req,res){
  const user = await User.findOne({username:username1})
  const username2=user.username;
  const email1=user.email;
  const address1=user.address;
  const phone1=user.phone;
  res.render(__dirname+'/profile.html',{username2,email1,address1,phone1})
});

router.post("/updateprofile",async function(req,res){
  const {email1,address1,phone1,password2}=req.body;
  const useer = await User.findOne({username:username1})
  useer.username = username1;
  useer.email=email1;
  useer.address=address1;
  useer.phone=phone1;
  if(password2 != '')
  {
    useer.password=password2;
    useer.confirm_password=password2;
  }
  
  await useer.save();
  //const username=username1;
  res.render(__dirname+'/home11.html',{username1})
});


router.post("/thankyou",async function(req,res){
  var{ username,total,dosai,idly,poori,pongal,biriyani,rice,cost } = req.body;
  dosai=parseInt(dosai);
  idly=parseInt(idly);
  poori=parseInt(poori);
  pongal=parseInt(pongal);
  biriyani=parseInt(biriyani);
  rice=parseInt(rice);
  total=parseInt(total);
  cost=parseInt(cost);
  if(dosai > dosai2){
    alert("dosai is less")
  }
  if(idly > idly2){
    alert("idly is less")
  }
  if(poori > poori2){
    alert("poori is less")
  }
  if(pongal > pongal2){
    alert("pongal is less")
  }
  if(biriyani > biriyani2){
    alert("biriyani is less")
  }
  if(rice > rice2){
    alert("rice is less")
  }
  if(dosai <= dosai2 && idly <= idly2 && poori <= poori2 && pongal <= pongal2 && biriyani <= biriyani2 && rice<=rice2){
    const cart = await Cart.findOne({username:username1})
    const check=Object.is(cart, null)
    console.log(check)
    if(check === false)
    {
      const cartitem = await Cart.findOne({username:username1})
      cartitem.total=total;
      cartitem.dosai=dosai;
      cartitem.idly=idly;
      cartitem.poori=poori;
      cartitem.pongal=pongal;
      cartitem.biriyani=biriyani;
      cartitem.rice=rice;
      cartitem.cost=cost;
      await cartitem.save();
      const cartall = new Cartalls({ username,total,dosai,idly,poori,pongal,biriyani,rice,cost }); 
      await cartall.save();
    }
    else if(check === true){
      const cart = new Cart({ username,total,dosai,idly,poori,pongal,biriyani,rice,cost }); 
      await cart.save();
      const cartall = new Cartalls({ username,total,dosai,idly,poori,pongal,biriyani,rice,cost }); 
      await cartall.save();
    }
    dosai2 = dosai2 - dosai;
    idly2 = idly2 - idly;
    poori2 = poori2 - poori;
    pongal2 = pongal2 - pongal;
    biriyani2 = biriyani2 - biriyani;
    rice2 = rice2 - rice;
    const cart8 = await User.findOne({username:username1})
    const mail = cart8.email;
    console.log(cart8);
    console.log("Balance in shop")
    console.log(dosai2,idly2,poori2,pongal2,biriyani2,rice2)
    // main({ username,total,dosai,idly,poori,pongal,biriyani,rice,cost,mail })

    res.render(__dirname+'/thank.html')
  }
});


router.post("/send", async function(req,res){
  try {
    const { username, email,address,phone,password,confirm_password} = req.body; 
    if(await User.findOne({username:username})){
      res.status(500).send('username already exists');
    } 
    else if(await User.findOne({email:email}))
    {
      res.status(500).send('email already exists');
    }
    else{
      const signup = new User({ username, email,address,phone,password,confirm_password }); 
      await signup.save();
      res.sendFile(__dirname+'/login.html')
    }
    
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to database');
  }
});
router.post('/login',async(req,res)=>{
  try {
    const {username,password} = req.body
    if(username === "Admin"){
      const user = await User.findOne({username:username})
      if(password === user.password){
        res.render(__dirname+'/admin.html',{username})
      }else{
        console.log('incorrect creds')
        res.status(500).send('Incorrect password');
      }
    }
    else{
      const user = await User.findOne({username:username})
      // console.log(user);
      if(password === user.password){
        global.username1=username;
        console.log(username);
        res.render(__dirname+'/home11.html',{username1})
      }else{
        console.log('incorrect creds')
        res.status(500).send('Incorrect password');
      }
    }
  } catch (error) {
    res.status(500).send({error})
  }
})

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main({ username,total,dosai,idly,poori,pongal,biriyani,rice,cost,mail }) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "santhoshsanthosh01072002@gmail.com", // generated ethereal user
      pass: 'kzmnspmrhnomlyol', // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: 'santhoshsanthosh01072002@gmail.com', // sender address
    to: mail, // list of receivers
    subject: "Food Ordering System", // Subject line
    html: "<h1>Bill for your order:</h1><br><br><b>Username: </b><label>"+username+"</label><br><b>Total :</b><label>"+total+"</label><br><b>Dosai: </b><label>"+dosai+"</label><br><b>Idly: </b><label>"+idly+"</label><br><b>Poori: </b><label>"+poori+"</label><br><b>Pongal: </b><label>"+pongal+"</label><br><b>Biriyani: </b><label>"+biriyani+"</label><br><b>Rice: </b><label>"+rice+"</label><br><b>Cost: </b><label>"+cost+"</label>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
//to add items to cart

router.post("/cartitems", async function(req,res){
  try {
    console.log(req.body);
    var {dosai,idly,poori,pongal,biriyani,rice} = req.body; 
    
    dosai=parseInt(dosai);
    idly=parseInt(idly);
    poori=parseInt(poori);
    pongal=parseInt(pongal);
    biriyani=parseInt(biriyani);
    rice=parseInt(rice);
    var total=dosai+idly+poori+pongal+biriyani+rice;
    var cost=dosai*50 + idly*20 + poori*30 +pongal*40 + biriyani*120 + rice*80;
    if(dosai > dosai2){
        alert("dosai is less")
    }
    if(idly > idly2){
      alert("idly is less")
    }
    if(poori > poori2){
      alert("poori is less")
    }
    if(pongal > pongal2){
      alert("pongal is less")
    }
    if(biriyani > biriyani2){
      alert("biriyani is less")
    }
    if(rice > rice2){
      alert("rice is less")
    }
    if(dosai <= dosai2 && idly <= idly2 && poori <= poori2 && pongal <= pongal2 && biriyani <= biriyani2 && rice<=rice2){


      if(cost === ''){
        alert("Select atleast one item");
      }
      else{
        console.log("ORdered items");
        console.log(dosai,idly,poori,pongal,biriyani,rice);
        res.render(__dirname+'/cart.html',{username1,total,dosai,idly,poori,pongal,biriyani,rice,cost})
        
      }
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to database');
  }
});

//for admin page retrival
router.post("/admin", async function(req,res){
  try {
    //console.log(req.body);
    const {username,dosai1,idly1,poori1,pongal1,biriyani1,rice1} = req.body; 
    //global.dosai2;
    global.dosai2 = parseInt(dosai1);
    //global.idly2;
    global.idly2 = parseInt(idly1);
    //global.poori2;
    global.poori2 = parseInt(poori1);
    global.pongal2 = parseInt(pongal1);
    global.biriyani2 = parseInt(biriyani1);
    global.rice2 = parseInt(rice1);
    console.log(dosai2,idly2,poori2,pongal2,biriyani2,rice2);
    res.sendFile(__dirname+'/login.html')
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to database');
  }
});

router.post("/deleteuser",async function(req,res){
  const{username1}=req.body;
  if(username1 =="Admin")
  {
    res.status(500).send('Cannot delete your aacount');
  }
  else if(await User.findOne({username:username1})){
    const user = await User.deleteOne({username:username1})
    res.sendFile(__dirname+'/login.html')
  }
  else{
    res.status(500).send('No such user');
  }
});


router.listen(8080,()=>{console.log("Server Listening")});
    