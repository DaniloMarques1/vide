import './style.css';
import './home.css';

import { GetAddress } from '../wailsjs/go/main/App';

const addressConected = document.querySelector('#address_connected') as HTMLElement;

GetAddress().then(addr => {
	console.log(addr);
	addressConected.innerText = addr;
});

window.getAddress();

declare global {
	interface Window {
		getAddress: () => void;
	}
}
