import React, { FC } from 'react';
import schedule from './sourceCode';

const HooksSc: FC = () => {
  return (
    <div>
      <div>在控制台中查看打印结果</div>
      <button onClick={() => schedule().onClick()}>+1</button>
      <button onClick={() => schedule().onFocus()}>*10</button>
    </div>
  );
};

export default HooksSc;
