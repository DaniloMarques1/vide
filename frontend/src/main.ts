import './style.css';
import './app.css';

import logo from './assets/images/logo-universal.png';
import {Greet, PrintSomethingOnScreen} from '../wailsjs/go/main/App';

// Setup the greet function
window.greet = async function () {
	console.log("opa");
	// Get name
	let name = nameElement!.value;

	// Check if the input is empty
	if (name === "") return;

	// Call App.Greet(name)
	try {
		const result = await Greet(name);
		resultElement!.innerHTML = result;
	} catch (err: any) {
		console.log(JSON.parse(err));
	}
};

window.printSomethingOnScreen = async () => {
	try {
		const result = await PrintSomethingOnScreen();
		console.log(result);
	} catch (err: any) {
		console.error(Err);
	}
};

document.querySelector('#app')!.innerHTML = `
    <img id="logo" class="logo">
    <div class="result" id="result">Please enter your name below 👇</div>
      <div class="input-box" id="input">
        <input class="input" id="name" type="text" autocomplete="off" />
        <button class="btn" onclick="greet()">Greet</button>
      </div>
			<button class="print" onclick="printSomethingOnScreen()">Print</button>
			<a href="../another.html">Navigate</a>
    </div>
`;
(document.getElementById('logo') as HTMLImageElement).src = logo;

let nameElement = (document.querySelector("#name") as HTMLInputElement);
nameElement.focus();
let resultElement = document.querySelector("#result");

declare global {
	interface Window {
		greet: () => void;
	}
}
