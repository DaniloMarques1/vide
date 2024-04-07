import './Home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Disconect, Get } from '../wailsjs/go/main/App';

function Home() {
	const location = useLocation();
	const navigate = useNavigate();
	const { addr } = location.state;
	const [key, setKey] = useState("");
	const [redisValue, setRedisValue] = useState("");

	async function disconect() {
		await Disconect();
		navigate(-1);
	}

	async function searchKey() {
		try {
			if (key.length) {
				let val = await Get(key);
				try {
					val = JSON.stringify(JSON.parse(val), null, 4)
				} catch (err) {
					console.log("Not a json");
				}

				setRedisValue(val);
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div>
			<h4>You are connected to {addr}</h4>
			<button onClick={disconect}>Disconect</button>
			<p>Search for a redis key</p>
			<div id="input">
				<input value={key} onChange={e => setKey(e.target.value)} />
				<button onClick={searchKey}>search</button>
			</div>

			<textarea readOnly value={redisValue} rows={20} cols={30} />
		</div >
	);
}

export default Home;
