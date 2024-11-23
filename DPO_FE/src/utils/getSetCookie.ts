import { useRouter } from 'next/navigation'
function setCookieNoTime(name: string, value: any) {
    document.cookie = name + "=" + JSON.stringify(value) + ";path=/";
}
function getCookie(name: string): string | null {
  try {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
  } catch (error) {}

    return null;
}
function getAccFromCookie() {

    let myacc: Account | null;
    let stringAccount = getCookie('account') || '';
    try {
        myacc = JSON.parse(stringAccount);
    } catch (error) {
        // console.error('Error parsing Account:', error);
        myacc = null;
    }
    return myacc;
}
function deleteCookie(name: string) {
    document.cookie = name + '=;expires=Thu, 01 Jan 2025 00:00:01 GMT;';

}
export { setCookieNoTime, getCookie, getAccFromCookie, deleteCookie };
