import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div<{
  direction?: "row" | "column";
}>`
  width: 500px;
  height: 500px;
  background-color: #222;
  display: flex;
  flex-direction: ${({ direction }) => direction};
  overflow: hidden;
  position: relative;
`;

const CarouselItem = styled.div<{
  curIdx: number;
  transitionTime?: number;
  direction?: "row" | "column";
}>`
  min-width: 500px;
  min-height: 500px;

  transition: transform ${({ transitionTime }) => transitionTime}ms;
  transform: ${({ curIdx, direction }) =>
    direction === "row"
      ? `translateX(${-curIdx * 100}%)`
      : `translateY(${-curIdx * 100}%)`};
`;

const CarouselArrow = styled.div<{
  arrow: "left" | "right";
  direction?: "row" | "column";
}>`
  width: 50px;
  height: 50px;
  position: absolute;
  ${({ direction, arrow }) =>
    direction === "row"
      ? arrow === "left"
        ? "top: calc(50% - 50px); left: 0;"
        : "top: calc(50% - 50px); right: 0;"
      : arrow === "left"
      ? "left: calc(50% - 50px); top: 0;"
      : "left: calc(50% - 50px); bottom: 0;"}

  ${({ direction }) => direction === "column" && "transform: rotate(90deg);"}

  
  z-index: 999;
  font-size: 32px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

type TypeOptions = {
  autoPlay?: boolean;
  delay?: number;
  loop?: boolean;
  transitionTime?: number;
  direction?: "row" | "column";
};

type CarouselProps = {
  children: ReactNode | ReactNode[];
  options: TypeOptions;
};

const defaultOptions: TypeOptions = {
  autoPlay: false,
  delay: 1000,
  loop: false,
  transitionTime: 500,
  direction: "row",
};
const Carousel = ({
  children: childrenProps,
  options = defaultOptions,
}: CarouselProps) => {
  const children = Array.isArray(childrenProps)
    ? childrenProps
    : [childrenProps];

  const { autoPlay, delay, loop, transitionTime, direction } = options;

  const [curIdx, setCurIdx] = useState(0);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurIdx((prevIdx) => {
          if (prevIdx < children.length - 1) {
            return prevIdx + 1;
          } else {
            return 0;
          }
        });
      }, delay);

      return () => clearInterval(interval);
    }
  }, [autoPlay, children.length, delay]);
  return (
    <CarouselContainer direction={direction}>
      <CarouselArrow
        arrow="left"
        direction={direction}
        onClick={() => {
          if (curIdx > 0) {
            setCurIdx((prevIdx) => prevIdx - 1);
          } else {
            if (loop) {
              setCurIdx(children.length - 1);
            }
          }
        }}
      >
        {"<"}
      </CarouselArrow>
      {children.map((child, index) => {
        return (
          <CarouselItem
            key={index}
            curIdx={curIdx}
            transitionTime={transitionTime}
            direction={direction}
          >
            {child}
          </CarouselItem>
        );
      })}

      <CarouselArrow
        arrow="right"
        direction={direction}
        onClick={() => {
          if (curIdx < children.length - 1) {
            setCurIdx((prevIdx) => prevIdx + 1);
          } else {
            if (loop) {
              setCurIdx(0);
            }
          }
        }}
      >
        {">"}
      </CarouselArrow>
    </CarouselContainer>
  );
};

export default Carousel;
