import { useEffect, useRef, useState } from "react";
import { getDifference } from "../Utils";
import createFood from "./createFood";
import { width, height, defaultDirections } from "../Utils/constants";

export default function Root() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const movingDir = useRef({ ...defaultDirections, right: true });
  const foodPos = useRef({ x: 0, y: 0 });
  const found = useRef(false);
  const length = useRef(1);
  const snakeData = useRef([{ x: 0, y: 0 }]);

  useEffect(() => {
    setInterval(() => {
      setPos((posOld) => {
        let y = posOld.y;
        let x = posOld.x;
        if (movingDir.current.right) x + 5 > width ? (x = 0) : (x = x + 5);
        if (movingDir.current.down) y + 5 > height ? (y = 0) : (y = y + 5);
        if (movingDir.current.left) x - 5 < 0 ? (x = width) : (x = x - 5);
        if (movingDir.current.up) y - 5 < 0 ? (y = height) : (y = y - 5);

        const snakeDataTemp = snakeData.current;
        snakeDataTemp.splice(0, 1);
        snakeDataTemp.push({ x, y });
        snakeData.current = snakeDataTemp;

        if (
          getDifference(foodPos.current.x, x) < 10 &&
          getDifference(foodPos.current.y, y) < 10 &&
          !found.current
        ) {
          found.current = true;
          eatFood();
        }
        return { x, y };
      });
    }, 50);
    //  30 * (snakeData.current.length * 0.05 + 1

    const arrowKeyPress = (e) => {
      e = e || window.event;
      if (e.keyCode === 38) {
        // up arrow
        movingDir.current = { ...defaultDirections, up: true };
      } else if (e.keyCode === 40) {
        // down arrow
        movingDir.current = { ...defaultDirections, down: true };
      } else if (e.keyCode === 37) {
        movingDir.current = { ...defaultDirections, left: true };
        // left arrow
      } else if (e.keyCode === 39) {
        movingDir.current = { ...defaultDirections, right: true };
        // right arrow
      }
    };
    document.onkeydown = arrowKeyPress;
  }, []);

  const eatFood = () => {
    length.current++;
    found.current = false;
    document.getElementById("food").remove();
    const foodPosTemp = createFood();
    const snakeD = snakeData.current;
    const snakeLen = snakeD.length;
    foodPos.current = foodPosTemp;
    snakeData.current = [
      ...snakeData.current,
      {
        x: movingDir.current.right
          ? snakeD[snakeLen - 1].x - 10
          : movingDir.current.left
          ? snakeD[snakeLen - 1].x + 10
          : snakeD[snakeLen - 1].x,
        y: movingDir.current.up
          ? snakeD[snakeLen - 1].y + 10
          : movingDir.current.down
          ? snakeD[snakeLen - 1].y - 10
          : snakeD[snakeLen - 1].y
      }
    ];
  };

  useEffect(() => {
    if (!document.getElementById("food")) {
      foodPos.current = createFood();
    }
  }, []);

  return (
    <div
      id="board"
      style={{
        background: "#eedd82",
        height: "100%",
        width: "100%",
        color: "green"
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "10px",
          color: "black",
          fontSize: "30px"
        }}
      >
        Score: {snakeData.current.length - 1 || 0}
      </div>
      {snakeData.current.map((key) => (
        <div
          style={{
            position: "absolute",
            left: key.x + "px",
            top: key.y + "px",
            fontSize: "25px",
            fontWeight: "bolder"
          }}
        >
          {"*"}
        </div>
      ))}
    </div>
  );
}
