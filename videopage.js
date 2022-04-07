// const key = "AIzaSyAKJjcUb5ksE6duUSor-3_l8UCZPhaz58Q";
const key = "AIzaSyBoDKDp5HnHDRuWd95MtPgif1vi51M4sQY";
// const key = "AIzaSyAuGOFHhqxN6Er-6PviJHJCFuCRHbIB3hU";



import { navbar, sideBar } from "./components/components.js"

const nav = document.querySelector("nav");
nav.innerHTML = navbar();
const sidebar = document.querySelector(".sidebar");

sidebar.innerHTML = sideBar();

const menu = document.querySelector("#menu");
const searchbtn = document.getElementById("Seachbtn");

menu.addEventListener("click", () => {
  sidebar.classList.toggle("small_sidebar");
});

document.querySelector("form").addEventListener("submit", () => {
  event.preventDefault();
  let q = document.getElementById("search");

  localStorage.setItem("searchKey", JSON.stringify(q.value));

  window.location.href = "./index.html";
});

menu.addEventListener("click", () => {
  sidebar.classList.toggle("show_sidebar");
});

searchbtn.onclick = () => {
  if (window.innerWidth <= 769) {
    nav.classList.add("open");
  }
};

goback.onclick = () => {
  nav.classList.remove("open");
};

window.onresize = function (event) {
  if (window.innerWidth > 769) {
    nav.classList.remove("open");
  } else if (window.innerWidth >= 1400) {
    menu.onclick = () => {
      sidebar.classList.toggle("small_sidebar");
    };
  }
};


localStorage.removeItem("searchKey");


const videoData = JSON.parse(localStorage.getItem("youtubeVideoData"));
const otherVideosData = JSON.parse(localStorage.getItem("youtubeVideos"));

const displayVideo = (el) => {
  const mainVideo = document.querySelector(".main-video");

  let videoThumb = el.snippet.thumbnails.medium.url;
  let videoTitle = el.snippet.title;
  let channelName = el.snippet.channelTitle;
  let description = el.snippet.description;

  let urlforchannelInfo = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${key}&id=${el.snippet.channelId}`;
  fetch(urlforchannelInfo)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let channelImg = res.items[0].snippet.thumbnails.medium.url;

      let videoView, views;

      videoView = res.items[0].statistics.viewCount;
      if (videoView >= 1000 && videoView < 1000000) {
        views = Math.floor(videoView / 1000) + "K views";
      } else if (videoView >= 1000000 && videoView < 1000000000) {
        views = Math.floor(videoView / 1000000) + "M views";
      } else if (videoView >= 1000000000 && videoView < 1e12) {
        views = Math.floor(videoView / 1000000000) + "B views";
      }

      mainVideo.innerHTML = ` <iframe
            width="900"
            height="506"
            id="main"
            src='https://www.youtube.com/embed/${el.id.videoId}'
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <h3>${videoTitle}</h3>
          <span>${views}</span>
          <hr />
          <div class="video_details">
            <div class="author">
              <img src=${channelImg} alt="" />
            </div>

            <div class="title">
              <a href="#">${channelName}</a>
            </div>
            <div id="subscribe">
              <img src="./yt_clone_images/download.png" alt="" />
            </div>
          </div>
          <p id="description">
            ${description}</p>`;
    });
};
displayVideo(videoData);

const otherVideos = (data) => {
  let videoContainer = document.querySelector(".videos");
  console.log("data:", data);
  videoContainer.innerHTML = "";
  data.forEach((el) => {
    let videoThumb = el.snippet.thumbnails.medium.url;
    let videoTitle = el.snippet.title;
    let channelName = el.snippet.channelTitle;

    let urlforchannelInfo = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${key}&id=${el.snippet.channelId}`;
    fetch(urlforchannelInfo)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log('res:', res)
        let videoView, views;

        videoView = res.items[0].statistics.viewCount;
        if (videoView >= 1000 && videoView < 1000000) {
          views = Math.floor(videoView / 1000) + "K views";
        } else if (videoView >= 1000000 && videoView < 1000000000) {
          views = Math.floor(videoView / 1000000) + "M views";
        } else if (videoView >= 1000000000 && videoView < 1e12) {
          views = Math.floor(videoView / 1000000000) + "B views";
        }

        let videodiv = document.createElement("div");
        videodiv.className = "video";

        videodiv.addEventListener("click", () => {
          localStorage.setItem("youtubeVideoData", JSON.stringify(el));
          localStorage.setItem("youtubeVideos", JSON.stringify(data));

          window.location.href = "videopage.html";
        });
        videodiv.innerHTML = `<div class="thumb">
              <img src=${videoThumb} alt="" />
            </div>
            <div class="details">
              <div class="vid-title">
                <h5>${videoTitle}</h5>
                <a href="#">${channelName}</a>
                <span>${views}</span>
              </div>
            </div>
         `;

        videoContainer.append(videodiv);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

otherVideos(otherVideosData);
