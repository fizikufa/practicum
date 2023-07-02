type TCookieProps = {
    expires?: Date | string;
    path?: string;
  } & { [key: string]: string };
  
  //Получаю куки 
  export const getCookie = (name: string) => {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );   
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  //Сохраняем токен в куку  
  export const setCookie = (name: string, value: string, props?:TCookieProps) => {
    props = props || { path: '/' };
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 20 * 60 * 1000);
      exp = props.expires = d;
    }
    if (exp instanceof Date && exp) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (!propValue) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
  
  //установка кук
  export const setCookies = ( accessToken: string, refreshToken: string) => {
    setCookie('accessToken', accessToken.split('Bearer ')[1]);
    setCookie('refreshToken', refreshToken);
  };
  
  // Удаляем куки
  export const deleteCookie = (name: string) => {
    document.cookie = name + "=; Path='/'; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  
  //Получение токенов из куки
  export const authTokens = () => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    return { accessToken, refreshToken };
  };