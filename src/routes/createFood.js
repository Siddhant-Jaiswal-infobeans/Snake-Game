import { randomIntFromInterval } from "../Utils/index";
const createFood = () => {
  const randomPosX = randomIntFromInterval(0, window.innerWidth);
  const randomPosY = randomIntFromInterval(0, window.innerHeight);
  const para = document.createElement("div");
  para.innerText = "*";
  para.setAttribute("id", "food");
  para.style.position = "absolute";
  para.style.fontSize = "25px";
  para.style.color = "red";
  para.style.left = randomPosX + "px";
  para.style.top = randomPosY + "px";
  console.log("width", randomPosX, randomPosY);
  document.getElementById("board").appendChild(para);
  return { x: randomPosX, y: randomPosY };
};

export default createFood;
