'use strict';

// const db = require('../database');
// const plugins = require('../plugins');

module.exports = function (Posts) {
    Posts.endorse = async function (pid, uid) {
        return await toggleEndorsement('bookmark', pid, uid);
    };

    Posts.unendorse = async function (pid, uid) {
        return await toggleEndorsement('unbookmark', pid, uid);
    };

    async function toggleEndorsement(type, pid, uid) {
        if (parseInt(uid, 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const isEndorsing = true;

        const [postData] = await Promise.all([
            Posts.getPostFields(pid, ['pid', 'uid']),
        ]);

        // db.sortedSetAdd(`post:${pid}:endorser`, Date.now(), uid);
        // postData.endorserUid = uid;
        // await Posts.setPostField(pid, 'endorserUid', postData.endorserUid);

        // plugins.hooks.fire(`action:post.${type}`, {
        //     pid: pid,
        //     uid: uid,
        //     owner: postData.uid,
        //     current: 'endorse',
        // });

        return {
            post: postData,
            isEndorsement: isEndorsing,
        };
    }
};
