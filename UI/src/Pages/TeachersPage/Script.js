// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

console.log("Try programiz.pro");
let userReq="Cse2"
const assignSubj=[{
    name:"Cse2",
    year:"2",
    dept:"cse",
    subjects:[
        {
            
            code:"1",
            subj:"name"
        },
        {
            
            code:"2",
            subj:"2name"
        }]
},

{
    name:"Cse4",
    year:"4",
    dept:"cse",
    subjects:[
        {
            
            code:"1",
            subj:"name"
        },
        {
            
            code:"2",
            subj:"2name"
        }]
}
]
let response=assignSubj.filter((itm)=>itm.name==userReq)[0].subjects.map((itm)=>itm)
console.log(response,'res   ')