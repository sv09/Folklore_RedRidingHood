// import { sankey as Sankey } from "d3-sankey";

const sankeyWidth = 800;
const sankeyHeight = 700;
const margin = {top: 20, right: 10, bottom: 40, left: 10};

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

        let graph = {"nodes": [], "links": []}

        const sankeyData = _.map(data, d => {
            return {
                "source": leftSide.includes(d.feature)? d.feature : d.categoryName,
                "target": leftSide.includes(d.feature)? d.categoryName : d.feature,
                "featurePos": +d.varPos,
                "categoryPos": +d.categoryPos
            }          
        });

        sankeyData.push({
                    "source": "Aesop's Fables",
                    "target": "",
                    "featurePos": "",
                    "categoryPos": 1
                })

        // console.log(sankeyData)

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

        // console.log(graph)


        // loop through each link replacing the text with its index from node
        graph.links.forEach((d,i) => {
            graph.links[i].source = graph.nodes.indexOf(graph.links[i].source)
            graph.links[i].target = graph.nodes.indexOf(graph.links[i].target)
        })

        graph.nodes.forEach((node,i) => {
            graph.nodes[i] = { "name": node }
        })


        _.map(graph.nodes, (d,i) => {
            let val = d.name
            if(leftSide.includes(d.name)){
                graph.nodes[i] = ({"node-group":"left", "name": val, "pos": leftSide.indexOf(d.name)});
            }else if(categoryNameUniq.includes(d.name)){
                graph.nodes[i] = ({"node-group":"middle", "name": val, "pos": categoryNameUniq.indexOf(d.name)});
            }else{ //if(!categoryNameUniq.includes(d.name)){
                graph.nodes[i] = ({"node-group":"right", "name": val, "pos": rightSide.indexOf(d.name)});
            }                 
        });

        var sankey = d3.sankey()
                    .size([sankeyWidth/1.5, sankeyHeight]) //+margin.left+margin.right    +margin.top+margin.bottom
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
                .attr("stroke", d => linkColor(d)) //return color(d.source.name)  d.target.name?console.log(true):console.log(false)
                .attr("transform", `translate(${sankeyWidth/1.1}, 0)`)


        //NODES         

        const NodeAlign = d3.scaleOrdinal()
        .range([10, 20, 30]) //(sankeyWidth-(2*margin.right))
        .domain(["left", "middle", "right"])

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
                .attr("width", d => d.x1 - d.x0 + 10)
                .attr("height", d => d["node-group"] === "middle"? d.y1 - d.y0 : 5)
                .attr("fill", d => categoryNameUniq.includes(d.name) ? color(d.name) : 'none' )
                .attr("opacity", 1)
                .attr("transform", `translate(${sankeyWidth/1.1}, 0)`)
                // .attr('transform', d => { return `translate(${NodeAlign(d["node-group"])}, 0)`}) 
        
                
        //TEXT

        const textColor = "3c3c3c";

        const textWrap = (text) => {
            const textSize = 14;
            text.each(function() {
                var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                firstLineWord = '',
                nextLineWord,
                nextLine = [],
                firstLine = [],
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);

                if(words.length !== 1){
                while(firstLineWord !== ":"){
                    firstLineWord = words.pop()
                    firstLine.push(firstLineWord);
                    tspan.text(firstLine.join(" "));
                }

                while(nextLineWord = words.pop()){
                    nextLine.push(nextLineWord);
                }
                nextLine = nextLine.join(" ");
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", `${++lineNumber * lineHeight}em`)
                            .text(nextLine)
                            .attr('font-size', textSize);
                }
            })
        }

        let txt = svg.append("g")
                    .classed("nodes-text", true)
                    .selectAll("text")
                    .data(graph.nodes)
                    .enter()
                    .append("text")
                    .attr("x", d => d.x0)
                    .attr("y", d => d.y0)
                    .attr("fill", textColor)
                    .text(d => d["node-group"] !== "middle" ? d.name : '')
                    .call(textWrap)
});

