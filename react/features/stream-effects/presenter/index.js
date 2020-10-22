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
    const isLogitechCamera = APP.store.getState()['features/base/settings'].isLogitechCamera;
    const isHorizontalScreen = APP.store.getState()['features/base/settings'].isHorizontalScreen;
    console.log(">>>>>>>>>>>>>>>>>>>>moment of truth",isLogitechCamera);
    if(isLogitechCamera){
        return Promise.resolve(new JitsiStreamPresenterEffectsVS(stream));
    } else {
        return Promise.resolve(new JitsiStreamPresenterEffect(stream));
    }
}
