// @flow

import JitsiStreamPresenterEffect from './JitsiStreamPresenterEffect';
import JitsiStreamPresenterEffectsVS from './JitsiStreamPresenterEffectsVS';


/**
 * Creates a new instance of JitsiStreamPresenterEffect.
 *
 * @param {MediaStream} stream - The video stream which will be used for
 * creating the presenter effect.
 * @returns {Promise<JitsiStreamPresenterEffect>}
 */
export function createPresenterEffect(stream: MediaStream) {
    if (!MediaStreamTrack.prototype.getSettings
        && !MediaStreamTrack.prototype.getConstraints) {
        return Promise.reject(new Error('JitsiStreamPresenterEffect not supported!'));
    }
    console.log(APP.store.getState(),">>>>>>>>>>>>>>>APP_STORE");
    const isCameraVertical = APP.store.getState()['features/base/settings'].isCameraVertical;
    if(isCameraVertical){
        return Promise.resolve(new JitsiStreamPresenterEffectsVS(stream));
    } else {
        return Promise.resolve(new JitsiStreamPresenterEffect(stream));
    }
}
