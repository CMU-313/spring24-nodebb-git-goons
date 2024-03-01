# User Guide

## Feature Implemented: Endorse Button

The feature we implemented includes an "Endorse" button on all posts made in NodeBB. Any instructor of a given NodeBB forum can click this button, which would then let all other users know that an instructor endorses a post. 

### How to Use Feature

In order to endorse a post, you must be logged in with an Instructor account. (Student accounts do not have the ability to endorse posts, but can see when any given post has been endorsed by an instructor.)

### Testing 

Tests added to file [tests/posts/uploads.js](spring24-nodebb-git-goons/tests/posts/uploads.js): 
    - Lines 184-190 (currently awaiting PR): checks permissions for unendorse button
Tests added to file [test/posts.js](spring24-nodebb-git-goons/tests/posts.js):
    - Lines 310-324: checks functionality and permissions for the endorse button

The tests cover all of the acceptance criteria in issues #23, #5, and #3. It tests that only instructors are able to click the endorse button and that clicking the endorse button marks the post as endorsed. We also conducted manual testing for the UI to make sure that the endorse button was only visible to instructors, but the endorsement message was visible to everyone. 
