document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("profile-form");
  let fullName = document.getElementById("full-name");
  let email = document.getElementById("email");
  let registerNumber = document.getElementById("register-number");
  let phone = document.getElementById("phone");
  const bio = document.getElementById("bio");

  let editButton = document.getElementById("edit-profile-btn");

  const updateButton = form.querySelector(".btn-update");
  const resetButton = form.querySelector(".btn-reset");

  editButton.addEventListener("click", function (e) {
    e.preventDefault(); //ngan tai lai trang

    let formField = form.querySelectorAll("input , textarea");
    formField.forEach((field) => {
      field.disabled = false;
    });

    updateButton.disabled = false;
    resetButton.disabled = false;

    fullName.focus();

    editButton.style.display = "none";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    validateForm();
  });

  let setError = (element, message) => {
    let formGroup = element.closest(".form-group"); // tim the cha gan nhat co class la form-group
    let small = formGroup.querySelector("small");

    small.textContent = message;
    formGroup.classList.add("error");
    formGroup.classList.remove("success");
  };

  let setSuccess = (element) => {
    let formGroup = element.closest(".form-group");
    let small = formGroup.querySelector("small");

    small.textContent = "";
    formGroup.classList.add("success");
    formGroup.classList.remove("error");
  };

  let isValidEmail = (email) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  let isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  let validateForm = () => {
    let fullNameValue = fullName.value.trim();
    let emailValue = email.value.trim();
    let registerNumberValue = registerNumber.value.trim();
    let phoneValue = phone.value.trim();
    let bioValue = bio.value.trim();

    let isFormValid = true;

    if (fullNameValue === "") {
      setError(fullName, "Full name is required");
      isFormValid = false;
    } else {
      setSuccess(fullName);
    }

    if (emailValue === "") {
      setError(email, "Email is required");
      isFormValid = false;
    } else if (!emailValue.endsWith("@gmail.com")) {
      setError(email, "Email must end with @gmail.com");
      isFormValid = false;
    } else if (!isValidEmail(emailValue)) {
      setError(email, "Provide a valid email address");
      isFormValid = false;
    } else {
      setSuccess(email);
    }

    if (registerNumberValue === "") {
      setError(registerNumber, "Register number is required");
      isFormValid = false;
    } else if (!isNumeric(registerNumberValue)) {
      setError(registerNumber, "Must be a number");
      isFormValid = false;
    } else {
      setSuccess(registerNumber);
    }

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

    if (bioValue === "") {
      setError(bio, "Bio is required");
      isFormValid = false;
    } else {
      setSuccess(bio);
    }

    if (isFormValid) {
      alert("Profile updated successfully!");
      editButton.style.display = "flex";
      let formField = form.querySelectorAll("input , texterea");
      formField.forEach((field) => {
        field.disabled = true;
      });
    }
  };
});
