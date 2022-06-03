
export function wrap(text, max_width, lineWidth, textSize=16) {
    let words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        line_number = 0;
    
    // // styling parameters
    const x = text.attr("x"),
          y = text.attr("y");

    let line_height = lineWidth;
    
    // clear text_elements text
    text.text(null);
    
    // append first tspan element (to fill as we build the lines)
    let tspan = text.append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", 0)
        .attr('font-size', textSize);
    
    // loop through all words and make new lines when we exceed our max_width
    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > max_width) {
            line.pop()
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", `${++line_number * line_height}em`)
                .text(word)
                .attr('font-size', textSize);
        }
    }
}