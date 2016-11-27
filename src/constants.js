// const URL = process.env.NODE_ENV === 'development' ?
//     'http://teste.aws.audora.com.br:8080/defensoria.alagoas' :
//     'https://defensoria.audora.com.br/alagoas';

const URL = 'http://ec2-54-91-111-216.compute-1.amazonaws.com:8080/transparencia';
// const URL = 'https://defensoria.audora.com.br/alagoas';
// const URL = 'http://teste.aws.audora.com.br:8080/defensoria.alagoas';

export default {
  Url: {
    BASE: URL,
    API: `${URL}/api`,
  },
};
