import { Box } from "@mui/material";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Histogram = ({data, width, height, xAxisLabel, yAxisLabel, xTicks, yTicks}) => {
    console.log(data.length);
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('overflow', 'visible')
            .style('margine-top', '4rem');

        const x = d3.scaleBand()
            .domain(Math.min.apply(Math, data.map(entry => entry[0])), Math.max.apply(Math, data.map(entry => entry[0])))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([Math.min.apply(Math, data.map(entry => entry[1])), Math.max.apply(Math, data.map(entry => entry[1]))])
            .range([height, 0]);

        const xAxis = d3.axisBottom(x)
            .ticks((xTicks === undefined) ? 10 : xTicks);
        
        const yAxis = d3.axisLeft(y)
            .ticks((yTicks === undefined) ? 10 : yTicks);

        svg.append('g')
            .call(xAxis)
            .attr('transform', 'translate(0, '+ height +')');

        if(xAxisLabel !== undefined)
            svg.append('text')
                .attr('x', width/2)
                .attr('y', height + 50)
                .text(xAxisLabel);

        if(yAxisLabel !== undefined)
            svg.append('text')
                .attr('y', height/2)
                .attr('x', -50)
                .text(yAxisLabel);

        svg.append('g').call(yAxis);

        svg.selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('x', (entry) => x(entry[0]))
            .attr('y', entry => y(entry[1]))
            .attr('width', x.bandwidth())
            .attr('height', entry => height - y(entry[1]));
    }, [data]);

    return(
        <Box>
            <svg ref={svgRef}/>
        </Box>
    );
}

export default Histogram;