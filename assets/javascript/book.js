let allButon = document.querySelectorAll(".button");
allButon.forEach(function (dropDown) {
  let newBtn = dropDown.querySelector(".search-btn-text");
  let menuList = dropDown.querySelectorAll(".dropdown-content a");

  menuList.forEach((link) => {
    link.onclick = function () {
      let newText = this.textContent;
      newBtn.textContent = newText;
    };
  });
});

function pad(n) {
  return n.toString().padStart(2, "0");
}

function updateTime() {
  let now = new Date();
  let hour = pad(now.getHours());
  let minutes = pad(now.getMinutes());
  document.getElementById("clock").textContent = `${hour}:${minutes}`;

  let day = pad(now.getDate());
  let month = pad(now.getMonth() + 1);
  let year = now.getFullYear();
  document.getElementById("day").textContent = `${day}-${month}-${year}`;
}
function updateDay() {}
updateTime();
setInterval(updateTime, 1000);

// Chờ cho HTML tải xong
document.addEventListener("DOMContentLoaded", function () {
  // 1. Tìm nút hamburger
  const hamburgerButton = document.querySelector(".btn-hamburger");

  // 2. Tìm menu nav (SỬA Ở ĐÂY)
  // Dùng querySelector để lấy 1 phần tử, không phải 1 danh sách
  const navigationMenu = document.querySelector(".navigation");

  // 3. Kiểm tra xem có tìm thấy cả hai không
  if (hamburgerButton && navigationMenu) {
    // 4. Lắng nghe sự kiện "click"
    hamburgerButton.addEventListener("click", function () {
      // 5. Dùng classList.toggle (SỬA Ở ĐÂY)
      // Đây là cách bật/tắt menu đúng để giữ hiệu ứng CSS
      navigationMenu.classList.toggle("is-visible");
    });
  } else {
    // Báo lỗi nếu không tìm thấy nút hoặc menu
    console.error("Không tìm thấy nút .btn-hamburger hoặc .navigation");
  }
});
