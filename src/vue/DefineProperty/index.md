## DefineProperty

Demo:

```
  Object.defineProperty实现双向绑定
```

```ts
function convert(obj: any) {
  Object.keys(obj).forEach((key) => {
    let internalValue = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(`get方法key:${key}, value: ${internalValue}`);
        return internalValue;
      },
      set(newValue) {
        console.log(`set方法key:${key}, value: ${newValue}`);
        internalValue = newValue;
      },
    });
  });
}
```

```tsx
import React from 'react';
import { DefineProperty } from 'keep-learning';

export default () => <DefineProperty />;
```
