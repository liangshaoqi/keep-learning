## Stack

Demo:

```
  Stack栈的基本实现,先进后出
```

```ts
class Stack {
  dataStore: any[] = [];
  top: number = 0;
  push(element: any) {
    this.dataStore[this.top++] = element;
    // console.log('调用push方法后的栈:', this.dataStore)
  }
  pop() {
    // 先出栈再删除
    // 弹出最后一个进栈的元素并返回
    if (this.top) {
      const result = this.dataStore[this.top - 1];
      this.dataStore.pop();
      this.top = this.top - 1;
      return result;
    }
    return undefined;
  }
  peek() {
    return this.dataStore[this.top - 1];
  }
  length() {
    return this.top;
  }
}
export default Stack;
```

```tsx
import React from 'react';
import { Stack } from 'keep-learning';

export default () => <Stack />;
```
