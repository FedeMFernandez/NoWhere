export function threadSleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    if (milliseconds && milliseconds > 0) {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    }
    // else {
    //   log('# ThreadSleep.InvalidArgumentException', `arg is ${milliseconds}`);
    // }
  });
}
