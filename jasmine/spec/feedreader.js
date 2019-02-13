/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //I used the above example
        it(" every feed has a URL defined and it is not empty",function(){
            for (let fd of allFeeds){
                expect(fd.url).toBeDefined();
                expect(fd.url.length).not.toBe(0);
            }
        });

        //The same as above!
        it(" every feed has a name defined and it is not empty",function(){
            for (let fd of allFeeds){
                expect(fd.name).toBeDefined();
                expect(fd.name.length).not.toBe(0);
            }
        });
    });


    describe('The menu', function() {

        //In the app.js the part of the code which handles the on/off functionality
        //of the menu, in essence 'applies' the 'menu-hidden' class to the body element.
        //So, I ahve to check if body has beed assigned the 'menu-hidden' class
        it('is hidden', function() {
            let bodyHidden = document.querySelector('body');

            //console.log(bodyHidden.classList);
             
            expect(bodyHidden.classList.contains('menu-hidden')).toBe(true);
        });

        //I used the icon element from the html document to realize if it is
        //clicked or not
         it ('changed visibility', function(){
            let bodyHidden = document.querySelector('body');
            let menuHidden = document.querySelector('.menu-icon-link');
            //console.log(menuHidden);

            //click method to simulate the click event
            //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click

            
            // I tried to use setTimeout for a real case test but it seems that
            //expect doesnt work in it

            // setTimeout(function(){
            //     console.log('metaaaaaaaaaaaaa',menuHidden);
            //     menuHidden.click();
            //     expect(bodyHidden.classList.contains('menu-hidden')).toBe(false);
            // },1000, menuHidden,bodyHidden);

            // setTimeout(function(){
            //     console.log('metaaaaaaaaaaaaa',menuHidden);
            //     menuHidden.click();
            //     expect(bodyHidden.classList.contains('menu-hidden')).toBe(true);
            // },2000, menuHidden,bodyHidden);

            menuHidden.click();
            expect(bodyHidden.classList.contains('menu-hidden')).toBe(false);
            menuHidden.click();
            expect(bodyHidden.classList.contains('menu-hidden')).toBe(true);


         })
    });
    describe('Initial Entries', function() {

        //In the beforeEach function I will run every part of the code
        //that has to be completed before of our 'expectations'
        //The first eleement should be loaded
        beforeEach(function(done){
            loadFeed(0,done);
            
        });

        it('contains at least one entry', function(){
            //let fd = document.querySelector('.feed')
            const fd = $('.feed .entry')
            //at least one child
            expect(fd.children.length).not.toBe(true);
        });
    });
    describe('New Feed Selection', function() {
        //I defeine it at this point to be used by both functions
        let fd = document.querySelector('.feed')

        //array to store content of feed
        fdArray = [];
        //firstElements = [];

        //as before,but for more 'loadings'

        // beforeEach(function(done){
        //     //loadFeed(0,done);
        //     loadFeed(0);
        //     //console.log(fd.children[0].innerText);
        //     //console.log(Array.from(fd.children));
        //     //fdArray = Array.from(fd.children);
            

        //     for (let elem of Array.from(fd.children)){
        //         fdArray.push(elem.innerText);
        //         console.log(elem.innerText)
        //     };
        //     //console.log(fdArray);


        //     loadFeed(1,done);
        // });


        beforeEach(function(done) {
            //let feed = document.querySelector('.feed');

            // load first feed
            loadFeed(0, ()=> {

                // convert feeds child elements into an array
                // push innerText items into firstFeed[]
                Array.from(fd.children).forEach(function(entry) {
                    //firstFeed.push(entry.innerText);
                    fdArray.push(entry.innerText);
                });
                // load second feed
                loadFeed(1, done);
            });
        });



        it('changed content', function(){
            ind =0
            for (let elem of Array.from(fd.children)){
                expect(fd.innerText !== fdArray[ind]).toBe(true);
                ind +=1;
            };

        });
    });
}());
