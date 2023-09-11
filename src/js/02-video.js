import Player from '@vimeo/player';
const iframe = document.getElementById('vimeo-player');
const player = new Vimeo.Player(iframe);

function saveCurrentTime(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

document.getElementById('startVideoButton').addEventListener('click', () => {
  player.play().catch((error) => {

    console.error('Помилка відтворення відео:', error);
  });
});

player.on('timeupdate', _.throttle(function(event) {
  const currentTime = Math.floor(event.seconds);
  saveCurrentTime(currentTime);
}, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}

