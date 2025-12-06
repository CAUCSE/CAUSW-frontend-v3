// InterceptorManager는 인터셉터를 등록하고 관리합니다.
// 요청/응답 수명 주기 동안 실행될 핸들러들을 저장합니다.
/* eslint-disable */
export class InterceptorManager<T> {
  private handlers: Array<{
    fulfilled: (value: T) => T | Promise<T>;
    rejected?: (error: any) => any;
  } | null> = [];

  // 새로운 인터셉터를 등록합니다. 나중에 제거할 때 사용할 ID를 반환합니다.
  register(
    fulfilled: (value: T) => T | Promise<T>,
    rejected?: (error: any) => any,
  ): number {
    this.handlers.push({ fulfilled, rejected });
    return this.handlers.length - 1;
  }

  // ID를 사용하여 인터셉터를 제거합니다.
  remove(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  // 등록된 모든 인터셉터를 순회합니다.
  iterate(
    fn: (handler: {
      fulfilled: (value: T) => T | Promise<T>;
      rejected?: (error: any) => any;
    }) => void,
  ): void {
    this.handlers.forEach((handler) => {
      if (handler !== null) {
        fn(handler);
      }
    });
  }
}
