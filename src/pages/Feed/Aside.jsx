import React from "react";

const Aside = () => {
  return <div className="max-lg:hidden"></div>;
};

//react.memo, bileşenin aldığı proplar değişmediği müddetçe bileşenin tekrardan render olmasının önüne geçer
//bir üst bilelen olan feed bileşeninde user state'nin değişmesi feed bileşeninin tekrardan render olmasına ardından aside bileşeninin ise gereksiz yere render olmasına sebep oluyordu react.memo ile bunun önne geçtik.
export default React.memo(Aside);
