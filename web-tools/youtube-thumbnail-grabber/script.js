const videoUrl = document.querySelector(".wrapper input"),
thumbName = document.querySelector(".thumb-name input"),
thumbResolution = document.querySelector(".select-menu select"),
grabBtn = document.querySelector(".grab-btn"),
downloadBtn = document.querySelector(".download-btn"),
preview = document.querySelector(".preview");
let videoId, thumbnailUrl;
let thumbnailBaseUrl = "https://img.youtube.com/vi/";
let online = navigator.onLine;
const corsProxy = "https://test.cors.workers.dev/?";

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
    //console.log(videoId);
  } else {
    imgError();
    return;
  }
  const thumbImg = document.getElementById("thumb-img");

  if (videoId) {
    thumbnailUrl =  thumbnailBaseUrl + videoId + "/" + thumbResolution.value + ".jpg";
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

/*const headers = headers = {
  'Origin': 'https://img.youtube.com',
  'Content-Type': 'image/jpg',
}*/
/*headers.append('Content-Type', 'image/jpg');
headers.set('Accept', 'image/jpg');
headers.set('Origin', 'https://img.youtube.com');*/

/*const thumbInit = {
  method: 'GET',
  headers: {
  'Origin': 'https://img.youtube.com',
  'Content-Type': 'image/jpg',
    
  },
}*/

  let cors = corsProxy + thumbnailUrl
  const thumbRequest = new Request(cors);

  fetch(thumbRequest)
  .then((response) => response.blob())
    .then((myBlob) => {
      const objectURL = URL.createObjectURL(myBlob),
      link = document.createElement("a");
      link.href = objectURL;
  
      if (thumbName.value) {
        link.download = `${thumbName.value} - Hataken Project`;
      } else {
        link.download = `${thumbResolution.value} - Hataken Project`;
      }
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(objectURL);
      link.remove();
    }).catch( e => {
alert(e + "<br>Download masih diblock oleh <b><i>CORS Policy</i></b>, coba dengan klik kanan gambar atau sentuh tahan gambar lalu simpan gambar secara manual.");
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

online.addEventListener("change", () => {
  connection();
});
