import React, { FC, useState, useEffect } from 'react';
import convert from './defineProperty';

const DefineProperty: FC = () => {
  let obj = {
    a: 1,
    b: 2,
  };
  convert(obj);
  obj.a = 2;
  console.log(obj.a);
  return <div>组件</div>;
};
export default DefineProperty;
