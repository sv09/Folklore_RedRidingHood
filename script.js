import { display } from './folkloreSections.js';
import { sankeyViz } from './sankey.js';

function render() {
    var props = {
        "width": document.body.clientWidth/2.5,
        "height": window.innerHeight
    }
    display(props);
    sankeyViz();
}

render();
window.addEventListener('resize', render);