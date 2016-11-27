const post = ({ data, url, successMessage, errorMessage }) => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const handleError = () => reject({ message: (errorMessage || ''), status: 'error' });

    xhr.open('post', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onerror = err => handleError(err);
    xhr.ontimeout = err => handleError(err);
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        const handler = xhr.status === 200 ? resolve : reject;

        handler({
          ...json,
          message: xhr.status === 200 ? (successMessage || '') : (errorMessage || ''),
          status: xhr.status === 200 ? 'success' : 'error',
        });
      } catch (e) {
        reject({ message: 'Ocorreu um erro inesperado.', status: 'error' });
      }
    };

    return xhr.send(data);
  })
);

export default post;
