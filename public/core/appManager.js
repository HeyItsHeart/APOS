const AppManager = {
  apps: {},
  register(name, fn) {
    this.apps[name] = fn;
  },
  open(name) {
    if (this.apps[name]) this.apps[name]();
  }
};
