/**
 * @function notificationOptions function to select the type of notification to show. It will be
 *    initializate with `<Toast ref={toast}/>` in the actions property from PageLayout component.
 *    Example:
 *    `<Component>
 *       `<Toast ref={toast} />
 *          ...`
 *    </Component>`
 *    `
 * @param option success | info | warn | error
 * @param msgSummary Header or title notitfaction
 * @param msgDetail Message to show to the user
 * @param timeout Time out to show the notification
 * @param toast Ref to launch notifications
 * @param callback Optional. Function to execute after the notification is showed.
 *   It could receive a timeout value
 */
export function notificationOptions(
  option: string,
  msgSummary: string,
  msgDetail: string,
  timeout: number,
  toast: { current: { show: Function } | null },
  callback?: Function | any
): void {
  toast.current.show({
    severity: option,
    summary: msgSummary,
    detail: msgDetail,
    life: timeout,
  });
  if (callback) {
    setTimeout(() => {
      callback();
    }, timeout);
  }
  // return null;
}
