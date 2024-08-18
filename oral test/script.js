const pageBody = document.body;
const listofJob = document.getElementById("list-of-job");
const url = "https://frcz3-8080.csb.app/jobs?_limit=10";
const previousBtn = document.getElementById("Previous");
const nextBtn = document.getElementById("Next");
const paginationText = document.querySelector(".pagination-text");
const searchInput = document.getElementById("search-job");
const searchBtn = document.getElementById("Search");

let pageNum = 1;
let jobTitle = "";

// get jobs API
const get10Job = async (url, pageNum, jobTitle) => {
  const res = await fetch(`${url}&_page=${pageNum}&q=${jobTitle}`);
  console.log(res);
  // console.log(res);
  const result = await res.json();
  // console.log(result);
  return result;
};

// show 10 jobs
const show10Job = async () => {
  const data = await get10Job(url, pageNum, jobTitle);
  console.log(data);
  data.forEach((job) => {
    const jobEl = document.createElement("ul");
    jobEl.innerHTML = `
      <li>${job.title}</li>
      `;
    listofJob.appendChild(jobEl);
  });
};
show10Job();

nextBtn.addEventListener("click", () => {
  listofJob.innerHTML = "";
  previousBtn.removeAttribute("disabled");
  pageNum++;
  paginationText.innerText = pageNum;
  get10Job(url, pageNum);
  show10Job();
});

previousBtn.addEventListener("click", () => {
  listofJob.innerHTML = "";
  pageNum--;
  paginationText.innerText = pageNum;
  get10Job(url, pageNum);
  show10Job();
  if (pageNum === 1) {
    previousBtn.disabled = true;
  }
});

// show search job
searchBtn.addEventListener("click", () => {
  pageNum = 1;
  previousBtn.disabled = true;
  paginationText.innerText = pageNum;
  jobTitle = searchInput.value.trim();
  console.log(jobTitle);
  listofJob.innerHTML = "";
  show10Job();
});
