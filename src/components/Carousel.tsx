import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: #222;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const CarouselItem = styled.div<{
  curIdx: number;
}>`
  min-width: 500px;
  min-height: 500px;

  transition: transform 0.5s;
  transform: ${({ curIdx }) => `translate(${-curIdx * 100}%)`};
`;

const CarouselArrow = styled.div<{
  direction: "left" | "right";
}>`
  width: 50px;
  height: 50px;
  position: absolute;
  top: calc(50% - 50px);
  ${({ direction }) => direction === "left" && "left: 0"};
  ${({ direction }) => direction === "right" && "right: 0"};
  z-index: 999;
  font-size: 32px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

type TypeOptions = {
  autoPlay?: boolean;
};

type CarouselProps = {
  children: ReactNode | ReactNode[];
  options: TypeOptions;
};

const defaultOptions: TypeOptions = {
  autoPlay: false,
};
const Carousel = ({
  children: childrenProps,
  options = defaultOptions,
}: CarouselProps) => {
  const children = Array.isArray(childrenProps)
    ? childrenProps
    : [childrenProps];

  const { autoPlay } = options;

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
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [autoPlay, children.length]);
  return (
    <CarouselContainer>
      <CarouselArrow
        direction="left"
        onClick={() => {
          if (curIdx > 0) setCurIdx((prevIdx) => prevIdx - 1);
        }}
      >
        {"<"}
      </CarouselArrow>
      {children.map((child, index) => {
        return (
          <CarouselItem curIdx={curIdx} key={index}>
            {child}
          </CarouselItem>
        );
      })}

      <CarouselArrow
        direction="right"
        onClick={() => {
          if (curIdx < children.length - 1) setCurIdx((prevIdx) => prevIdx + 1);
        }}
      >
        {">"}
      </CarouselArrow>
    </CarouselContainer>
  );
};

export default Carousel;
