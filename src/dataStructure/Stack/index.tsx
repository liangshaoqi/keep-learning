import React, { FC, useState, useEffect } from 'react';
import Stack from './stack';

const Component: FC = () => {
  const [isPalindromeFlag, setIsPalindromeFlag] = useState(false); // 是否是回文
  const [value, setValue] = useState('');
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  // 判断是否为回文
  const isPalindrome = (str: string): boolean => {
    const s = new Stack();
    for (let i = 0; i < str.length; i++) {
      s.push(str[i]);
    }
    let r_str = '';
    while (s.length() > 0) {
      r_str += s.pop();
    }
    return r_str == str;
  };
  const btnclick = () => {
    setIsPalindromeFlag(isPalindrome(value));
  };
  return (
    <div>
      <h1>回文判断</h1>
      <input type="text" placeholder="输入字符串" value={value} onChange={onChange} />
      <button onClick={btnclick}>判断</button>
      <span>结果: {isPalindromeFlag ? '是' : '不是'}</span>
    </div>
  );
};
export default Component;
