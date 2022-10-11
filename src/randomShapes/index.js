import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { randomIntFromInterval } from "../Utils";
export default function RandomShapes() {
  const [boxesData, setBoxesData] = useState([]);
  const navigate = useNavigate();
  console.log("navigate", navigate);
  const [shape, setShape] = useState("triangle");
  const addBox = () => {
    setBoxesData((oldData) => [
      ...oldData,
      {
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        length: randomIntFromInterval(5, 50),
        top: randomIntFromInterval(70, 300),
        left: randomIntFromInterval(1, 600),
        shape
      }
    ]);
  };

  const onChangeValue = (event) => {
    setShape(event.target.value);
  };
  return (
    <div className="App">
      {boxesData.map(({ color, length, top, left, shape }) => (
        <div
          style={{
            position: "absolute",
            top,
            left,
            zIndex: -1
          }}
        >
          {shape === "diamond" && (
            <>
              <div
                style={{
                  borderRight: `${length * 0.5}px solid transparent`,
                  borderLeft: `${length * 0.5}px solid transparent`,
                  borderBottom: `${length / 2}px solid ${color}`,
                  width: `${length}px`
                }}
                class="arrow-diamond"
              ></div>
              <div
                className="arrow-right"
                style={{
                  borderTop: `${length}px solid ${color}`,
                  borderRight: `${length}px solid transparent`,
                  borderLeft: `${length}px solid transparent`
                }}
              ></div>
            </>
          )}

          {shape === "triangle" && (
            <div
              className="arrow-right"
              style={{
                borderTop: `${length}px solid ${color}`,
                borderRight: `${length}px solid transparent`,
                borderLeft: `${length}px solid transparent`
              }}
            ></div>
          )}

          {shape === "square" && (
            <div
              style={{
                height: `${length}px`,
                width: `${length}px`,
                background: `${color}`
              }}
            ></div>
          )}

          {shape === "circle" && (
            <div
              style={{
                height: `${length}px`,
                width: `${length}px`,
                borderRadius: `${length}px`,
                background: `${color}`
              }}
            ></div>
          )}
        </div>
      ))}
      <div style={{ zIndex: 1, background: "white" }}>
        <button onClick={addBox}>Add Box</button>

        <div onChange={onChangeValue}>
          <input
            checked={shape === "triangle"}
            type="radio"
            value="triangle"
            name="triangle"
          />
          Triangle
          <input
            checked={shape === "square"}
            type="radio"
            value="square"
            name="square"
          />{" "}
          Square
          <input
            checked={shape === "circle"}
            type="radio"
            value="circle"
            name="circle"
          />{" "}
          Circle
          <input
            checked={shape === "diamond"}
            type="radio"
            value="diamond"
            name="Diamond"
          />{" "}
          Diamond
        </div>
      </div>
      <button onClick={() => navigate("/game")}>Game</button>
    </div>
  );
}
