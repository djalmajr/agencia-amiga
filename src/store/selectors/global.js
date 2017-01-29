export const isLoadingState = state => state.asyncState.loading;
export const isUpdatingProfile = state => state.global.isUpdatingProfile;

export const getCurrentTabFeed = state => state.global.currentTabFeed;
export const getNotification = state => state.global.notification;
export const getUserMenuVisibility = state => state.global.isUserMenuVisible;
