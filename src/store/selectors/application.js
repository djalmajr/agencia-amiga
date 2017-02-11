import createGetData from '~/helpers/create-get-data';

const getData = createGetData('application');

export const isLoadingState = getData('asyncState.loading');
export const getNotification = getData('notification');
