
export function textWrap(text){
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