const express=require('express');
const path=require('path');
const port =8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

// Middle ware
// app.use(function(req,res,next){
//     console.log('MW1 called');
//     next();
// });

// app.use(function(req,res,next){
//     console.log('MW2 called');
//     next();
// })

var contactList =[
    {
        name:"Aditya Mishra",
        phone:"123456789"
    },
    {
        name:"Tony Stark",
        phone:"145495956"
    },
    {
        name:"John Snow",
        phone:"59494995"
    }
]

app.get('/' , function(req,res){
    
    return res.render('home',{
        title:"Contact List",
        contact_list:contactList
    });
});


// For adding new contact into the List after reading the form data 
// app.post('/create-contact',function(req,res){
//     // contactList.push({
//     //     name:req.body.name,
//     //     phone:req.body.phone
//     // });
//     contactList.push(req.body)
//     Contact.create({
//         name:req.body.name,
//         phone:req.body.phone
//     },function(err,newContact){
//         if(err){
//             console.log("Erron in creating a new contact",err);
//             return;
//         }
//         return res.redirect('back');
//     });

// });
     
    // return res.redirect('back');
// });
app.post('/create-contact', async function (req, res) {
    try {
        // Push the request body directly into the contactList
        contactList.push(req.body);

        // Create a new contact using async/await
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });

        return res.redirect('back');
    } catch (err) {
        console.error("Error in creating a new contact", err);
        return res.status(500).send("Internal Server Error"); // You can customize the error response as needed
    }
});


app.post('/create-contac',function(){});


// To delete contact 
app.get('/delete-contact/',function(req,res){
    // for getting th query from URL
    let phone=req.query.phone;

    let contectIndex=contactList.findIndex(contact => contact.phone== phone);
    if(contectIndex != -1){
        contactList.splice(contectIndex,1);
    }

    return res.redirect('back');

});

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('My express server is running on port',port);
})