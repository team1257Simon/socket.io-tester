var readline = require("readline");
var keypress = require("keypress");
keypress(process.stdin);
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
process.on('SIGPIPE', process.exit);
process.stdin.resume();
var lines = [];
rl.on('line', function (line){lines.push(line);});
process.stdin.on("keypress", function(ch, key)
{
	if(key && key.ctrl && key.name ==='b')
	{
		lines.pop();
	}
	if(key && key.ctrl && key.name === 'q')
	{
		console.log(lines);
	}
});
module.exports = function(data)
{
	console.log(data);
}