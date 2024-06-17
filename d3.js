//fetch data
const req =  new XMLHttpRequest;
req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", true);
req.send()
req.onload = () => {
    const json = JSON.parse(req.responseText)
    const dataset = json.data;
    const w = 1000
    const h = 600
    const p = 60;
    const xScale = d3.scaleLinear()
                  .domain([0, dataset.length - 1])
                  .range([p, w - p])
    const yScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (d) => {
                     return d[1]
                  })])
                  .range([h - p, p])
    const dates = dataset.map((d) => {
      return new Date(d[0])
    })
    const heightBar = d3.scaleLinear()
                      .domain([0, d3.max(dataset, (d) => {
                        return d[1]
                      })])
                      .range([0, h - (2*p)])
    const xAxisScale = d3.scaleTime()
                    .domain([d3.min(dates), d3.max(dates)])
                    .range([p, w - p])
    const xAxis = d3.axisBottom(xAxisScale)
    const yAxis = d3.axisLeft(yScale)
    const svg = d3.select("body")
                  .append("svg")
                  .attr("class", "container")
                  .attr("width", w)
                  .attr("height", h)
                  .attr("paddding", p)
                  .style("background-color", "white")
            svg.selectAll("rect")
                  .data(dataset)
                  .enter()
                  .append("rect")
                  .attr("class", "bar")
                  .attr("fill", "skyblue")
                  .attr("data-gdp", (d) => {return d[1]})
                  .attr("data-date", (d) => {return d[0]})
                  .attr("x", (d, i) => {
                     return xScale(i)
                  })
                  .attr("y", (d) => {
                     return yScale(d[1])
                  })
                  .attr("width", (w - (2 * p)) / dataset.length)
                  .attr("height", (d) => {
                     return heightBar(d[1])
                  })
                  .append("title")
                  .text((d) => {
                     return d[0] + "," + " " + "$" + d[1] + " " + "Bilions"
                  })
            svg.append("g")
               .attr("id", "x-axis")
               .attr("transform", "translate(0, " + (h - p) + ")")
               .call(xAxis)
            svg.append("g")
               .attr("id", "y-axis")
               .attr("transform", "translate("+ p +", 0)")
               .call(yAxis)
            
  }
