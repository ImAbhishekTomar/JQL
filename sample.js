
const odata=[
  {
  	"id": "0001",
  	"type": "donut",
  	"name": "Cake",
  	"ppu": 0.55,
    "tag":"in"
  },
  {
  	"id": "0002",
  	"type": "oman",
  	"name": "Eark",
  	"ppu": 0.67,
    "tag":"in"
  }
];

console.clear();

const query="select type,name,tag from odata where f.tag='in' and f.name!='Cake'"
const query1="select type,name,tag from odata where f.name like '%Ca%'"

const qclose=query.split(' ');
console.log(qclose);

const selectTable=eval(qclose[3]);
const columns=qclose[1]!=="*"?qclose[1].split(","):null;

const condation=qclose.slice(5,qclose.lenght)
.toString()
.replaceAll(",",' ')
.replaceAll("and",'&&')
.replaceAll("or",'||')
.replaceAll("!=",'!==');
console.log(condation);
//console.log('source data ',selectTable);
//console.log('select columns ',columns);

let selectedItems=JSON.parse(JSON.stringify(odata,columns));
//let parSelectedItems=JSON.parse(selectedItems);
//console.log(selectedItems);

const ox=selectedItems.filter(f=> {
    //f.tag==='in' && f.name==='Cake'
    if(eval(condation)) return f;
});
console.log(ox);

