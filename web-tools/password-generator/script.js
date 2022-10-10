const sliderLength = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
passwordInput = document.querySelector(".input-box input"),
copyBtn = document.querySelector(".input-box span"),
passwordIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^_-&+@#*:;.,!?(){}[]~%<>"
}

const generatePassword = () => {
  let staticPassword = '',
  randomPassword = '',
  excludeDuplicate = false,
  passLength = sliderLength.value;
  
  options.forEach(option => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "inc-spaces") {
        staticPassword += characters[option.id];
      } else if(option.id === "inc-spaces") {
        staticPassword += ` ${staticPassword} `;
      } else {
        excludeDuplicate = true;
      }
    }
  });
  
  for (let i = 0; i < passLength; i++) {
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
    } else {
    randomPassword += randomChar;
    }
  }
  
  passwordInput.value = randomPassword;
}

const updatePassIndicator = () => {
  passwordIndicator.id = sliderLength.value <= 8 ? "weak" : sliderLength.value <= 16 ? "medium" : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = sliderLength.value;
  generatePassword();
  updatePassIndicator();
};

updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyBtn.innerText = "Check";
  setTimeout(function() {
    copyBtn.innerText = "copy_all";
  }, 1500);
}

copyBtn.addEventListener("click", copyPassword);
sliderLength.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);