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
	
	audioSliderElement.onkeydown = (e) => {
		if (e.isComposing) return;
		
		if (e.code === "ArrowUp" || e.code === "ArrowRight"){
			audioSliderElement.valueAsNumber += 0.05;
			e.preventDefault();
			e.stopPropagation();
		} else if (e.code === "ArrowDown" || e.code === "ArrowLeft"){
			audioSliderElement.value -= 0.05;
			e.preventDefault();
			e.stopPropagation();
		}
		
		audioElement.volume = audioSliderElement.value;
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