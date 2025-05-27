document.addEventListener('DOMContentLoaded', () => {
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const icon = modeToggle.querySelector('i');
  const navbar = document.querySelector('.navbar');

  let lastScrollTop = 0;

  // Toggle light/dark mode với animation icon
  modeToggle.addEventListener('click', () => {
    icon.classList.add('fade-out');

    setTimeout(() => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        icon.classList.remove('fade-out');
        icon.classList.add('fade-in');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        body.classList.add('dark-mode');
        icon.classList.remove('fade-out');
        icon.classList.add('fade-in');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }

      setTimeout(() => {
        icon.classList.remove('fade-in');
      }, 500);
    }, 500);
  });

  // Ẩn hiện navbar khi cuộn trang quá 500px
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 500) {
      if (currentScroll > lastScrollTop) {
        navbar.classList.add('hide');
      } else {
        navbar.classList.remove('hide');
      }
    } else {
      navbar.classList.remove('hide');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Đổi theme màu theo mùa khi click icon mùa
  const seasonIcons = document.querySelectorAll('.season-icons i');
  seasonIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      body.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
      if (icon.classList.contains('spring')) {
        body.classList.add('theme-spring');
      } else if (icon.classList.contains('summer')) {
        body.classList.add('theme-summer');
      } else if (icon.classList.contains('autumn')) {
        body.classList.add('theme-autumn');
      } else if (icon.classList.contains('winter')) {
        body.classList.add('theme-winter');
      }
    });
  });

  // Popup quảng cáo
  const popup = document.getElementById('popup-ad');
  const popupCloseBtn = document.getElementById('popup-close');

  popupCloseBtn.addEventListener('click', () => {
    popup.classList.add('hide');
  });

  // Uncomment để tự động ẩn popup sau 10s
  // setTimeout(() => {
  //   popup.classList.add('hide');
  // }, 10000);
});
// Hàm cập nhật đồng hồ thời gian thực
function updateClock() {
  const clock = document.getElementById('clock');
  if (!clock) return;

  const now = new Date();

  // Tạo chuỗi ngày giờ tiếng Anh
  const options = {
    weekday: 'long',      // Thứ trong tuần (Monday,...)
    year: 'numeric',
    month: 'long',        // Tháng (January,...)
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false         // 24h format, đổi thành true nếu muốn 12h AM/PM
  };

  const timeString = now.toLocaleString('en-US', options);

  // Hiển thị trong div#clock
  clock.textContent = timeString;
}

// Cập nhật đồng hồ mỗi giây
setInterval(updateClock, 1000);

// Gọi ngay lần đầu khi trang load
updateClock();
// Hàm cập nhật đồng hồ analog và ngày tháng
function updateAnalogClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // Tính góc cho từng kim
  const secondsDeg = ((seconds / 60) * 360) + 90; // +90 để ban đầu kim ở 12h
  const minutesDeg = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
  const hoursDeg = ((hours % 12) / 12) * 360 + ((minutes / 60) * 30) + 90;

  // Cập nhật transform rotate cho từng kim
  document.getElementById('second-hand').style.transform = `rotate(${secondsDeg}deg)`;
  document.getElementById('minute-hand').style.transform = `rotate(${minutesDeg}deg)`;
  document.getElementById('hour-hand').style.transform = `rotate(${hoursDeg}deg)`;

  // Hiển thị ngày tháng năm tiếng Anh
  const options = {
    weekday: 'long', // Thứ (Monday,...)
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const dateStr = now.toLocaleDateString('en-US', options);
  document.getElementById('date-display').textContent = dateStr;
}

// Chạy cập nhật mỗi giây
setInterval(updateAnalogClock, 1000);
// Chạy ngay lúc load trang
updateAnalogClock();
document.querySelectorAll('.banner').forEach(banner => {
  const btn = banner.querySelector('.btn-detail');
  btn.addEventListener('mouseenter', () => {
    banner.classList.add('hovered');
  });
  btn.addEventListener('mouseleave', () => {
    banner.classList.remove('hovered');
  });
});
function startSakuraEffect() {
  const container = document.getElementById('sakura-container');
  const interval = setInterval(() => {
    const sakura = document.createElement('div');
    sakura.classList.add('sakura');
    sakura.style.left = `${Math.random() * 100}vw`;
    sakura.style.animationDuration = `${Math.random() * 3 + 3}s`;
    container.appendChild(sakura);
    setTimeout(() => container.removeChild(sakura), 7000);
  }, 300);

  return interval;
}

function startCoinEffect() {
  const container = document.getElementById('coin-container');
  const coins = [];

  for (let i = 0; i < 10; i++) {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${Math.random() * 90}vw`;
    coin.style.top = `${Math.random() * 70 + 10}vh`;
    container.appendChild(coin);
    coins.push(coin);
  }

  return coins;
}

function stopCoinEffect(coins) {
  coins.forEach(coin => coin.remove());
}

let sakuraInterval = null;
let coinElements = [];

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup-ad');
  const popupCloseBtn = document.getElementById('popup-close');

  // Cho popup hiện (nếu chưa có class active sẵn)
  popup.classList.add('active');

  // Bắt đầu hiệu ứng khi popup hiện
  sakuraInterval = startSakuraEffect();
  coinElements = startCoinEffect();

  // Khi click đóng popup
  popupCloseBtn.addEventListener('click', () => {
    popup.classList.add('hide');

    clearInterval(sakuraInterval);
    stopCoinEffect(coinElements);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-container');
  const btnLeft = document.getElementById('scroll-left');
  const btnRight = document.getElementById('scroll-right');

  const scrollAmount = 300; // px mỗi lần cuộn

  btnLeft.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});
// Tự động cuộn ngang sản phẩm mỗi 3 giây
let autoScrollInterval = setInterval(() => {
  const container = document.getElementById('product-container');
  if (!container) return;

  // Nếu cuộn đến cuối, quay về đầu
  if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
    container.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }
}, 3000); // 3 giây

// Dừng auto khi người dùng hover chuột
const productContainer = document.getElementById('product-container');
productContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));

// Tiếp tục auto khi người dùng rời chuột
productContainer.addEventListener('mouseleave', () => {
  autoScrollInterval = setInterval(() => {
    if (productContainer.scrollLeft + productContainer.clientWidth >= productContainer.scrollWidth - 5) {
      productContainer.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      productContainer.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }, 3000);
});
