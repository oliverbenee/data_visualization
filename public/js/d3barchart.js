// Sourced from THIS tutorial: https://blog.logrocket.com/data-visualization-d3-js-node-js/
import * as d3 from "https://cdn.skypack.dev/d3@7";
import axios from 'https://cdn.skypack.dev/axios';

// Fetch data from API. 
const dataSet = async function getData() {
    return await axios.get('/api/data');
}

async function drawChart() {
    const data = await dataSet(); // get data to present
    const svgWidth = 500; // set svg height and width
    const svgHeight = 500;
    const barPadding = 5; // add padding
    const barWidth = svgWidth / data.data.length;

    let svg = d3.select("svg"); // find svg tag in html.
    let width = svg // set size of svg element.
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    svg
        .selectAll("rect")
        .data(data.data) // visualize the data
        .enter() // iterate over the data and create an svg element.
            .append("rect")
            // Set y-axis to height of SVG, minus data item. This prevents bars from being inverted. 
            .attr("y", (d) => svgHeight - d)
            .attr("height", (d) => d)
            .attr("width", () => barWidth - barPadding)
            // seperate bars in bar chart
            .attr("transform", (d, i) => {
                let translate = [barWidth * i, 0];
                return `translate(${translate})`;
            })
            // Styling. 
            .style("fill", "steelblue");
}
drawChart();