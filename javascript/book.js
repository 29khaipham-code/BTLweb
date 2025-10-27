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

// Chờ cho toàn bộ nội dung HTML được tải xong
document.addEventListener("DOMContentLoaded", function () {
  // Lấy các phần tử (elements) trong form
  const form = document.getElementById("profile-form");
  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const registerNumber = document.getElementById("register-number");
  const phone = document.getElementById("phone");
  const bio = document.getElementById("bio");

  // Lấy nút "Edit" (icon bút chì)
  const editButton = document.getElementById("edit-profile-btn");

  // Lấy các nút "Update" và "Reset"
  const updateButton = form.querySelector(".btn-update");
  const resetButton = form.querySelector(".btn-reset");

  // Lắng nghe sự kiện click vào nút "Edit"
  editButton.addEventListener("click", function (e) {
    // Ngăn thẻ <a> chuyển trang (hành vi mặc định)
    e.preventDefault();

    // 1. Lấy TẤT CẢ input và textarea bên trong form
    const formFields = form.querySelectorAll("input, textarea");

    // 2. Dùng vòng lặp để gỡ thuộc tính "disabled"
    formFields.forEach((field) => {
      field.disabled = false;
    });

    // 3. Kích hoạt lại hai nút "Update" và "Reset"
    updateButton.disabled = false;
    resetButton.disabled = false;

    // 4. (UX Bonus) Tự động focus vào ô đầu tiên
    fullName.focus();

    // 5. (UX Bonus) Ẩn nút "Edit" đi vì đã vào chế độ sửa
    editButton.style.display = "none";
  });
  // Gắn sự kiện "submit" cho form
  form.addEventListener("submit", function (e) {
    // Ngăn form gửi đi theo cách truyền thống
    e.preventDefault();

    // Chạy hàm kiểm tra
    validateInputs();
  });

  // Hàm hiển thị lỗi
  const setError = (element, message) => {
    const formGroup = element.closest(".form-group");
    const small = formGroup.querySelector("small");

    small.innerText = message;
    formGroup.classList.add("error");
    formGroup.classList.remove("success");
  };

  // Hàm hiển thị thành công (viền xanh)
  const setSuccess = (element) => {
    const formGroup = element.closest(".form-group");
    const small = formGroup.querySelector("small");

    small.innerText = "";
    formGroup.classList.add("success");
    formGroup.classList.remove("error");
  };

  // Hàm kiểm tra định dạng email
  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Hàm kiểm tra có phải là số
  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  // Hàm kiểm tra chính
  const validateInputs = () => {
    // Lấy giá trị từ các ô input (và loại bỏ khoảng trắng thừa)
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const registerNumberValue = registerNumber.value.trim();
    const phoneValue = phone.value.trim();
    const bioValue = bio.value.trim();

    let isFormValid = true; // Biến cờ, giả sử form hợp lệ

    // 1. Kiểm tra Full Name
    if (fullNameValue === "") {
      setError(fullName, "Full name is required");
      isFormValid = false;
    } else {
      setSuccess(fullName);
    }

    // 2. Kiểm tra Email
    if (emailValue === "") {
      setError(email, "Email is required");
      isFormValid = false;
    } else if (!isValidEmail(emailValue)) {
      setError(email, "Provide a valid email address");
      isFormValid = false;
    } else if (!emailValue.endsWith("@gmail.com")) {
      setError(email, "Email must end with @gmail.com");
      isFormValid = false;
    } else {
      setSuccess(email);
    }

    // 3. Kiểm tra Register Number
    if (registerNumberValue === "") {
      setError(registerNumber, "Register number is required");
      isFormValid = false;
    } else if (!isNumeric(registerNumberValue)) {
      setError(registerNumber, "Must be a number");
      isFormValid = false;
    } else {
      setSuccess(registerNumber);
    }

    // 4. Kiểm tra Phone Number
    if (phoneValue === "") {
      setError(phone, "Phone number is required");
      isFormValid = false;
    } else if (!isNumeric(phoneValue)) {
      setError(phone, "Must be a number");
      isFormValid = false;
    } else if (phoneValue.length !== 10) {
      setError(phone, "Phone number must be 10 digits");
      isFormValid = false;
    } else {
      setSuccess(phone);
    }

    // 5. Kiểm tra Bio
    if (bioValue === "") {
      setError(bio, "Bio is required");
      isFormValid = false;
    } else {
      setSuccess(bio);
    }

    // Nếu tất cả đều hợp lệ
    if (isFormValid) {
      alert("Profile updated successfully!");
      editButton.style.display = "flex";
      const formFields = form.querySelectorAll("input, textarea");
      formFields.forEach((field) => {
        field.disabled = true;
      });
    }
  };
});
