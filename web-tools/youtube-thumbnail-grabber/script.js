const videoUrl = document.querySelector(".wrapper input"),
thumbName = document.querySelector(".thumb-name input"),
thumbResolution = document.querySelector(".select-menu select"),
grabBtn = document.querySelector(".grab-btn"),
downloadBtn = document.querySelector(".download-btn"),
preview = document.querySelector(".preview");
const thumbImg = document.getElementById("thumb-img");
let videoId, thumbnailUrl;
let thumbnailBaseUrl = "https://img.youtube.com/vi/";
const corsProxy = "https://bots.hataken.eu.org/api/download/ytt";
const notyf = new Notyf({duration: 5_000, position: {y: 'top'}, dismissible: true});

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
  
 if (videoUrl.value.includes("youtu.be")) {
  // Handle youtu.be URLs
  videoId = videoUrl.value.split("/")[3].split('?')[0];
} else if (videoUrl.value.includes("music.youtube.com")) {
  // Handle music.youtube.com URLs
  const params = new URLSearchParams(videoUrl.value.split('?')[1]);
  videoId = params.get('v');
} else if (videoUrl.value.includes("youtube.com")) {
  // Handle youtube.com URLs
  const urlParams = new URLSearchParams(videoUrl.value.split('?')[1]);
  videoId = urlParams.get('v') || videoUrl.value.split(/[/?]/)[4];
} else {
  // Handle other cases or display an error
  imgError();
  return;
}

console.log("Video ID:", videoId);
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

  downloadBtn.innerText = "Downloading...";
  downloadBtn.disabled = true;

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

  let cors = corsProxy;
  const thumbRequest = new Request(cors, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: thumbnailUrl })
});

  fetch(thumbRequest)
  .then((response) => response.json())
    .then((data) => {
      const blob = base64ToBlob(data.result, 'image/jpeg');
      const objectURL = URL.createObjectURL(blob),
      link = document.createElement("a");
      link.href = objectURL;
  
      if (thumbName.value) {
        link.download = `${thumbName.value}_${thumbResolution.value} - Hataken Project`;
      } else {
        link.download = `${videoId}_${thumbResolution.value} - Hataken Project`;
      }
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(objectURL);
      link.remove();
      downloadBtn.innerText = "Download Thumbnail";
      downloadBtn.disabled = false;
      notyf.success('Berhasil mengunduh thumbnail');
    }).catch( e => {
      console.log(e);
      notyf.error('Gagal mengunduh thumbnail, laporin aja cuy..');
    });

  /*const canvas = document.createElement("canvas");
  canvas.width = thumbImg.width;
  canvas.height = thumbImg.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(corsProxy + thumbImg, 0, 0, canvas.width, canvas.height);

  // Dapatkan data URL gambar dari canvas
  const imageDataUrl = canvas.toDataURL("image/jpg");

  // Hapus elemen canvas setelah digunakan
  document.body.removeChild(canvas);

  // Sekarang Anda dapat menggunakan imageDataUrl sesuai kebutuhan Anda
  const link = document.createElement("a");
  link.href = imageDataUrl;

  if (thumbName.value) {
    link.download = `${thumbName.value} - Hataken Project`;
  } else {
    link.download = `${thumbResolution.value} - Hataken Project`;
  }
  document.body.appendChild(link);
  link.click();
  link.remove();
  notyf.success('Berhasil mengunduh thumbnail');*/

})

function base64ToBlob(base64String, contentType = 'application/octet-stream') {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}


function imgError() {
  notyf.error('Gagal mengambil thumbnail! Coba cek URL yang diinput valid atau tidak.');
  // alert("Gagal mengambil thumbnail! Coba cek URL yang diinput valid atau tidak.");
}

function connection() {
  if (!online) {
    notyf.error("Kamu sedang offline, tunggu sampai online lagi untuk menggunakan tools ini.");
    return;
  }
}
