var fs = require('fs');
var csv = require('fast-csv');
var time = new Date();
var fileName = 'outputs/'+time+'.csv';
fs.writeFile(fileName,'' ,function(){console.log("merging different csv file")});






fs.createReadStream(__dirname+'/outputs/web3input.csv')
	.pipe(csv())
	.on('data',function(data){
		console.log(data);
		fs.appendFile(fileName,data + '\n' ,function(){});
	})
	.on('end',function(data){
		console.log('Read finished');
		
	});


fs.createReadStream(__dirname+'/outputs/web3input1.csv')
	.pipe(csv())
	.on('data',function(data){
		console.log(data);
		fs.appendFile(fileName,data + '\n' ,function(){});
	})
	.on('end',function(data){
		console.log('Read finished');
	});













//var lines = fileContents.toString().split('\n');


/*
console.log(lines);
console.log(lines.length);


for (var i = 0; i < lines.length; i++) {
	people.push(lines[i].toString().split(','));
}

console.log(people)

for (var i = 0; i < lines.length; i++) {
	for (var j = 0; j < 3; j++) {
		console.log(people[i][j]);
	}
	console.log('\n');
}
*/


