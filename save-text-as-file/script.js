const textarea = document.querySelector("textarea"),
fileNameInput = document.querySelector(".file-name input"),
selectMenu = document.querySelector(".save-as select"),
saveBtn = document.querySelector(".save-btn");

textarea.addEventListener("keyup", () => {
  //textareaValid = true;
  if (textarea.value) {
  saveBtn.classList.add("valid1");
  } else {
  saveBtn.classList.remove("valid1");
  }
});

fileNameInput.addEventListener("keyup", () => {
  //fileNameInputValid = true;
if (fileNameInput.value) {
  saveBtn.classList.add("valid2");
  } else {
  saveBtn.classList.remove("valid2");
  }
});

/*if (textarea.value && fileNameInput.value) {
  saveBtn.classList.add("valid");
}*/

selectMenu.addEventListener("change", () => {
  let selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
  saveBtn.innerText = `Save As ${selectedOption.split(" ")[0]} File`;
});

saveBtn.addEventListener("click", () => {
  const blob = new Blob([textarea.value], {type: selectMenu.value});
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileNameInput.value;
  link.href = fileUrl;
  link.click();
})
