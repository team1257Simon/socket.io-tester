var readline = require("readline");
var keypress = require("keypress");
keypress(process.stdin);
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var io = require("socket.io")(3000);
console.log("Waiting for connection...");
var getCallbackFunction = function(socket, cmd)
{
	var lines = [];
	var message = "";
	var inputtedfunctionalready = false;
	for(i = 1; i < cmd.length; i++)
	{
		if(cmd[i] === '-m' || cmd[i] === '--message')
			message = cmd[++i];
		else if(cmd[i] === '-f' || cmd[i] === '--function')
		{
			for(j = i+1; j < cmd.length; j++)
			{
				lines.push(cmd[j]);
			}
			inputtedfunctionalready = true;
			break;
		}
	}
	if(inputtedfunctionalready)
	{
		var cb = new Function("data", lines.join(' '));
		if(!cb)
		{
			console.log("There is an error in your code.");
		}
		else socket.on(message, cb);
	}
	else
	{
		rl.on('line', function (line){lines.push(line);});
		process.stdin.on("keypress", function(ch, key)
		{
			if(key && key.ctrl && key.name ==='b')
			{
				lines.pop();
			}
			if(key && key.ctrl && key.name === 'q')
			{
				var cb = new Function("data", lines.join(' ').replace("  ", " "));
				if(!cb)
				{
					console.log("There is an error in your code.");
				}
				socket.on(message, cb);
				process.stdin.on("keypress", function(){});
			}
		});
	}
}
io.on("connection", function (socket) {
	console.log("Connection recieved!");
	rl.on('line', function (line){
		var cmd = line.split(' ');
		if(cmd[0] === 'bind-message-listener')
		{
			getCallbackFunction(socket, cmd);
		}
		else if(cmd[0] === 'get-listener-from-file')
		{
			var msg = "", fn = "";
			for(i = 1; i < cmd.length; i++)
			{
				if(cmd[i] === "-m" || cmd[i] == "--message")
				{
					msg = cmd[++i];
				}
				else if(cmd[i] === "-i" || cmd[i] === "--inputfile")
				{
					fn = cmd[++i];
				}
			}
			socket.on(msg, require(fn));
		}
	});
});