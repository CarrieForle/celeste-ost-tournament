const candidates = new Map([
	["media/Lena Raine - Celeste Original Soundtrack - 01 Prologue.mp3", "01 Prologue"],
	["media/Lena Raine - Celeste Original Soundtrack - 02 First Steps.mp3", "02 First Steps"],
	["media/Lena Raine - Celeste Original Soundtrack - 03 Resurrections.mp3", "03 Resurrections"],
	["media/Lena Raine - Celeste Original Soundtrack - 04 Awake.mp3", "04 Awake"],
	["media/Lena Raine - Celeste Original Soundtrack - 05 Postcard from Celeste Mountain.mp3", "05 Postcard from Celeste Mountain"],
	["media/Lena Raine - Celeste Original Soundtrack - 06 Checking In.mp3", "06 Checking In"],
	["media/Lena Raine - Celeste Original Soundtrack - 07 Spirit of Hospitality.mp3", "07 Spirit of Hospitality"],
	["media/Lena Raine - Celeste Original Soundtrack - 08 Scattered and Lost.mp3", "08 Scattered and Lost"],
	["media/Lena Raine - Celeste Original Soundtrack - 09 Golden.mp3", "09 Golden"],
	["media/Lena Raine - Celeste Original Soundtrack - 10 Anxiety.mp3", "10 Anxiety"],
	["dummy", "dummy"],
	["dummy2", "dummy2"],
	["dummy3", "dummy3"],
]);

let candidateElements = [];
let candidateInputs = [];

for (const [track_path, track_name] of candidates) {
	let div = document.createElement("div");
	candidateElements.push(div);
	let btn = document.createElement("button");
	let label = document.createElement("label");
	let inp = document.createElement("input");
	candidateInputs.push(inp);
	let paragraph = document.createElement("p");
	div.appendChild(btn);
	div.appendChild(label);
	label.appendChild(inp);
	
	div.setAttribute("class", "poll-option");
	btn.setAttribute("class", "audio-play-button");
	btn.type = "button";
	btn.setAttribute("data-src", track_path);
	btn.setAttribute("data-state", "pause");
	inp.type = "radio";
	inp.name = "celeste ost";
	paragraph.innerHTML = track_name;
	label.appendChild(paragraph);
}

let voteBtn = document.createElement("button");
voteBtn.innerHTML = "Submit";
voteBtn.setAttribute("class", "vote-button");
voteBtn.onclick = (e) => {
	console.log(`submit ${e.target.value}`);
}

window.addEventListener("load", () => {
	const body = document.body;
	
	document.onscroll = () => {
		body.style.backgroundPosition = `center ${document.scrollingElement.scrollTop * 0.75 - 100}px`;
	}
	
	const pollElement = body.getElementsByClassName("poll")[0];
	let audioElement = new Audio();
	audioElement.loop = true;
	audioElement.preload = "none";
	body.appendChild(audioElement);
	
	for (const candidate of candidateElements) {
		pollElement.appendChild(candidate);
	}
	
	pollElement.appendChild(voteBtn);
	
	let lastChosenCandidate = null;
	
	candidateInputs.forEach((inp) => {
		inp.oninput = (e) => {
			let src = e.target;
			src.parentNode.parentNode.dataset.chosen = true;
			if (lastChosenCandidate !== null) {
				delete lastChosenCandidate.parentNode.parentNode.dataset.chosen;
			}
			
			lastChosenCandidate = src;
		}
	});
});