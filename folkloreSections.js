import { scroller } from './scroller.js';
import { wrap } from './helperMethods/textWrapStory.js';

// const ScrollViz = () => {
export function ScrollViz(props){
    console.log(props)
    var { width, height } = props;  //width = 600, //height = 670;
    var margin = {top: 10, right: 20, bottom: 40, left: 10};

    height = height - margin.bottom;

    //current index and last index that was active
    var lastIndex = -1;
    var activeIndex = 0;

    //define svg
    let container = d3.select("#chart");
    // var svg = container.selectAll("svg").data([null]);
    // svg = svg.enter().append("svg")
    //         .merge(svg)

    let svg = container.append("svg")
                .attr("width", width*1.667 + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var activateFunctions = [];
    var updateFunctions = [];

    var chart = (selection) => {
        setupVis();
        setupSections();
    }

    const setupVis = () => {
        const color = '#d81b1b'

        const firstCenturyPath = [
            [
                'M 0,0',
                `L 0,${height/15}`
            ]
        ]

        const africanTalesPath = [
            [
                'M 0,0',
                `L 0,${height/8}`,
                `M 0,${height/10}`,
                `L -65,${height/10}`,
                `Q -70,${height/10} -70,${height/9.5}`,
                `L -70,${height/7}`
            ]
        ]

        const tenthCenturyPath = [
            [
                'M 0,0',
                `L 0,${height/13}`,
                `Q 0,${height/12} -5,${height/12}`,
                `L -${width/4},${height/12}`, // -170,
                `Q -${width/3.5},${height/12} -${width/3.5},${height/9}`,
                `L -${width/3.5},${height/4.2}`,
                `L -${width/2.8},${height/4.2}`, //-220,
                `Q -${width/2.7},${height/4.2} -${width/2.7},${height/4}`,
                `L -${width/2.7},${height/3.5}`
            ]
        ]

        const eleventhCenturyPath = [
            [
                'M 0,0',
                `L ${width/10},0`, //150
                `Q ${width/8.2},0 ${width/8.2},${height/30}`, //136
                `L ${width/8.2},${height/10}`       //136
            ]
        ]

        const twelftFourteenthCenturyPath = [
            [
                'M 0,0',
                `L ${height/16}, 0`,
                `Q ${height/13.5},0 ${height/13.5},${height/40}`,
                `L ${height/13.5},${height/8}`
            ]
        ]

        const twelftFourteenthCenturyPath2 = [
            [
                `M 0,0`,
                `L 0,${height/13}`,
                `Q 0,${height/11.2} ${width/30},${height/11.2}`,
                `L ${width/4},${height/11.2}`,
                `Q ${width/3.5},${height/11.2} ${width/3.5},${height/7}`,
                `L ${width/3.5},${height/2.5}`,

                `M -${width/6},${height/3}`,
                `L ${width/5},${height/3}`,
                `Q ${width/4.5},${height/3}, ${width/4.5},${height/2.8}`,
                `L ${width/4.5},${height/2.5}`
            ]
        ]

        const fifteenthCenturyPath = [
            [
                'M 0,0',
                `L -70, 0`,
                `Q -75,0 -75,5`,
                `L -75,${height/20}` 
            ]
        ]

        const fifteenthCenturyPath2 = [
            [
                `M 0,0`,
                `L ${width/19},0`,
                `Q ${width/18},0 ${width/18},${height/20}`,
                `L ${width/18},${height/12}`
            ]
        ]

        const seventeenthCenturyPath = [
            [
                `M 0,0`,
                `L ${height/20},0`,
                `Q ${height/18},0 ${height/18},${height/80}`,
                `L ${height/18},${height/15}`,

            ]
        ]

        const eighteenthCenturyPath = [
            [
                'M 0,0',
                `L ${width/4.5},0`,
                `M ${width/9},0`,
                `L ${width/9},${height/5}`
            ]
        ]

        const nineteenthCenturyPath = [
            [
                'M 0,0',
                `L 0,${width/10}`
            ]
        ]
        
        //specs
        const textX = 0,
            textY = 0,
            translateX = width + 5*margin.left + 5*margin.right,
            translateY = height/5.5,
            textWrapWidth = 200,
            lineHeight = 1.5,
            textSize = 16,
            opacityBefore = 0,
            strokeWidth = 2,
            circleX = 0,
            circleY = 0,
            circleRadius = 5,
            textAlign = "middle",
            aesopColor = "#ff8dbc",
            wkColor = "#ffc300",
            afrColor = "#ff5733",
            rrhColor = "#c70039",
            tgColor = "#392a85"

        //AESOP'S AND WOLF & THE KIDS
        svg.append('path')
            .attr('class', 'pre-first-century')
            .attr('d', firstCenturyPath)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth)
            .attr('transform', `translate(${width/2}, ${margin.top + margin.bottom})`)
            .attr('opacity', opacityBefore)

        //Aesop's Fables
        svg.append('circle')
            .attr('class', 'pre-first-century')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('fill', aesopColor)
            .attr('transform', `translate(${width/2}, ${height/18})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'pre-first-century')
            .text("Aesop's Fables")
            .attr('x', textX)
            .attr('y', textY)
            .attr('transform', `translate(${width/2.38}, ${margin.top})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'pre-first-century-story')
            .text("The goat kid avoids being eaten by heeding the mother's instruction not to open the door, or seeks further proof of the wolf's identity before turning him away.")
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .attr('fill', aesopColor)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)

        //Wolf & the Kids
        svg.append('circle')
            .attr('class', 'first-century')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('transform', `translate(${width/2}, ${height/6.6})`)
            .attr('fill', wkColor)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'first-century')
            .text("Wolf & the kids")
            .attr('x', textX)
            .attr('y', textY)
            .attr('transform', `translate(${width/2.38}, ${height/5.5})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'first-century-story')
            .text("A nanny goat warns her kids not to open the door while she is out in the fields, but is overheard by a wolf. When she leaves, the wolf impersonates her and tricks the kids into letting him in, whereupon he devours them.")
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .attr('fill', wkColor)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)

        svg.append('text')
            .text("MIDDLE EAST")
            .attr('class', 'first-century-loc')
            .attr('transform', `translate(${width/1.5}, ${height/5.5})`)
            .attr('opacity', opacityBefore)

        //AFRICAN TALES
        svg.append('path')
            .attr('class', 'african-tales')
            .attr('d', africanTalesPath)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth)
            .attr('stroke-dasharray', ('5,5'))
            .attr('transform', `translate(${width/2}, ${height/5})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'african-tales')
            .text("African Tales")
            .attr('x', textX)
            .attr('y', textY)
            .attr('transform', `translate(${width/1.9}, ${height/3})`)
            .attr('opacity', opacityBefore)

        //African tales
        svg.append('circle')
            .attr('class', 'african-tales')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('fill', afrColor)
            .attr('transform', `translate(${width/2 }, ${height/3})`)
            .attr('opacity', opacityBefore)
        
        const txt = "Some African tales evolved to resemble Red Riding Hood *";
        const txtWidth = 120; 
        const txtSize = 14;
        const lineHght = 1.1;
        svg.append('text')
            .attr('class', 'african-tales')
            .text(txt)
            .attr('transform', `translate(${width/3.2}, ${height/2.8})`)
            .attr('x', textX)
            .attr('y', textY)
            .attr('font-size', txtSize)
            .attr('opacity', opacityBefore)
            .call(wrap, txtWidth, lineHght, txtSize)

        svg.append('text')
            .attr('class', 'african-tales-story')
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .text("Tells of a girl who is attacked by an ogre after he imitates the voice of her brother. In some cases, the victim is cut out of the ogre's belly alive")
            .attr('fill', afrColor)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)


        //CATERINELLA
        svg.append('path')
            .attr('class', 'tenth-century')
            .attr('d', tenthCenturyPath)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth)
            .attr('transform', `translate(${width/2.12}, ${height/5})`)
            .attr('opacity', opacityBefore)
        
        //Catterinella
        svg.append('circle')
            .attr('class', 'tenth-century')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('fill', rrhColor)
            .attr('transform', `translate(${width/10}, ${height/2})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'tenth-century')
            .text("Catterinella")
            .attr('transform', `translate(${width/19}, ${height/1.88})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'tenth-century-story')
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .text("Catterinella takes a basket of cakes to her aunt/uncle, who turns out to be a witch or werewolf. On the way there, she eats the cakes and replaces them with donkey dung. When the aunt/uncle discovers her deception, (s)he comes to her house at night and devours her in bed.")
            .attr('fill', rrhColor)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)

        const CatTxt = "Diverged roughly after 1000 years, to form tales of Red Riding Hood *";
        const CatTxtWidth = 150; 
        // const txtSize = 14;
        // const lineHght = 1.1;
        svg.append('text')
            .attr('class', 'tenth-century')
            .text(CatTxt)
            .attr('transform', `translate(${width/8}, ${height/4.5})`)
            .attr('x', textX)
            .attr('y', textY)
            .attr('font-size', txtSize)
            .attr('opacity', opacityBefore)
            .call(wrap, CatTxtWidth, lineHght, txtSize)

        //LIEGE POEM
        svg.append('path')
            .attr('class', 'eleventh-century')
            .attr('d', eleventhCenturyPath)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth)
            .attr('transform', `translate(${width/5.5}, ${height/2.282})`)
            .attr('opacity', opacityBefore)

        //A poem in Liege
        svg.append('circle')
            .attr('class', 'eleventh-century')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('fill', rrhColor)
            .attr('transform', `translate(${width/3.3}, ${height/1.82})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'eleventh-century')
            .text("A Poem in Liege")
            .attr('transform', `translate(${width/4.2}, ${height/1.73})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'eleventh-century-story')
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .text("A girl who wanders into the woods wearing a red baptism tunic given to her by her godfather. She encounters a wolf, who takes her back to its lair, but the girl manages to escape by taming the wolf's cubs.")
            .attr('fill', rrhColor)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)
        //- In parts of Western Europe


        //WOLF & THE KIDS AND RED RIDING HOOD TALES REACH EAST ASIA
        svg.append('path') //extension from a poem in liege
            .attr('class', 'twelfth-century')
            .attr('d', twelftFourteenthCenturyPath)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth-1)
            .attr('transform', `translate(${width/3.3}, ${height/1.95})`)
            .attr('opacity', opacityBefore)  

        svg.append('text')
            .text("EAST ASIA")
            .attr('class', 'twelfth-century-loc')
            .attr('transform', `translate(${width/1.16}, ${height/1.65})`)
            .attr('opacity', opacityBefore)

        //Path for stories travelling to East Asia
        svg.append('path') //both dash lines
            .attr('class', 'twelfth-century')
            .attr('d', twelftFourteenthCenturyPath2)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth)
            .attr('stroke-dasharray', ('5,5'))
            .attr('transform', `translate(${width/1.8}, ${height/5})`)
            .attr('opacity', opacityBefore)

        
        //STORY OF GRANDMOTHER
        svg.append('path')
            .attr('class', 'fifteenth-century')
            .attr('d', fifteenthCenturyPath) //main
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth)
            .attr('transform', `translate(${width/2.65}, ${height/1.57})`)
            .attr('opacity', opacityBefore)

        //story of grandmother
        svg.append('circle')
            .attr('class', 'fifteenth-century')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('fill', rrhColor)
            .attr('transform', `translate(${width/3.93}, ${height/1.43})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'fifteenth-century')
            .text("Story of Grandmother")
            .attr('x', textX)
            .attr('y', textY)
            .attr('transform', `translate(${width/5}, ${height/1.36})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'fifteenth-century-story')
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .text("The girl lacks her characteristic red hood and nickname, and manages to outwit the wolf before he can eat her: After finally seeing through the villain's disguise, the girl asks to go outside to the toilet. The wolf reluctantly agrees, but ties a rope to her ankle to prevent her from escaping. When she gets out, the girl cuts the rope, ties the end to a tree, and flees into the woods before the villain realises his mistake.")
            .attr('fill', rrhColor)
            .attr('text-anchor', textAlign)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)

        svg.append('text')
            .text("FRANCE, AUSTRIA, AND NORTHERN ITALY")
            .attr('class', 'fifteenth-century-loc')
            .attr('transform', `translate(${width/10}, ${height/1.3})`)
            .attr('opacity', opacityBefore) 

        //extension from the story of grandmother
        svg.append('path')
            .attr('class', 'fifteenth-century')
            .attr('d', fifteenthCenturyPath2)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth-1)
            .attr('transform', `translate(${width/2.65}, ${height/1.57})`)
            .attr('opacity', opacityBefore)

        
        //CHARLES PERRAULT'S VERSION
        svg.append('path')
            .attr('class', 'seventeenth-century')
            .attr('d', seventeenthCenturyPath)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth)
            .attr('transform', `translate(${width/2.3}, ${height/1.42})`)
            .attr('opacity', opacityBefore)

        //Charles Perrault's 
        svg.append('circle')
            .attr('class', 'seventeenth-century')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('fill', rrhColor)
            .attr('transform', `translate(${width/2.01}, ${height/1.28})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'seventeenth-century')
            .text("Charles Perrault's Version")
            .attr('x', textX)
            .attr('y', textY)
            .attr('transform', `translate(${width/2.55}, ${height/1.23})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'seventeenth-century-story')
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .text("A girl wearing her red hooded cape/cloak walks through the woods to deliver food to her sickly grandmother. A Big Bad Wolf wants to eat the girl and the food in the basket, he approaches her, who naively tells him where she is going. He goes to the grandmother's house and swallows the grandmother whole. When the girl arrives, she notices that her grandmother looks very strange, and asks her questions about it, 'What a big mouth you have', 'The better to eat you with!', responds the wolf, at which point the wolf jumps out of the bed and eats her, too.")
            .attr('fill', rrhColor)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)

        svg.append('text')
            .text("FRANCE")
            .attr('class', 'seventeenth-century-loc')
            .attr('transform', `translate(${width/4.2}, ${height/1.23})`)
            .attr('opacity', opacityBefore) 


        //HYBRID FORMED IN ASIA
        svg.append('path') // T-shape
            .attr('class', 'eighteenth-century')
            .attr('d', eighteenthCenturyPath)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth/2)
            .attr('transform', `translate(${width/1.44}, ${height/1.63})`)
            .attr('opacity', opacityBefore)

        //tiger grandmother
        svg.append('circle')
            .attr('class', 'eighteenth-century')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('fill', tgColor)
            .attr('transform', `translate(${width/1.242}, ${height/1.21})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'eighteenth-century')
            .text("The Tiger Grandmother")
            .attr('x', textX)
            .attr('y', textY)
            .attr('transform', `translate(${width/1.45}, ${height/1.17})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'eighteenth-century-story')
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .text("A group of siblings spend the night in bed with a tiger or monster who poses as their grandmother. When the children hear the sound of their youngest sibling being eaten, they trick the villain into letting them outside to go to the toilet, where, like the heroine of The Story of Grandmother, they manage to escape.")
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .attr('fill', tgColor)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)

        //GRIMMS' BROTHERS
        svg.append('path')
            .attr('class', 'nineteenth-century')
            .attr('d', nineteenthCenturyPath)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth)
            .attr('transform', `translate(${width/2.03}, ${height/1.21})`)
            .attr('opacity', opacityBefore)

        //grimms'
        svg.append('circle')
            .attr('class', 'nineteenth-century')
            .attr('r', circleRadius)
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('fill', rrhColor)
            .attr('transform', `translate(${width/2.03}, ${height/1.07})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'nineteenth-century')
            .attr('x', textX)
            .attr('y', textY)
            .text("Grimms' Fairy Tales")
            .attr('transform', `translate(${width/2.6}, ${height/1.035})`)
            .attr('opacity', opacityBefore)

        svg.append('text')
            .attr('class', 'nineteenth-century-story')
            .attr('x', textX)
            .attr('y', textY)
            .attr('text-anchor', textAlign)
            .attr('transform', `translate(${translateX}, ${translateY})`)
            .text("The version written by brothers Grimm follows directly from the Perrault's version. However, in Grimms', and other traditional German versions, a hunter comes to rescue little red and her grandmother.")
            .attr('fill', rrhColor)
            .attr('opacity', opacityBefore)
            .call(wrap, textWrapWidth, lineHeight, textSize)

        svg.append('text')
            .text("GERMANY")
            .attr('class', 'nineteenth-century-loc')
            .attr('transform', `translate(${width/5}, ${height/1.03})`)
            .attr('opacity', opacityBefore)
    }
    

    const setupSections = function () {
        // activateFunctions are called each
        // time the active section changes
        activateFunctions[0] = preFirstCentury;
        activateFunctions[1] = firstCentury;
        activateFunctions[2] = AfricanTales;
        activateFunctions[3] = tenthCentury;
        activateFunctions[4] = eleventhCentury;
        activateFunctions[5] = twelfthFourteenthCentury;
        activateFunctions[6] = fifteenthCentury;
        activateFunctions[7] = seventeenthCentury;
        activateFunctions[8] = eighteenthCentury;
        activateFunctions[9] = nineteenthCentury;


        // updateFunctions are called while
        // in a particular section to update
        // the scroll progress in that section.
        // Most sections do not need to be updated
        // for all scrolling and so are set to
        // no-op functions.
        for (var i = 0; i < 10; i++) {
            updateFunctions[i] = function () {};
        }
    }

    //specs
    const pathTransitionDuration = 2500,
        txtTransitionDuration = 1000,
        opacityBefore =  0,
        opacityAfter = 0.3,
        opacityShow = 1,
        locOpacity = 0.2,
        locOpacityAfter = 0.08;

    function preFirstCentury(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.first-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
    }

    function firstCentury() {
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.first-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacity)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
    }

    function AfricanTales(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.first-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacityAfter)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
    }

    function tenthCentury(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
    }

    function eleventhCentury(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
    }

    function twelfthFourteenthCentury(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.twelfth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacity)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
            
        svg.selectAll('.fifteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
    
    }

    function fifteenthCentury(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.twelfth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacityAfter)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.fifteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacity)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
        
    }

    function seventeenthCentury(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.fifteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacityAfter)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacity)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
    }

    function eighteenthCentury(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacityAfter)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
        
        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)
    }

    function nineteenthCentury(){
        svg.selectAll('.pre-first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter);

        svg.selectAll('.pre-first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore);

        svg.selectAll('.first-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.first-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.african-tales')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.african-tales-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.tenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.tenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eleventh-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.eleventh-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.twelfth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.fifteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.fifteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.seventeenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.seventeenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.eighteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityAfter)

        svg.selectAll('.eighteenth-century-story')
            .transition()
            .duration(txtTransitionDuration)
            .attr('opacity', opacityBefore)

        svg.selectAll('.nineteenth-century')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.nineteenth-century-story')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', opacityShow)

        svg.selectAll('.nineteenth-century-loc')
            .transition()
            .duration(pathTransitionDuration)
            .attr('opacity', locOpacity)

    }


    chart.activate = function (index) {
        activeIndex = index;
        var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
        var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
        scrolledSections.forEach(function (i) {
          activateFunctions[i]();
        });
        lastIndex = activeIndex;
    };

    chart.update = function (index, progress) {
        updateFunctions[index](progress);
    };

    // return chart function
    return chart;
};

// const display = (data) => {
export function display(props){
    var plot = ScrollViz(props);

    d3.select('#chart')
        .call(plot);

    var scroll = scroller()
                    .container(d3.select('#chart'))

    //pass the sections
    scroll(d3.selectAll('.step'));

    //setup event handling
    //active
    scroll.on('active', (index) => {
        d3.select('.step')
            .style('opacity', (d,i) => { return i === index? 1: 0.1 })

        //activate current section
        plot.activate(index);
    })
    //progress
    scroll.on('progress', (index, progress) => {
        plot.update(index, progress);
    });

}

// d3.json('./data/treeData.json')
//     .then(data => { display(data) });

