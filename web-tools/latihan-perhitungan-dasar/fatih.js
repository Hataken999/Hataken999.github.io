const p1 = document.querySelector(".pertanyaan"),
p2 = document.querySelector(".jawaban"),
tanyaBtn = document.querySelector(".tanyaBtn"),
jwbBtn = document.querySelector(".jwbBtn"),
gantiMetodeBtn = document.querySelector(".extra button"),
customAlert = document.querySelector(".custom-alert");
let metode, num, jawaban, timeoutMsg;

  alert("Disarankan menggunakan Chrome/browser modern lainnya yang versi terbaru!");
  
tanyaBtn.addEventListener("click", () => {
  try {
  let maxNum = 1 + num;
  console.log(maxNum);
  let bil1 = Math.floor(Math.random() * maxNum),
  bil2 = Math.floor(Math.random() * maxNum);
  timeoutMsg = "";
  
  if(!metode) throw new Error("Pilih metode perhitungan terlebih dahulu!");

  if (metode == "kali") {
    jawaban = bil1 * bil2;

    p2.innerText = '';
    p1.innerText = `${bil1} x ${bil2} = ?`;
  } else if (metode == "bagi") {
    jawaban = (isNaN(bil1 / bil2)) ? "Tidak dapat dibagi": bil1 / bil2;
    console.log(jawaban)

    p2.innerText = '';
    p1.innerText = `${bil1} : ${bil2} = ?`;
  } else if (metode == "tambah") {
    jawaban = bil1 + bil2;

    p2.innerText = '';
    p1.innerText = `${bil1} + ${bil2} = ?`;
  } else if (metode == "kurang") {
    jawaban = bil1 - bil2;

    p2.innerText = '';
    p1.innerText = `${bil1} - ${bil2} = ?`;
  }

  /*setTimeout(function() {
    timeoutMsg = "(Kelamaan)";
    jwbBtn.click();
  }, 20000);*/
  } catch (e) {
    customAlertPopup(e.message);
  }

});
jwbBtn.addEventListener("click", () => {
  try {
    if (jawaban == null) throw new Error("Jawaban masih kosong!");
    
    p2.innerText = `Jawabannya adalah ${jawaban} ${timeoutMsg}`;
  } catch (e) {
    customAlertPopup(e.message);
  }
});

const judul = (metode, angka) => {
  const title = document.querySelector("h3");

  title.innerText = `Latihan ${metode} (${angka})`;
}

const inputMetode = () => {
  let perhitungan = prompt("Metode Perhitungan ? (kali/bagi/tambah/kurang)");
  let angkaMaks = prompt("Angka Maksimal ? (angka saja)");
  try {
    console.log(perhitungan);
    console.log(angkaMaks);

    if (!perhitungan) throw new Error("Metode perhitungan kosong!");

    if (!angkaMaks) throw new Error("Angka Maksimal kosong!");

    angkaMaks = (angkaMaks.includes("/^[a-zA-Z]+/")) ? NaN : parseInt(angkaMaks);
    
    console.log(angkaMaks);

    if (isNaN(angkaMaks)) throw new Error("'Angka Maksimal' hanya boleh diisi dengan angka!");

    perhitungan = perhitungan.toLowerCase();

    if (perhitungan === "kali") {
      metode = perhitungan;
      num = angkaMaks;
      judul("Perkalian", angkaMaks);
    } else if (perhitungan === "bagi") {
      metode = perhitungan;
      num = angkaMaks;
      judul("Pembagian", angkaMaks);
    } else if (perhitungan === "tambah") {
      metode = perhitungan;
      num = angkaMaks;
      judul("Penambahan", angkaMaks);
    } else if (perhitungan === "kurang") {
      metode = perhitungan;
      num = angkaMaks;
      judul("Pengurangan", angkaMaks);
    } else {
      throw new Error("Metode yang diinput salah!");
    }
  } catch (e) {
    customAlertPopup(e.message);
    //window.close();
  }
}

const customAlertPopup = error => {
  const desc = document.querySelector(".description-alert p");
  customAlert.classList.add("show");
  desc.innerText = error;

  setTimeout(function() {
    customAlert.classList.remove("show");
  }, 5000);
}

const clear = () => {
  p1.innerText = "";
  p2.innerText = "";
  jawaban = null;
}

gantiMetodeBtn.addEventListener("click", () => {
  clear();
  inputMetode();
});

inputMetode();
