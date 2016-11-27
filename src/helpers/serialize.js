const serialize = data => (
  Object.keys(data).map(keyName =>
    `${encodeURIComponent(keyName)}=${encodeURIComponent(data[keyName])}`,
  ).join('&')
);

export default serialize;
