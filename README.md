# socket.io-tester
This is a simple node app to test socket.io callback functions to see what will happen when you execute them. To bind a callback function, use:
```
node index.js
bind-message-listener -m <message>
```
and then type the code you want to be executed when the message is received. If you make a mistake, you can use ctrl+b to delete the previous line entered. When you are finished, use ctrl+q. In addition, you can use
```
bind-message-listener -m <message> -f <function
```
for short, one-line functions.

Example
=======
in terminal:
```
node index.js
bind-message-listener -m hello
console.log("hello world! here is your data: " + data);
<ctrl+q>
```
in browser javascript console, after copy-pasting the socket.io.js file:
```
io("http://localhost:3000").emit("hello", "You will give me an egg.");
```
When you type this, the node app should output, "hello world! here is your data: You will give me an egg."
