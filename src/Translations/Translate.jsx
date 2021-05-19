import en from "./en.json"
import ua from "./ua.json"
import { getCookie } from '../baseUrl';


export const SetWord = (word) => {
  var lang = getCookie('lang');
  if (lang === "UA") {
    return ua[word];
  }
  else if (lang === "EN") {
    return en[word];
  }
  else{
    return en[word];
  }
}

export const ToEN = (word) => {
  return en[word];
}