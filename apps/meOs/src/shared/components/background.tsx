import React from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <img
        src="./temp_image_F3415454-09FA-4C8C-A3F0-D8E6639B93C9.WEBP"
        alt="background"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default React.memo(Background);
