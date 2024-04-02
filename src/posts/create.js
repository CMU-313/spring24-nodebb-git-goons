'use strict';

const _ = require('lodash');

const meta = require('../meta');
const db = require('../database');
const plugins = require('../plugins');
const user = require('../user');
const topics = require('../topics');
const categories = require('../categories');
const groups = require('../groups');
const utils = require('../utils');
const translate = require('../translate');

// import { default as latexParser } from './latex_parser.js';

/* * * Check src/posts/latex_parser.ts for code sanity checks * * */
function latexParser(content) {
    // content with LaTeX wrappers removed
    let revisedContent = content;
    // Indices in revisedContent that require LaTeX formatting
    const indices = [];

    // Regexp for identifying beginning of LaTeX wrapper
    const regexp1 = /\$\$.+\$\$/;
    // Regexp for identifying end of LaTeX wrapper
    const regexp2 = /\$\$/;

    // Index of beginning of LaTeX wrapper
    let start = revisedContent.search(regexp1);

    while (start >= 0) {
        // Index of end of LaTeX wrapper
        const end = (revisedContent.substring(start + 2).search(regexp2)) + (start + 2);

        const prefix = revisedContent.substring(0, start);
        const suffix = revisedContent.substring(end + 2);
        const intermediate = revisedContent.substring(start + 2, end);

        const newIdx = [start, start + intermediate.length];

        indices.push(newIdx);

        revisedContent = prefix + intermediate + suffix;

        start = revisedContent.search(regexp1);
    }
    return [indices, revisedContent];
}

module.exports = function (Posts) {
    Posts.create = async function (data) {
        // This is an internal method, consider using Topics.reply instead
        const { uid } = data;
        const { tid } = data;
        // const content = data.content.toString();
        /*
         * Currently, parses LaTeX wrappers on a line-by-line basis
         */
        const parseResult = latexParser(data.content.toString());
        const content = parseResult[1];
        const timestamp = data.timestamp || Date.now();
        const isMain = data.isMain || false;
        const [isEnglish, translatedContent] = await translate.translate(data)

        if (!uid && parseInt(uid, 10) !== 0) {
            throw new Error('[[error:invalid-uid]]');
        }

        if (data.toPid && !utils.isNumber(data.toPid)) {
            throw new Error('[[error:invalid-pid]]');
        }

        const pid = await db.incrObjectField('global', 'nextPid');
        let postData = {
            pid: pid,
            uid: uid,
            tid: tid,
            content: content,
            timestamp: timestamp,
            translatedContent: translatedContent,
            isEnglish: isEnglish,
        };

        if (data.toPid) {
            postData.toPid = data.toPid;
        }
        if (data.ip && meta.config.trackIpPerPost) {
            postData.ip = data.ip;
        }
        if (data.handle && !parseInt(uid, 10)) {
            postData.handle = data.handle;
        }

        let result = await plugins.hooks.fire('filter:post.create', { post: postData, data: data });
        postData = result.post;
        await db.setObject(`post:${postData.pid}`, postData);

        const topicData = await topics.getTopicFields(tid, ['cid', 'pinned']);
        postData.cid = topicData.cid;

        await Promise.all([
            db.sortedSetAdd('posts:pid', timestamp, postData.pid),
            db.incrObjectField('global', 'postCount'),
            user.onNewPostMade(postData),
            topics.onNewPostMade(postData),
            categories.onNewPostMade(topicData.cid, topicData.pinned, postData),
            groups.onNewPostMade(postData),
            addReplyTo(postData, timestamp),
            Posts.uploads.sync(postData.pid),
        ]);

        result = await plugins.hooks.fire('filter:post.get', { post: postData, uid: data.uid });
        result.post.isMain = isMain;
        plugins.hooks.fire('action:post.save', { post: _.clone(result.post) });
        return result.post;
    };

    async function addReplyTo(postData, timestamp) {
        if (!postData.toPid) {
            return;
        }
        await Promise.all([
            db.sortedSetAdd(`pid:${postData.toPid}:replies`, timestamp, postData.pid),
            db.incrObjectField(`post:${postData.toPid}`, 'replies'),
        ]);
    }
};
