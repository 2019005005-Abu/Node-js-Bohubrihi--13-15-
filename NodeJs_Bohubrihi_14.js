const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mystudents-info',{
useNewURlParser:true,
useUnifiedTopology:true
})
.then(function(){
	console.log("Connect to MongoDB Succesfully");
}).catch(function(err){
	console.error('connected Failed');
})


//Making a MongoDB Scema Model
const  studentsScema= new mongoose.Schema({
first_name:String,
last_name:{type:String,required:[true,'Please insert LastName']},
dob:{type:Date,validate:{
validator:(value)=>new value>new Date("1 January 2000"),
message:"Date  Must be after 1 January 2000"
}},
entryDate:{type:Date,default:Date.now},
passed:Boolean,
hobbies:{
type:Array,
of:String,
validate:{
validator:(value)=>value.length>0,
message:"There must be at lest 1"
}
},
parents:{
father_name:String,
mother_name:{type:String},
},
subject:[{name:String,marks:{type:Number,min:0,max:100}}],
example:{a:String,type:{type:String}}
})
console.log("The Schema Model is ",studentsScema);

//Mongoose Scema Model


const  Student=mongoose.model('Student',studentsScema);
async function createStudent(){
try{
	const data=await Student.create({
first_name:'Abu Al Shahriar',
//last_name:'Rifat',
entryDate:('30 Nov 1998'),
passed:true,
hobbies:[],
parents:{
father_name:'Sohrab Ali',
mother_name:'Sanjida Sultana Mukta',
},
subject:[{name:'Math',marks:80},{name:'English',marks:55}]		
})
console.log(data)
}catch(err){
console.log(err.message)
    }
	
	
	
}
