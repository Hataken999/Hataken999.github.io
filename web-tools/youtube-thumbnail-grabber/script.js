const videoUrl = document.querySelector(".wrapper input"),
thumbName = document.querySelector(".thumb-name input"),
thumbResolution = document.querySelector(".select-menu select"),
grabBtn = document.querySelector(".grab-btn"),
downloadBtn = document.querySelector(".download-btn"),
preview = document.querySelector(".preview");
let videoId, thumbnailUrl;
let thumbnailBaseUrl = "https://img.youtube.com/vi/";
let online = navigator.onLine;

videoUrl.addEventListener("focus", () => {
  if (videoUrl.value) {
    videoUrl.select();
  }
})
videoUrl.addEventListener("click", () => {
  if (videoUrl.value) {
    videoUrl.select();
  }
})
/*videoUrl.addEventListener("touchstart", () => {
  if (videoUrl.value) {
    videoUrl.select();
  }
})*/

videoUrl.addEventListener("keyup", () => {
  if (!videoUrl.value) {
    preview.classList.remove("show");
  }
})

grabBtn.addEventListener("click", e => {
e.preventDefault();

  if (!online) {
    alert("Kamu sedang offline, tunggu sampai online lagi untuk menggunakan tools ini.");
    return;
  }
  
  if (!videoUrl.value.includes("music.youtube.com") && videoUrl.value.includes("youtu.be")) {
    videoId = videoUrl.value.split("/")[3];
  } else if(videoUrl.value.includes("music.youtube")) {
    videoId = videoUrl.value.split(/[=&]+/)[1];
  } else if(videoUrl.value.includes("youtube.com")) {
    videoId = videoUrl.value.split(/[/?]/)[4];
    console.log(videoId);
  } else {
    imgError();
    return;
  }
  const thumbImg = document.getElementById("thumb-img");

  if (videoId) {
    thumbnailUrl = thumbnailBaseUrl + videoId + "/" + thumbResolution.value + ".jpg";
    thumbImg.src = thumbnailUrl;
    grabBtn.innerText = "Grabbing Thumbnail...";
    thumbImg.addEventListener("load", () => {
      grabBtn.innerText = "Grab";
      preview.classList.add("show");
    })
  } else {
    imgError();
  }
})

downloadBtn.addEventListener("click", e => {
e.preventDefault();

const headers = new Headers();
headers.append('Content-Type', 'image/jpg');
headers.set('Accept', 'image/jpg');
headers.set('Access-Control-Allow-Origin', 'https://img.youtube.com');
headers.append('Access-Control-Allow-Origin', '*')

const thumbInit = {
  headers: headers,
  mode: 'no-cors',
}

  const thumbRequest = new Request(thumbnailUrl);

  fetch(thumbRequest)
  .then((response) => response.blob())
    .then((myBlob) => {
      const objectURL = URL.createObjectURL(myBlob),
      link = document.createElement("a");
      console.log(myBlob.type);
      link.href = objectURL;
  
      if (thumbName.value) {
        link.download = `${thumbName.value} - Hataken Project`;
      } else {
        link.download = `${thumbResolution.value} - Hataken Project`;
      }
      link.click();
      URL.revokeObjectURL(objectURL);
      link.remove();
    });

})

function imgError() {
  alert("Gagal mengambil thumbnail! Coba cek URL yang diinput valid atau tidak.");
}

function connection() {
  if (!online) {
    alert("Kamu sedang offline, tunggu sampai online lagi untuk menggunakan tools ini.");
    return;
  }
}