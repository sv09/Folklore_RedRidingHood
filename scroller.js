
/**
 * scroller - handles the details
 * of figuring out which section
 * the user is currently scrolled
 * to.
 *
 */
 export function scroller() {
    let container = d3.select('body');

    // event dispatcher
    let dispatch = d3.dispatch('active', 'progress');
  
    // d3 selection of all the
    // text sections that will
    // be scrolled through
    let sections = null;
  
    // array that will hold the
    // y coordinate of each section
    // that is scrolled through
    let sectionPositions = [];
    let currentIndex = -1;
    // y coordinate of
    let containerStart = 0;
    let isFixed = null;
    let isBelow = null;
    let graph = d3.select('null');
    // let graph = d3.select('#inner-content');
    let belowStart;
    let graphHeight;
    let containerBB;
  
    /**
     * scroll - constructor function.
     * Sets up scroller to monitor
     * scrolling of els selection.
     *
     * @param els - d3 selection of
     *  elements that will be scrolled
     *  through by user.
     */
    function scroll(els) {
      sections = els;
  
      // when window is scrolled call
      // position. When it is resized
      // call resize.
      d3.select(window)
        .on('scroll.scroller', position)
        .on('resize.scroller', resize);
  
      // manually call resize
      // initially to setup
      // scroller.
      resize();
  
      // hack to get position
      // to be called once for
      // the scroll position on
      // load.
      // @v4 timer no longer stops if you
      // return true at the end of the callback
      // function - so here we stop it explicitly.
      let timer = d3.timer(function () {
        position();
        timer.stop();
      });
    }
  
    /**
     * resize - called initially and
     * also when page is resized.
     * Resets the sectionPositions
     *
     */
    function resize() {
      // sectionPositions will be each sections
      // starting position relative to the top
      // of the first section.
      sectionPositions = [];
      let startPos;
      sections.each(function (d, i) {
        let top = this.getBoundingClientRect().top;
        if (i === 0) {
          startPos = top;
        }
        sectionPositions.push(top - startPos);
      });
      containerBB = container.node().getBoundingClientRect()
      // console.log('container.node().getBoundingClientRect() - ', container.node().getBoundingClientRect())
      graphHeight = graph.node() ? graph.node().getBoundingClientRect().height : 0
      // console.log('graphHeight - ', graphHeight)

      containerStart = containerBB.top + window.pageYOffset;
      // console.log('containerBB - ', containerBB)
      // console.log('window.pageYOffset in resize- ', window.pageYOffset)
      // belowStart = containerBB.bottom - graphHeight + window.pageYOffset
      // belowStart = containerBB.bottom + window.pageYOffset;
    }
  
    /**
     * position - get current users position.
     * if user has scrolled to new section,
     * dispatch active event with new section
     * index.
     *
     */
    function position() {
      let pos = window.pageYOffset - 10 - containerStart;
      let sectionIndex = d3.bisect(sectionPositions, pos);
      sectionIndex = Math.min(sections.size() - 1, sectionIndex);

      // console.log('containerBB.bottom - ', containerBB)
      // console.log('window.pageYOffset in position - ', window.pageYOffset)
      // console.log('containerBB.bottom - ', containerBB.bottom)
      // console.log('graphHeight - ', graphHeight)
      // const top = window.pageYOffset + window.innerHeight;
      // console.log('container.offsetTop - ', container.offsetTop)
      // console.log('window.innerHeight - ', window.innerHeight)
      // console.log('top - ', top)
      // console.log('top - containerBB.bottom: ', top - containerBB.bottom)
      // belowStart = containerBB.bottom - graphHeight + window.pageYOffset;
      // belowStart = window.pageYOffset + 20;
      // var isBelow1 = window.pageYOffset > belowStart
      // var isBelow1 = window.pageYOffset > graphHeight
      // console.log('window.innerHeight - ', window.innerHeight)
      var isBelow1 = window.pageYOffset > 7247
      // console.log('belowStart - ', belowStart)
      // console.log('isBelow1 - ', isBelow1)
      if (isBelow != isBelow1){
        isBelow = isBelow1
        container.classed('graph-scroll-below', isBelow)
        // infoG.classed('graph-scroll-below', isBelow)
      }

      var isFixed1 = !isBelow && window.pageYOffset > containerStart;
      if (isFixed != isFixed1){
        isFixed = isFixed1
        container.classed('graph-scroll-fixed', isFixed)
      }

      if(isBelow){
        sectionIndex = sections.size() - 1;
      }
  
      if (currentIndex !== sectionIndex) {
        // @v4 you now `.call` the dispatch callback
        sections.classed('graph-scroll-active', function(d, i){ return i === sectionIndex })
        dispatch.call('active', this, sectionIndex);
        currentIndex = sectionIndex;
      }
  
      let prevIndex = Math.max(sectionIndex - 1, 0);
      let prevTop = sectionPositions[prevIndex];
      let progress = (pos - prevTop) / (sectionPositions[sectionIndex] - prevTop);
      // @v4 you now `.call` the dispatch callback
      dispatch.call('progress', this, currentIndex, progress);
    }
  
    /**
     * container - get/set the parent element
     * of the sections. Useful for if the
     * scrolling doesn't start at the very top
     * of the page.
     *
     * @param value - the new container value
     */
    scroll.container = function (value) {
      if (arguments.length === 0) {
        return container;
      }
      container = value;
      return scroll;
    };
  
    // @v4 There is now no d3.rebind, so this implements
    // a .on method to pass in a callback to the dispatcher.
    scroll.on = function (action, callback) {
      dispatch.on(action, callback);
    };
  
    return scroll;
  }





//*************************************************** */

// export function scroller(){
//     let container = d3.select('body');
//     //create a d3.dispatch 
//     let dispatch = d3.dispatch('active', 'progress');
//     //select all the sections
//     let sections = null;
//     let containerStart = 0;
//     let currentIndex = -1   //to set the index of the current section that the user is at 
//     let sectionPositions = [];

//     function scroll(els){
//         sections = els;
//         //bind position function to scroll event and resize function to resize event
//         d3.select(window)
//             .on('scroll.scroller', 'position')
//             .on('resize.scroller', 'resize')

//         resize();

//         let timer = d3.timer(function(){
//             position();
//             timer.stop();
//         });
//     }

//     //the resize function determines where each of the .step elements are on the page, relative to the top of the first element.
//     //it saves all the coordinates of these elements in the array sectionPositions 
//     function resize(){
//         sectionPositions = [];
//         let startPos;

//         sections.each(function(d,i){
//             let top = this.getBoundingClientRect().top;
//             if(i === 0){
//                 startPos = top;
//             }
//             sectionPositions.push(top-startPos)
//         });
//         containerStart = container.node().getBoundingClientRect().top + window.pageYOffset;

//     }

//     //position function determines where the user is on the page (using window.pageYoffset)
//     function position(){
//         let pos = window.pageYOffset - 10 - containerStart;
//         let sectionIndex = d3.bisect(sectionPositions, pos);
//         sectionIndex = Math.min(sections.size()-1, sectionIndex);

//         if(currentIndex !== sectionIndex){
//             dispatch.call('active', this, sectionIndex);
//             currentIndex = sectionIndex;
//         }

//         let prevIndex = Math.max(sectionIndex-1, 0);
//         let prevTop = sectionPositions[prevIndex];
//         let progress = (pos - prevTop)/(sectionPositions[sectionIndex]-prevTop);
//         dispatch.call('progress', this, currentIndex, progress);
//     }
    
//     scroll.container = function(value){
//         if(arguments.length === 0){
//             return container;
//         }

//         container = value;
//         return scroll;
//     }

//     scroll.on = function(action, callback){
//         dispatch.on(action, callback)
//       };
//       return scroll;
// }
