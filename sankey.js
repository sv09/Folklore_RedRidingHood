import { textWrap } from "./helperMethods/textWrapSankey.js";

// const sankeyWidth = 900;
// const sankeyHeight = 700;

export function sankeyViz(){
    const margin = {top: 20, right: 10, bottom: 40, left: 10};
    var sankeyWidth = document.body.clientWidth/1.5;
    var sankeyHeight = window.innerHeight - margin.bottom;

    let legendSvg = d3.select("#sankey")
                                .append("svg")
                                .attr("width", sankeyWidth + margin.left + margin.right)
                                .attr("height", 100)
                                .append("g")
                                .attr("transform", "translate(" + (margin.left + margin.right) + "," + margin.top + ")");

    const svg = d3.select("#sankey")
                        .append("svg")
                        .attr("width", sankeyWidth + margin.left + margin.right)
                        .attr("height", sankeyHeight + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    d3.csv("./data/SankeyData.csv")
        .then(data => {
            var leftSide = ["SPECIES OF THE VICTIM : Animal", "NUMBER OF VICTIM : Single", "SPECIES OF THE VILLAIN : Wolf", "THE GUARDIAN : Mother", "THE RELATIVE : Grandmother", "THE VILLAIN’S DISGUISE : Disguises as the guardian"];
            var rightSide = ["SPECIES OF THE VICTIM : Human", "NUMBER OF VICTIM : Multiple", "SPECIES OF THE VILLAIN : Other (Tiger, Lion, Ogre, Fox, Hyena, Alligator)", "THE GUARDIAN: Other (Father, Brother, Grandmother)", "THE RELATIVE : Other (Aunt/Uncle, Godfather, Mother, Son)", "THE VILLAIN’S DISGUISE : Disguises as the relative"]

            function array_move(arr, old_index, new_index) {
                if (new_index >= arr.length) {
                    var k = new_index - arr.length + 1;
                    while (k--) {
                        arr.push(undefined);
                    }
                }
                arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                return arr; // for testing
            };


            let graph = {"nodes": [], "links": []}

            const sankeyData = _.map(data, d => {
                return {
                    "source": leftSide.includes(d.feature)? d.feature : d.categoryName,
                    "target": leftSide.includes(d.feature)? d.categoryName : d.feature,
                    // "featurePos": +d.varPos,
                    // "categoryPos": +d.categoryPos
                }          
            });

            sankeyData.push({
                        "source": "Aesop's Fables",
                        "target": "",
                        // "featurePos": "",
                        // "categoryPos": 1
                    }
                )

            //rearrange the positions of some features
            array_move(sankeyData, 173, 123)
            array_move(sankeyData, 79, 11)


            //create an array of unique category names
            const unique = (value, index, self) => {
                return self.indexOf(value) === index
            }
            const categoryName = [];
            _.map(data, d => {
                categoryName.push(d.categoryName);
            });
            let categoryNameUniq = categoryName.filter(unique)


            //get data in nodes and links format
            _.map(sankeyData, (d,i) => {
                graph.nodes.push({"name": d.source}),
                graph.nodes.push({"name": d.target}),
                graph.links.push({"source": d.source,
                                "target": d.target,
                                //   "featurePos": +d.featurePos,
                                //   "categoryPos": +d.categoryPos,
                                "value": 1
                                })
            });

            //replace nodes array with only unique values
            graph.nodes = _.chain(graph.nodes)
                        .map('name')
                        .uniq()
                        .value()


            // loop through each link replacing the text with its index from node
            graph.links.forEach((d,i) => {
                graph.links[i].source = graph.nodes.indexOf(graph.links[i].source)
                graph.links[i].target = graph.nodes.indexOf(graph.links[i].target)
            })

            graph.nodes.forEach((node,i) => {
                graph.nodes[i] = { "name": node }
            })

            //assigning each node a group
            _.map(graph.nodes, (d,i) => {
                let val = d.name
                if(leftSide.includes(d.name) || d.name === undefined){
                    graph.nodes[i] = ({"node-group":"left", "name": val, "pos": leftSide.indexOf(d.name)});
                }else if(categoryNameUniq.includes(d.name)){
                    graph.nodes[i] = ({"node-group":"middle", "name": val, "pos": categoryNameUniq.indexOf(d.name)});
                }else{
                    graph.nodes[i] = ({"node-group":"right", "name": val, "pos": rightSide.indexOf(d.name)});
                }                 
            });

            var sankey = d3.sankey()
                        .size([sankeyWidth/1.7, sankeyHeight])
                        .nodeWidth(20)
                        .nodePadding(10)
                        .iterations(0)

            sankey(graph)


            const color = d3.scaleOrdinal()
                            .range(["#ff8dbc", "#ffc300", "#ff5733", "#c70039", "#392a85"])
                            .domain(["Aesop's Fables", "Wolf & the kids", "African Tales", "Red Riding Hood", "Tiger Grandmother"])


            //LINKS

            const linkColor = (d) => {
                if(d.target.name){
                    if(d.source["node-group"] === "middle"){
                        return color(d.source.name)
                    }else{
                        return color(d.target.name)
                    }
                }else{
                    return "none"
                }
            }

            var link = svg.append('g')
                .attr('class', 'links')
                .selectAll('g');

            link = link
                    .data(graph.links)
                    .enter()
                    .append('path')
                    .attr('d', d3.sankeyLinkHorizontal())
                    // .attr('stroke-width', (d) => Math.max(1, d.width))
                    .attr("fill", "none")
                    .attr("stroke-width", 1.8)
                    .attr("stroke", d => linkColor(d)) 
                    .attr("transform", `translate(${sankeyWidth/6.35    }, 0)`)


            //NODES         

            let nodes = svg
                    .append("g")
                    .classed("nodes", true)
                    .selectAll("rect");

            nodes = nodes
                    .data(graph.nodes)
                    .enter()
                    .append("rect")
                    // .classed("node", true)
                    .attr("x", d => d.x0)
                    .attr("y", d => d.y0)
                    .attr("width", d => d.x1 - d.x0 + 8)
                    .attr("height", d => d["node-group"] === "middle"? d.y1 - d.y0 : 5)
                    .attr("fill", d => categoryNameUniq.includes(d.name) ? color(d.name) : 'none' )
                    .attr("opacity", 1)
                    .attr("transform", `translate(${sankeyWidth/6.4}, 0)`)
            
                    
            //TEXT

            const textColor = "3c3c3c";

            let txt = svg.append("g")
                        .classed("nodes-text", true)
                        .selectAll("text")
                        .data(graph.nodes)
                        .enter()
                        .append("text")
                        .attr("x", d => d["node-group"] === "right"? d.x0 + (d.x0/3.5) : d.x0 - 5)
                        .attr("y", d => d.y0 + ((d.y1 - d.y0)/2))
                        .attr("fill", textColor)
                        .text(d => d["node-group"] !== "middle" ? d.name : '')
                        .call(textWrap)

            //LEGEND

            let xPos = _.range(sankeyWidth/15 , sankeyWidth/15+800, 160);

            let legend = legendSvg.append("g")
                            .attr("class", "color-legend")
                            .selectAll("rect")

            legend
                .data(categoryNameUniq) //graph.nodes
                .enter()
                .append("rect")
                .attr("x", (d,i) => xPos[i])
                .attr("y", margin.top) //d => (d.y0[0])
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", d => color(d))

            let legendText = legendSvg.append("g")
                                .selectAll(".color-legend")
                                .data(categoryNameUniq)
                                .enter()
                                .append("text")
                                .attr("x", (d,i) => xPos[i]-xPos[0]/1.5)
                                .attr("y", margin.top - margin.top/2) //d => (d.y0[0])
                                .text(d => d)

    });
}

// sankeyViz()