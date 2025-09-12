import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';
// import {}

export const toggleAgent = () => (!!pageHashParams.a.peek() ? pageHashParams.a.delete() : pageHashParams.a.set('chat'));
