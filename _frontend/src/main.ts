import './style.css';
import './main.css';

import { Connect } from '../wailsjs/go/main/App';

window.connect = async () => {
	try {
		// TODO: validate
		if (addressInput.value.length > 0) {
			btnConnect.disabled = true;
			connectingLabel.innerText = 'connecting...';
			await Connect(addressInput.value)
			connectingLabel.innerText = 'conectado';
			window.location.replace('home.html');
		}
	} catch(err: any) {
		connectingLabel.innerText = '';
		console.error(err);
	} finally {
		btnConnect.disabled = false;
	}
};

const addressInput = document.querySelector('#address') as HTMLInputElement;
const connectingLabel = document.querySelector('#connecting_label') as HTMLElement;
const btnConnect = document.querySelector('#connect') as HTMLButtonElement;
btnConnect?.addEventListener('click', window.connect);

declare global {
	interface Window {
		connect: () => void;
	}
}
