import { useState } from 'react';
import "./App.css";
import { useNavigate } from 'react-router-dom';

import { Connect } from '../wailsjs/go/main/App';

function App() {
	const [connectingLabel, setConnectingLabel] = useState("");
	const [addr, setAddr] = useState("");
	const navigate = useNavigate();

	async function connect() {
		try {
			if (addr.length > 0) {
				setConnectingLabel('connecting...')
				await Connect(addr);
				navigate('/home', { state: { addr } });
			}
		} catch (err) {
			console.error(err);
		} finally {
			setConnectingLabel('')
		}
	}

	return (
		<main id="App">
			<h2>Welcome</h2>
			<p>Type the redis server address below</p>
			<input value={addr} onChange={e => setAddr(e.target.value)} type="text" alt="Redis server address" autoFocus />
			<button onClick={connect}>Connect</button>
			<p>{connectingLabel}</p>
		</main>
	)
}


export default App
