# User Guide

## Feature Implemented: Endorse Button

The feature we implemented includes an "Endorse" button on all posts made in NodeBB. Any instructor of a given NodeBB forum can click this button, which would then let all other users know that an instructor endorses a post. 

### How to Use Feature

In order to endorse a post, you must be logged in with an Instructor account. (Student accounts do not have the ability to endorse posts, but can see when any given post has been endorsed by an instructor.)

Here are some screenshots of our UI, demonstrating what the feature would look like for students and instructors.

Functionallity for students:
<img width="1172" alt="Screenshot 2024-02-29 at 1 33 15 PM" src="https://github.com/CMU-313/spring24-nodebb-git-goons/assets/42014313/1bcf8c18-46c9-43a0-9ee9-464f2de8635b">

Functionallity for instructors:
<img width="1196" alt="Screenshot 2024-02-29 at 1 32 55 PM" src="https://github.com/CMU-313/spring24-nodebb-git-goons/assets/42014313/d339a270-bd57-4bbc-a573-9ee2817e2ec7">

### Testing 

Tests added to file [tests/posts/uploads.js](spring24-nodebb-git-goons/tests/posts/uploads.js): 
    - Lines 184-190 (currently awaiting PR): checks permissions for unendorse button
Tests added to file [test/posts.js](spring24-nodebb-git-goons/tests/posts.js):
    - Lines 310-324: checks functionality and permissions for the endorse button

The tests cover all of the acceptance criteria in issues #23, #5, and #3. It tests that only instructors are able to click the endorse button and that clicking the endorse button marks the post as endorsed. We also conducted manual testing for the UI to make sure that the endorse button was only visible to instructors, but the endorsement message was visible to everyone. 
