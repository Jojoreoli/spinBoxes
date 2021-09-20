let timeout;
let flag = true;
spinningBuilder();

function spinningBuilder() {
  teste = 50;
  let boxNumber = teste;
  while (boxNumber > 0) {
    const container = document.querySelector(".boxContainer");
    const box = document.createElement("div");
    box.classList.add("box");
    container.appendChild(box);
    boxNumber--;
  }
}

function idleSpin() {
  let i = 0;
  flag = true;
  for (const item of box) {
    item.classList.add("spinning");
    setInterval(() => {
      if (flag) {
        item.style.transform = `rotate(${i}deg)`;
        i+= .1;
      } else {
        item.classList.remove("spinning");
        i = 0;
      }
    }, 100);
  }
}

let box = document.querySelectorAll(".box");
idleSpin();
[...box].map((box) => {
  let boxBoundingRect = box.getBoundingClientRect();
  let boxCenter = {
    x: boxBoundingRect.left + boxBoundingRect.width / 2,
    y: boxBoundingRect.top + boxBoundingRect.height / 2,
  };
  document.addEventListener("mousemove", (e) => {
    flag = false;
    let angle =
      Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
      (180 / Math.PI);
    box.style.transform = `rotate(${angle}deg)`;
    clearTimeout(timeout);
    timeout = setTimeout(idleSpin, 1000);
  });

  document.addEventListener("touchmove", (e) => {
    flag = false;
    let angle =
      Math.atan2(
        e.touches[0].pageX - boxCenter.x,
        -(e.touches[0].pageY - boxCenter.y)
      ) *
      (180 / Math.PI);
    box.style.transform = `rotate(${angle}deg)`;
    clearTimeout(timeout);
    timeout = setTimeout(idleSpin, 1000);
  });
});
