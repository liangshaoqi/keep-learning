// 参考链接 https://www.bilibili.com/video/BV1iV411b7L1?spm_id_from=333.1007.top_right_bar_window_history.content.click

let isMount = true;
let workInProgressHook: any = null; // 当前正在处理的hook
// 节点
const fiber: any = {
  stateNode: App,
  memoizedState: null, // 保存每一个hook对应的数据
};

function useState(initialState: any) {
  // 获取当前useState对应哪一个hook
  let hook;
  // 区分是否首次渲染
  if (isMount) {
    // 初始一个hook
    hook = {
      memoizedState: initialState,
      next: null, // 指针,指向下一个hook
      queue: {
        // 队列,保存接下来的状态改变
        pending: null,
      },
    };
    // 如果没有
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    // 更新
    hook = workInProgressHook;
    // 当前正在处理的hook 处理成 下一个hook
    workInProgressHook = workInProgressHook.next;
  }

  // todo
  let baseState = hook.memoizedState;
  // 判断本次是否有新的更新要被执行
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;
    do {
      const action = firstUpdate.action;
      if (typeof action != 'function') {
        baseState = action;
      } else {
        baseState = action(baseState); // 计算新的状态
      }
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);
    // 清空链表
    hook.queue.pending = null;
  }

  hook.memoizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue: any, action: any) {
  const update: any = {
    action,
    next: null,
  };
  // 判断当前hook是否有触发的更新,第一次调用
  if (queue.pending === null) {
    // 通过环装链表实现 u0 -> u0 -> u0
    update.next = update;
  } else {
    // 多次调用时
    // u0 -> u0
    // u1 -> u0 -> u1
    update.next = queue.pending.next; // u1 -> u0
    queue.pending.next = update; // u0 -> u1
  }
  queue.pending = update;
  schedule();
}

// 调度方法
function schedule(): any {
  workInProgressHook = fiber.memoizedState;
  const app: any = fiber.stateNode();
  // 调用之后就属于更新
  isMount = false;
  return app;
}

function App() {
  const [num, setNum] = useState(0);
  const [num1, setNum1] = useState(10);
  console.log('isMount?', isMount);
  console.log('num', num);
  console.log('isMount?', isMount);
  console.log('num1', num1);
  return {
    onClick: () => {
      setNum((num: number) => num + 1);
    },
    onFocus: () => {
      setNum1((num: any) => num * 10);
    },
  };
}

export default schedule;
