const split = str => str.replace(/\s*/g, '').split(',');

export default {
  __topics: {},

  on(topics, callback) {
    if (topics && callback) {
      // Itera sobre os tópicos. Ex.: "change, error, update".
      split(topics).forEach((topic) => {
        // Inicializa um determinado tópico.
        if (!this.__topics[topic]) {
          this.__topics[topic] = [];
        }

        // Evita que a mesma callback seja adicionada várias vezes.
        if (this.__topics[topic].indexOf(callback) === -1) {
          this.__topics[topic].push(callback);
        }
      });
    }

    return this;
  },

  off(topics, callback) {
    if (topics) {
      // Itera sobre os tópicos. Ex.: "change, error, update".
      split(topics).forEach((topic) => {
        // Ignore tópicos não registrados.
        if (!this.__topics[topic]) {
          return;
        }

        if (callback) {
          // Remove apenas uma callback de um determinado tópico.
          const index = this.__topics[topic].indexOf(callback);

          if (this.__topics[topic].indexOf(callback) !== -1) {
            this.__topics[topic].splice(index, 1);
          }
        } else {
          // Remove todas as callbacks de um tópico.
          Reflect.deleteProperty(this.__topics, topic);
        }
      });
    } else {
      // Remove todos os tópicos.
      this.__topics = {};
    }

    return this;
  },

  trigger(topics, ...args) {
    if (topics) {
      // Itera sobre os tópicos. Ex.: "change, error, update".
      split(topics).forEach((topic) => {
        // Ignore tópicos não registrados.
        if (this.__topics[topic]) {
          this.__topics[topic].forEach(fn => fn(...args));
        }
      });
    }

    return this;
  },
};
