import { navbar, sideBar } from "./components/components.js";

const nav = document.querySelector("nav");
nav.innerHTML = navbar();
const menu = document.querySelector("#menu");
const sidebar = document.querySelector(".sidebar");

sidebar.innerHTML = sideBar();

const sidebarCategory = document.querySelectorAll(".sidebar_category");
const searchbtn = document.getElementById("Seachbtn");
const goback = document.getElementById("goback");

const videoContainer = document.querySelector(".video_container");
// console.log("videoContainer:", videoContainer);

document.querySelector("form").addEventListener("submit", () => {
  event.preventDefault();
  getData();
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

// const key = "AIzaSyAKJjcUb5ksE6duUSor-3_l8UCZPhaz58Q";
// const key = "AIzaSyBoDKDp5HnHDRuWd95MtPgif1vi51M4sQY";
const key = "AIzaSyAuGOFHhqxN6Er-6PviJHJCFuCRHbIB3hU";

// let url = `https://youtube.googleapis.com/youtube/v3/search?maxResults=50&key=${key}&q=${query}&type=video`;
// let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&regionCode=IN&maxResults=25&q=${query}&type=video&key=${key}`;

const getData = async () => {
  try {
    let query = document.getElementById("search").value;

    if (query === "") {
      let temp = JSON.parse(localStorage.getItem("searchKey"));
      if (temp == undefined || temp == "" || temp == null) {
        query = "Bollywood Songs";
      } else {
        query = JSON.parse(localStorage.getItem("searchKey"));
      }
    }

    // let Url;
    console.log("query:", query);
    const searchurl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&regionCode=IN&maxResults=16&q=${query}&type=video&key=${key}`;

    let res = await fetch(searchurl);
    let data = await res.json()

    // console.log("data:", data.items);
    displayVideos(data.items);
  } catch (error) {
    console.log("error:", error);
  }
};
getData();

function displayVideos(data) {
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

        let videodiv = document.createElement("div");
        videodiv.className = "video";

        videodiv.addEventListener("click", () => {
          localStorage.setItem("youtubeVideoData", JSON.stringify(el));
          localStorage.setItem("youtubeVideos", JSON.stringify(data));

          window.location.href = "videopage.html";
        });
        videodiv.innerHTML = `
           <div class="video_thumbnail">
             <img src=${videoThumb}  />
           </div>
           <div class="video_details">
             <div class="author">
               <img src=${channelImg} alt="" />
             </div>

             <div class="title">
               <h3>${videoTitle}</h3>
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
}
