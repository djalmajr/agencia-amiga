const get = url => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('get', url, true);
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        const handler = xhr.status === 200 ? resolve : reject;

        handler({ ...json, status: xhr.status === 200 ? 'success' : 'error' });
      } catch (e) {
        reject({ message: 'Ocorreu um erro inesperado.', status: 'error' });
      }
    };

    return xhr.send();
  })
);

export default get;
