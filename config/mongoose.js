const { default: mongoose } = require('mongoose');
const mangoose=require('mongoose');

main().catch(err => console.log(err));

async function main() {
    // Here whatever name we declare , then with that name collection is created in DB
  await mongoose.connect('mongodb://127.0.0.1:27017/contacts-list-db');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const db=mongoose.connection;
db.once('open',function(){
    console.log('sucessefully connected to data based ')
});