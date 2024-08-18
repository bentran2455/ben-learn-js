const fullDocument = document.body;
const countGameText = document.querySelector(".number-of-games");
const gameListing = document.querySelector(".games-list");
const searchToggleSection = document.querySelector(".search-toggle-section");
const genreList = document.getElementById("genre-list");
const tagList = document.getElementById("tag-list");
const mainURL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
const searchInput = document.querySelector(".search-form input");
const gameDetail = document.getElementById("game-details");

function updateNumberOfGames(num) {
  num = gameListing.querySelectorAll(".game-item").length;
  countGameText.textContent = `${num} game${num > 1 ? "s" : ""}`;
}

function closeSearch() {
  searchToggleSection.removeAttribute("open");
  fullDocument.classList.remove("fade");
}
function openSearch() {
  searchToggleSection.setAttribute("open", true);
  fullDocument.classList.add("fade");
}

let type = "";
let path = "";
let detail = "";

// FETCH ALL DATA
const fetchData = async (mainURL, type, path, detail) => {
  const res = await fetch(`${mainURL}/${type}?${path}=${detail}`);
  console.log("response is", res);
  const result = (await res.json()).data;
  // console.log("result is", result);
  return result;
};

const showGameDetails = async (appid) => {
  const res = await fetch(`${mainURL}/single-game/${appid}`);
  const data = (await res.json()).data;
  console.log("data", data);
  let releaseDate = data.release_date;
  releaseDate = releaseDate.replace("T00:00:00.000Z", "");
  gameListing.innerHTML = "";
  gameDetail.innerHTML = `
        <div class="game-img">
        <img src="${data.header_image}" alt="${data.name}" width="400">
        </div>
        <div class="game-spec">
        <h2>${data.name}</h2>
        <p class="game-desc">${data.description}</p>
        <p class="game-release-date">Release Date: ${releaseDate}</p>
        </div>
    `;
};

// Add data
const addData = async (section, type, path, detail) => {
  gameListing.innerHTML = "";
  gameDetail.innerHTML = "";
  const dataList = await fetchData(mainURL, type, path, detail);
  console.log(dataList);
  dataList.forEach((item) => {
    if (type === "games" || type === "features") {
      const dataListItem = document.createElement("div");
      dataListItem.classList.add("game-item");
      dataListItem.setAttribute("appid", `${item.appid}`);
      dataListItem.setAttribute(
        "onclick",
        "showGameDetails(" + item.appid + ")"
      );
      dataListItem.innerHTML = `
          <div class="game-image">
              <img src="${item.header_image}" width="300" alt="">
          </div>
          <a class="game-name" href="#" name="${item.name}">
              ${item.name}
          </a>`;
      section.appendChild(dataListItem);
    } else {
      const dataListItem = document.createElement("li");
      dataListItem.innerHTML = `<a onclick="addData(gameListing, 'games', '${type}' ,'${item.name}')" id="${item._id}" class="${type}-name" href="#" name="${item.name}">${item.name}</a>`;
      section.appendChild(dataListItem);
    }
  });
};

// Show data by default
const showData = async () => {
  addData(genreList, "genres", "", "");
  addData(gameListing, "games", "", "");
  addData(tagList, "steamspy-tags", "", "");
};

showData();

// Search game

const searchGame = (event) => {
  const query = searchInput.value.trim();
  if ((query && event.keyCode === 13) || (query && event.which === 13)) {
    addData(gameListing, "games", "q", query);
  }
};
