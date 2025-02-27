import React from "react";

import Localpreview from "../video/Localpreview";

function Featured() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex justify-center flex-wrap items-center  z-10">
        <Localpreview name={"video1"} title={"Guilliman to his Emperor"} />
        <Localpreview name={"video2"} title={"Emperor's Angels"} />
        <Localpreview name={"video3"} title={"The heretic son Horus"} />
        <Localpreview name={"video4"} title={"Ancient enemy"} />
      </div>
    </div>
  );
}

export default Featured;
