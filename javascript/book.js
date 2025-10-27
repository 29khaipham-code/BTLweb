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
