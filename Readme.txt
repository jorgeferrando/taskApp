Author: Jorge Ferrando Ferrando
Company: Unimicro AS

Framework: AngularJS
CSS: Twitter-Bootstrap
Other libraries used:
    - angular ui-bootstrap
    - angular animate
    - jQuery
    - angularjs x-editable

RUN APP
=======

Just drop in the server and open "index.html"

CONSIDERATIONS
==============

Because of CROSS DOMAIN COMMUNICATION if you are not inside the same domain where the REST API is you should
run your Chrome browser in this way (this takes me all the Friday):

    "chrome.exe --args --disable-web-security"

BUGS FOUNDED
============

Always you get the tasks the date and the time is updated to "now". This happens in the demo application also.

ABSTRACT
========
This is a simple task manager application

I have used AngularJS because I thought that this was a good opportunity to learn it. I have experience with knockout
and I believed that to try a new framework that is developed by Google, has a huge community behind and uses good practices
would be a very good practice for me.
This my first angularJS project and I have tried to use all recommendations that I have been able to.
I have also tried to keep the code as simple as possible but because of my inexperience sometimes I haven't done it.

FILES
======
app.js: initilize the framework.
index.html: the view of the application.
style.css: has the custom styles and the angular animation styles.
taskController.js: this file has the controller that manages communication with the view.
taskService.js: this file has the service that manages communication with the REST API.
vendors: has the third-party libraries

IMPROVEMENTS
============

I add some improvements to application:

- pagination.
- form validation.
- you can check or reopen all tasks in the page.
- you can remove all completed tasks.

EXPERIENCE
==========
The learning curve is huge if you don't have practice. From my point of view official documentation is short and doesn't explain things in a easy way.
But in the other hand we have a lot of tutorials and a huge community to solve this.
You need to write a lot of code to do things. Coders I read say this is good because you obtain a more maintainable code.
I haven't been able to evaluate this because the project is too short.
Angular also uses directives in HTML code. The have a justification for this. It's a different way to thing because all this time we try to separate HTML from Javascript.
It's not bad or good is different.

THINGS I WOULD IMPROVE
======================
My taskController mange all the interaction with the index.html so it has a lot of responsibility. If I had more time I would find a way to separate task management from pagination and error message management.
I haven't enough time to learn about controllers communication or other ways to modularize apps. Also I think to have a bootstrap to initialize the controller is a good practice.
In this case the controller starts with a function inside itself but I think it should be initialize in app.js with any kind of method I doesn't know now.

I have had to use some external libraries to implement inline edition, I think this is easier with Knockout,
this thing should be done as a directive, but I haven't enough time and experience to develop this properly.

It's a good practice to have a dependency management library such as RequireJS. It's a little project and I decide not to use this in this case.

This is also a good app to code it with events to manage refreshing and messages. But this is a part of the framework I haven't been able to test.

Testing - Application doesn't use a test framework because lots of them need to install node.js and npm and I wanted to keep it simple in the way you don't need to install anything to run it.
But I think that if I had had more time and experience I would use Protactor, the one is recommended by AngularJS team.