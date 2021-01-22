import React from "react";

function add(num1) {
  return function (num2) {
    console.log(num1 + num2);
  };
}

add(1)(2);

const WithData = (WC: any) => {
  return function () {
    return <WC myprop="a" data="this is the data"></WC>;
  };
};

const Wrapped = WithData((props: any) => {
  console.log(props);

  return (
    <p>
      {props.children} {props.myprop} {props.data}
    </p>
  );
});

export default Wrapped;
