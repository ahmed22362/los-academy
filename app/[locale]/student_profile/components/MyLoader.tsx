import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => {
  const rectangleProps = [
    { x: 15, y: 15, rx: 4, ry: 4, width: 130, height: 10 },
    { x: 155, y: 15, rx: 3, ry: 3, width: 130, height: 10 },
    { x: 295, y: 15, rx: 3, ry: 3, width: 90, height: 10 },
  ];

  return (
    <ContentLoader
      className="flex justify-center w-full"
      height={200}
      width={400}
      viewBox="0 0 400 200"
      backgroundColor="#d9d9d9"
      foregroundColor="#ecebeb"
      {...props}
    >
      {[...Array(10)].map((_, index) => (
        <React.Fragment key={index}>
          {rectangleProps.map((rectProps, i) => (
            <rect
              className=""
              key={i}
              {...rectProps}
              y={rectProps.y + index * 20}
            />
          ))}
        </React.Fragment>
      ))}
    </ContentLoader>
  );
};

MyLoader.metadata = {
  name: "Ashiru Olawale",
  github: "walebant",
  description: "A responsive article loader that fits every screen 🎉",
  filename: "MyLoader",
};

export default MyLoader;
