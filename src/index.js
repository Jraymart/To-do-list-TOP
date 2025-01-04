//test webpack setup of index.js
console.log("test index.js");

//test DOM via webpack
const contentDiv = document.querySelector(".content");
const testH1 = document.createElement("h1");
testH1.textContent = "Hello world";
contentDiv.appendChild(testH1);