import { datas } from "./datas.js";

var image = document.getElementById("image");
var number = document.getElementById("number");
var downloadBtn = document.getElementById("download");

function setImage(ref) {
  image.src = ref;
  downloadBtn.href = ref;
}

function setNumber(num) {
  number.innerHTML = "No." + num;
}
var nextBtn = document.getElementById("next-btn");
var backBtn = document.getElementById("back-btn");
//show button
function showButton(bool) {
  if (bool) {
    nextBtn.style.display = "block";
    backBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
    backBtn.style.display = "none";
  }
}

var index = 0;
var pageList = [];

// add Page to pageList
function addPageToPageList(img) {
  for (let i = 0; i < Object.keys(img).length; i++) {
    pageList[i] = img[Object.keys(img)[i]];
  }
}
//next click
nextBtn.addEventListener("click", () => {
  index += 1;
  if (index > pageList.length - 1) {
    index = 0;
  }
  setImage(pageList[index]);
});

//back click
backBtn.addEventListener("click", () => {
  index -= 1;
  if (index < 0) {
    index = pageList.length - 1;
  }

  setImage(pageList[index]);
});

function setNumberAndImage(no, tutorial, error = datas.notFound) {
  if (no === "number 1") {
    //check if page exist
    if (tutorial.No1.image.Page1) {
      addPageToPageList(tutorial.No1.image);

      showButton(true);
      setNumber(2);
      setImage(tutorial.No1.image.Page1);
    }
    //check if image exist
    else if (tutorial.No1.image) {
      showButton(false);
      setNumber(1);
      setImage(tutorial.No1.image);
    }
  } else if (no === "number 2") {
    if (tutorial.No2.image.Page1) {
      addPageToPageList(tutorial.No2.image);

      showButton(true);
      setNumber(2);
      setImage(tutorial.No2.image.Page1);
    } else if (tutorial.No2.image) {
      showButton(false);
      setNumber(2);
      setImage(tutorial.No2.image);
    }
  }
}

function setData(tutorialTitle, tutorialChildren) {
  if (tutorialTitle.target.innerHTML === "Tutorial 1") {
    number.innerHTML = "hello";
    setNumberAndImage(tutorialChildren.target.innerHTML, datas.tutorial1);
  } else if (tutorialTitle.target.innerHTML === "Tutorial 2") {
    setNumberAndImage(tutorialChildren.target.innerHTML, datas.tutorial2);
  } else if (tutorialTitle.target.innerHTML === "Tutorial 3") {
    setNumberAndImage(tutorialChildren.target.innerHTML, datas.tutorial3);
  }
}

function createNewTutorial(tutorialNumber) {
  //create number element
  var h31 = document.createElement("h3");
  var h32 = document.createElement("h3");
  h31.innerHTML = "number 1";
  h32.innerHTML = "number 2";

  //child container
  var childContainer = document.createElement("div");
  childContainer.className = "Tutorial-child";
  childContainer.append(h31, h32);

  //tutorial title
  var h2 = document.createElement("h2");
  h2.innerHTML = `${tutorialNumber}`;

  //tutorial container
  var TutorialContainer = document.createElement("div");
  TutorialContainer.className = "Tutorial-container";
  TutorialContainer.append(h2, childContainer);

  //side-bar
  var sideBar = document.getElementById("side-bar");
  sideBar.append(TutorialContainer);
}

//cretae Tutorial 3
createNewTutorial("Tutorial 3");

//Tutorial-container
var TutorialContainer = document.getElementsByClassName("Tutorial-container");
for (let i = 0; i < TutorialContainer.length; i++) {
  //add click to All Tutorial Title
  TutorialContainer[i].children[0].addEventListener(
    "click",
    (tutorialTitle) => {
      //hide and show tutorial child
      if (tutorialTitle.target.nextElementSibling.style.display === "none") {
        tutorialTitle.target.nextElementSibling.style.display = "block";
      } else {
        tutorialTitle.target.nextElementSibling.style.display = "none";
      }

      // add click to tutorial child
      for (
        let j = 0;
        j < tutorialTitle.target.nextElementSibling.children.length;
        j++
      ) {
        tutorialTitle.target.nextElementSibling.children[j].addEventListener(
          "click",
          (tutorialChildren) => {
            setData(tutorialTitle, tutorialChildren);
          }
        );
      }
    }
  );
}
