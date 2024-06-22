const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
const linkButtons = document.querySelectorAll('.link-button');
const topButton = document.querySelector('.s3-to-s1');

let touchStartY = null;
let lastTouchY = null;
const lastSectionIdx = sections.length - 1;
let currentSectionIdx = 0;
let isScrolling = false;

// css section transition 시간이랑 일치
const SCROLL_ANIMATION_TIME = 700;

const { innerHeight } = window;

init();

function updateSectionIdx(deltaY) {
  isScrolling = true;

  // wheel down
  if (deltaY > 0 && currentSectionIdx !== lastSectionIdx) {
    currentSectionIdx++;
  }
  // wheel up
  else if (deltaY < 0 && currentSectionIdx !== 0) {
    currentSectionIdx--;
  }
}

function handleSectionStyle() {
  const top = currentSectionIdx * -innerHeight;
  container.style.top = `${top}px`;

  setTimeout(() => {
    isScrolling = false;
  }, SCROLL_ANIMATION_TIME);
}

// PC버전 (마우스 휠)
function handleWheelEvent(deltaY) {
  updateSectionIdx(deltaY);
  handleSectionStyle();
}

// mobile버전 (터치)
function handleTouchEvent(deltaY) {
  updateSectionIdx(-deltaY);
  handleSectionStyle();
}

function init() {
  currentSectionIdx = 0;
  container.style.top = `0px`;

  console.log('init');
}

// 이벤트
addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
    isScrolling || handleWheelEvent(e.deltaY);
  },
  { passive: false }
);
// 모바일 관련 스크롤 이벤트
addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

addEventListener('touchend', (e) => {
  if (touchStartY === null) return;
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchEndY - touchStartY;
  isScrolling || handleTouchEvent(deltaY);
  touchStartY = null; // 터치 이벤트 후 변수 초기화
});

// section1에 있는 버튼을 누르면 해당되는 섹션으로 이동
linkButtons.forEach((button, idx) => {
  button.addEventListener('click', () => {
    currentSectionIdx = idx + 1;
    handleSectionStyle();
  });
});

// section3에 있는 logo 아이콘 클릭 시 section1(가장 상단)로 이동
topButton.addEventListener('click', () => {
  console.log('click');
  currentSectionIdx = 0;
  handleSectionStyle();
});
