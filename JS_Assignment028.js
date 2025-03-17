

const rootElement = document.getElementById('#root');

const songList = [
  {
    songName: 'karu karu',
    src: './songs/karu_karu.mp3',
    img: 'https://i.ytimg.com/vi/HDh58mFU5M4/maxresdefault.jpg'
  },
  {
    songName: 'Leo Das',
    src: './songs/leoDas.mp3',
    img: 'https://c.saavncdn.com/109/Leo-Das-Entry-From-Leo-Tamil-2024-20240108151125-500x500.jpg'
  },
  {
    songName: 'Mankatha BGM',
    src: './songs/mankatha_bgm.mp3',
    img: 'https://i1.sndcdn.com/artworks-000099482458-vs1u1a-t500x500.jpg'
  },
  {
    songName: '96 BGM',
    src: './songs/96.mp3',
    img: 'https://i1.sndcdn.com/artworks-000428191842-lx29vs-t500x500.jpg'
  },
  {
    songName: 'Rolex BGM',
    src: './songs/rolex.mp3',
    img: 'https://i.ytimg.com/vi/rBLCjz8as0E/maxresdefault.jpg'
  },
  {
    songName: 'Kabali BGM',
    src: './songs/kabali_theme_bgm.mp3',
    img: 'https://i.ytimg.com/vi/bwXHx8ng7_E/maxresdefault.jpg'
  }
]


const toggleSong = document.querySelector('.onOff')
const songDisplay = document.getElementById('display')
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const audioEle = document.getElementById('audioEle');

let song;
let timeStart = '0:00';
let duration = '0:00';
let isPlay = false;
let n = songList.length;
let startDeg = 0;

function setImg(src) {
  songDisplay.style.setProperty('--imgBg', `url(${src}) no-repeat`);
}

let interValId;


toggleSong.addEventListener('click', () => {
  if (isPlay) {
    audioEle.pause();
    pause.classList.add('hide')
    play.classList.remove('hide')
    if (interValId) clearInterval(interValId);
  } else {
    if (song == undefined) {
      song = 0;
      audioEle.src = songList[song % n].src;
      setImg(songList[song % n].img);
      audioEle.load();
    } else {
      startSong(true);
    }
    audioEle.play();

    pause.classList.remove('hide')
    play.classList.add('hide')

  }
  isPlay = !isPlay;


})



function songSet(v) {
  if (song >= 0)
    return (v == '-') ? (song -= 1) : (song += 1);
  return 0;
}

prev.addEventListener('click', () => {
  song = songSet('-')
  audioEle.src = songList[song % n].src;
  audioEle.load();
  audioEle.play();
  pause.classList.remove('hide')
  play.classList.add('hide')
  setImg(songList[song % n].img);
})

next.addEventListener('click', () => {
  song = songSet('+')
  audioEle.src = songList[song % n].src;
  audioEle.load();
  audioEle.play();
  pause.classList.remove('hide')
  play.classList.add('hide')
  setImg(songList[song % n].img);
})

function startSong(val = false) {
  duration = audioEle.duration;
  console.log(startDeg, val);
  if (val !== true) startDeg = 0;

  if (interValId) {
    clearInterval(interValId)
  }
  interValId = setInterval(() => {
    timeStart = formatDuration(audioEle.currentTime);
    document.getElementById('start').textContent = timeStart;
    // console.log(startDeg);
    songDisplay.style.setProperty('--progress', `conic-gradient(rgb(212, 0, 255) 0 ${startDeg}deg, rgba(212, 0, 255, .4) ${startDeg}deg 360deg)`)
    startDeg += ~~(360 / duration)

  }, 1000);
  document.getElementById('end').textContent = formatDuration(duration);
}


audioEle.onloadedmetadata = startSong;

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
