window.addEventListener("load", () => {
	let buttonElements = document.body.getElementsByClassName("audio-play-button");
	let muteButtonElement = document.getElementById("volume");
	let audioElement = document.body.getElementsByTagName("audio")[0];
	let audioSliderElement = document.getElementById("volume-slider");
	audioElement.volume = audioSliderElement.value;

	let lastButton = null;
	
	for (let button of buttonElements) {
		button.onclick = () => {
			const btn_audio_path = button.dataset["src"];
			console.log(btn_audio_path);
			console.log(audioElement.getAttribute("src"));
			
			if (btn_audio_path !== audioElement.getAttribute("src")) {
				audioElement.src = btn_audio_path;
				audioElement.load();
				audioElement.play();
				button.dataset["state"] = "play";
				if(lastButton !== null)
				{
					lastButton.dataset["state"] = "pause";
				}
				
				lastButton = button;
			} else {
				if (audioElement.paused || audioElement.ended) {
					audioElement.play();
					button.dataset["state"] = "play";
				} else {
					audioElement.pause();
					button.dataset["state"] = "pause";
				}
			}
		}
	}
	
	audioSliderElement.oninput = (e) => {
		audioElement.volume = e.target.value;
		if (audioElement.volume > 0)
		{
			delete muteButtonElement.dataset.muted;
		}
	};
	
	audioSliderElement.onwheel = (e) => {
		if (e.deltaY < 0){
			audioSliderElement.valueAsNumber += 0.05;
		} else {
			audioSliderElement.value -= 0.05;
		}
		
		audioElement.volume = audioSliderElement.value;
		e.preventDefault();
		e.stopPropagation();
	}
	
	muteButtonElement.onclick = () => {
		if (audioElement.volume === 0) {
			audioElement.volume = audioSliderElement.value;
			delete muteButtonElement.dataset.muted;
		} else {
			audioElement.volume = 0;
			muteButtonElement.dataset.muted = true;
		}
	};
});