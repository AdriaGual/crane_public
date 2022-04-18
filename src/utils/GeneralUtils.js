global.Buffer = global.Buffer || require("buffer").Buffer;

export function CapitalizeWord(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function urlParser(url) {
  if (
    url != undefined &&
    url != "undefined" &&
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {
    return "http://" + url;
  } else {
    return url;
  }
}

export function substringLastIndex(string, character) {
  if (string !== null) {
    let lastIndex = string.lastIndexOf(character);
    return string.substring(lastIndex + 1);
  } else {
    return "";
  }
}

export function reverseArr(input) {
  var ret = new Array();
  for (var i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
}

export function arrayBufferToBase64(arrayBuffer) {
  return (
    "data:image/png;base64," +
    Buffer.from(arrayBuffer, "binary").toString("base64")
  );
}

export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
