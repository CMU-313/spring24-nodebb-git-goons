import plugins from '../plugins';
import { PostObject } from '../types';

interface PostEndorsement {
    post: PostObject;
    isEndorsed: boolean;
}

interface PostsFunctions {
    getPostFields: (pid: number, fields: string[]) => Promise<PostObject | null>;
    setPostField: (pid: number, field: string, value: number) => Promise<void>;
    endorse: (pid: number, uid: number) => Promise<PostEndorsement>;
    unendorse: (pid: number, uid: number) => Promise<PostEndorsement>;
}

export = function (Posts: PostsFunctions) {
    async function toggleEndorsement(type: string, pid: number, uid: number) {
        const uidStr: string = uid.toString();
        if (parseInt(uidStr, 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const isEndorsing = true;

        const [postData]: PostObject[] = await Promise.all([
            Posts.getPostFields(pid, ['pid', 'uid']),
        ]);

        await Posts.setPostField(pid, 'endorsed', 1);

        await plugins.hooks.fire(`action:post.endorse`, {
            pid: pid,
            uid: uid,
            owner: postData.uid,
            current: 'endorsed',
        });


        return {
            post: postData,
            isEndorsed: isEndorsing,
        };
    }

    Posts.endorse = async function (pid: number, uid: number) {
        return await toggleEndorsement('bookmark', pid, uid);
    };

    Posts.unendorse = async function (pid: number, uid: number) {
        return await toggleEndorsement('unbookmark', pid, uid);
    };
}
