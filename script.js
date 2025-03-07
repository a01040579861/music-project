const nowPlaying = document.querySelector(".now-playing");
const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");
const playpauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");
const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");
const wave = document.querySelector("#wave");
const currTrack = new Audio();

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
  {
    img: "./img/flower.jpg",
    name: "Flower Dance",
    artist: "DJ Okawari",
    music: "./music/flower.mp3",
  },
  {
    img: "./img/golden.jpg",
    name: "Golden hour",
    artist: "JVKE",
    music: "./music/golden.mp3",
  },
  {
    img: "./img/howls.jpg",
    name: "Howl's Moving Castle",
    artist: "Hisaishi Joe",
    music: "./music/howls.mp3",
  },
  {
    img: "./img/indigo.jpg",
    name: "Indigo",
    artist: "Yiruma",
    music: "./music/indigo.mp3",
  },
  {
    img: "./img/fall-rain.jpg",
    name: "Fall Rain",
    artist: "July",
    music: "./music/fallrain.mp3",
  },
  {
    img: "./img/kiki.jpg",
    name: "Village with sea view",
    artist: "Hisaishi Joe",
    music: "./music/kiki.mp3",
  },
  {
    img: "./img/summer.jpg",
    name: "One summer's day",
    artist: "Hisaishi Joe",
    music: "./music/summer.mp3",
  },
  {
    img: "./img/forest.jpg",
    name: "In the quiet forest",
    artist: "Healing energy",
    music: "./music/forest.mp3",
  },
];

const initTrack = (index) => {
  reset();

  currTrack.src = musicList[index].music;
  trackArt.style.backgroundImage = `url(${musicList[index].img})`;
  trackName.innerText = musicList[index].name;
  trackArtist.innerText = musicList[index].artist;
  nowPlaying.innerText = `${index + 1} of ${musicList.length}`;

  currTrack.load();
  updateTimer = setInterval(setUpdate, 1000);
  currTrack.addEventListener("ended", nextTrack);

  console.log(`Loaded: ${currTrack.src}`);
};

const loadTrack = (index) => {
  clearInterval(updateTimer);
  reset();

  currTrack.src = musicList[index].music;
  currTrack.load();

  trackArt.style.backgroundImage = `url(${musicList[index].img})`;
  trackName.innerText = musicList[index].name;
  trackArtist.innerText = musicList[index].artist;
  nowPlaying.innerText = `${index + 1} of ${musicList.length}`;

  updateTimer = setInterval(setUpdate, 1000);
  currTrack.addEventListener("ended", nextTrack);
};

const reset = () => {
  currTime.innerText = "00:00";
  totalDuration.innerText = "00:00";
  seekSlider.value = 0;
};

const toggleRandom = () => {
  isRandom = !isRandom;
  randomIcon.classList.toggle("randomActive");
};

const repeatTrack = () => {
  loadTrack(trackIndex);
  playTrack();
};

const playpauseTrack = () => (isPlaying ? pauseTrack() : playTrack());

const playTrack = () => {
  currTrack.play();
  isPlaying = true;
  trackArt.classList.add("rotate");
  wave.classList.add("loader");
  playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
};

const pauseTrack = () => {
  currTrack.pause();
  currTrack.currentTime = 0;
  isPlaying = false;
  trackArt.classList.remove("rotate");
  wave.classList.remove("loader");
  playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
};

const nextTrack = () => {
  trackIndex = isRandom
    ? Math.floor(Math.random() * musicList.length)
    : (trackIndex + 1) % musicList.length;
  loadTrack(trackIndex);
  if (isPlaying) playTrack();
};

const prevTrack = () => {
  trackIndex = trackIndex > 0 ? trackIndex - 1 : musicList.length - 1;
  loadTrack(trackIndex);
  if (isPlaying) playTrack();
};

const seekTo = () =>
  (currTrack.currentTime = currTrack.duration * (seekSlider.value / 100));

const setVolume = () => (currTrack.volume = volumeSlider.value / 100);

const setUpdate = () => {
  if (!isNaN(currTrack.duration)) {
    const seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;

    const formatTime = (time) => (time < 10 ? `0${time}` : time);

    const currentMinutes = formatTime(Math.floor(currTrack.currentTime / 60));
    const currentSeconds = formatTime(Math.floor(currTrack.currentTime % 60));
    const durationMinutes = formatTime(Math.floor(currTrack.duration / 60));
    const durationSeconds = formatTime(Math.floor(currTrack.duration % 60));

    currTime.innerText = `${currentMinutes}:${currentSeconds}`;
    totalDuration.innerText = `${durationMinutes}:${durationSeconds}`;
  }
};

initTrack(trackIndex);

playpauseBtn.addEventListener("click", playpauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
seekSlider.addEventListener("input", seekTo);
volumeSlider.addEventListener("input", setVolume);
