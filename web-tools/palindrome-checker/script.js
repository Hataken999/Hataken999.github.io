const inputText = document.querySelector(".inputs input"),
checkBtn = document.querySelector(".inputs button"),
hasil = document.querySelector(".hasil"),
infoText = document.querySelector(".infoText");
let filterInputText;

// event listener ketika button di klik
checkBtn.addEventListener("click", () => {
  // Input dipisah perhuruf, lalu di reverse dan digabungkan lagi
  let reverseInput = filterInputText.split("").reverse().join("");
  
  hasil.style.display = "block"; // Untuk menampilkan hasil
 
  // Cek class benar dan salah pada element dan menghapusnya jika ada, agar class tidak bertumpukan setiap kali di cek
  if (hasil.classList == "benar") {
    hasil.classList.remove("benar");
  } else {
    hasil.classList.remove("salah");
  }
  
  // Membandingkan input awal dengan input yang sudah direverse
  if (filterInputText != reverseInput) {
    hasil.classList.add("salah");
    return infoText.innerHTML = `<strong>SALAH</strong>, <q>${inputText.value}</q> bukan palindrome`;
  }
  hasil.classList.add("benar");
  infoText.innerHTML = `<strong>BENAR</strong>, <q>${inputText.value}</q> adalah palindrome`;
});

// event listener untuk mendeteksi inputan keyboard yang dimasukkan
inputText.addEventListener("keyup", () => {
  // untuk memfilter simbol
  filterInputText = inputText.value.toLowerCase().replace(/[^A-Z0-9]/ig, "");
  
  // validasi button, hanya akan aktif apabila input tidak memiliki simbol
  if (filterInputText) {
    checkBtn.classList.add("active");
  } else {
  checkBtn.classList.remove("active");
  hasil.style.display = "none";
  }
});