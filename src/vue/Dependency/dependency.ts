const dep: any = class Dep {
  // window.dep = class Dep 这里改为dep是为了更好的使用
  subscribers: any[] | Set<any>;
  constructor() {
    this.subscribers = new Set(); //
  }
  depend() {
    if (activeUpdate) {
      // 注册这个active update作为一个订阅者
    }
  }
  notify() {
    // 通知所有的订阅者
  }
};

let activeUpdate: any = null;

function autorun(update: Function) {
  function wrappedUpdate() {
    // 通过全局变量activeUpdate保存wrappedUpdate,以便外部访问
    activeUpdate = wrappedUpdate;
    update();
    activeUpdate = null;
  }
}

autorun(() => {
  dep.depend();
});
