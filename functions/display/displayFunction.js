export const displayDecimal = function (resultTextContent) {
  if (resultTextContent.includes('.')) {
    return resultTextContent;
  } else if (!resultTextContent) {
    return '0.';
  } else {
    return `${resultTextContent}.`;
  }
};

export const displayNumber = function (resultTextContent, keyTextContent) {
  if (resultTextContent === '0') {
    return keyTextContent;
  } else {
    return `${resultTextContent}${keyTextContent}`;
  }
};

export const displayProcess = function (resultTextContent, keyTextContent) {
  return `${resultTextContent} ${keyTextContent}`;
};
