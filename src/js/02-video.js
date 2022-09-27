import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';
let seconds = 0;

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(function (data) {
    console.log('Seconds played', data.seconds);
    console.log('Percentage', data.percent);

    console.log();
    localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
  }, 1000)
);

const setVideoTime = key => {
  try {
    const savedTime = localStorage.getItem(key);
    return savedTime === null ? seconds : savedTime;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

player.setCurrentTime(setVideoTime(LOCAL_STORAGE_KEY));
