  
// //code for svg

// /*
//  * NOTES
//  * The value arc should probably be "join"ed with data
//  * The arc start and end angles should probably use a scale
//  * The value number display is hardcoded to multiply by 100 and add "%".
//  * Should probably be a number formatter passed in to the gaugeChart function
//  * The whole SVG is twice as tall as necessary. Cut down? Or leave for label?
//  */
// import Chart from 'chart.js';



const gaugeChart = data => { // Move the gaugeChart function outside of the fetch block
    const gaugeChart = o => {
        const viewBox = d3.select(o.selector).attr("viewBox").split(" ");
        const width = viewBox[2];
        const height = viewBox[3];
        const centerX = width / 2;
        const centerY = height / 2;
        const chart = d3.select(o.selector).append("g").attr("transform", `translate(${centerX}, ${centerY})`);
      
        const degToRad = deg => deg * (Math.PI / 180);
        
        if (typeof o.segments !== "undefined") {
          o.segments.forEach(segment => {
            chart.append("path")
              .attr("d", d3.arc()
                .innerRadius(centerY - 10)
                .outerRadius(centerY)
                .startAngle(degToRad(180 * segment.from))
                .endAngle(degToRad(180 * segment.to))
              )
              .attr("transform", "rotate(-90)")
              .attr("fill", segment.color);
          });
        }
      
        chart.append("path")
          .attr("d", d3.arc()
            .innerRadius(centerY - 80)
            .outerRadius(centerY - 20)
            .startAngle(0)
            .endAngle(degToRad(180))
          )
          .attr("transform", "rotate(-90)")
          .attr("fill", "#262626");
        
        const valueColorFromSegments = value => {
          const segment = o.segments.reverse().find(s => o.value >= s.from && o.value < s.to);
          return segment ? segment.color : "#629E51";
        };
        
        const valueColor = o.segments ? valueColorFromSegments(o.value) : "#629E51";
        chart.append("path")
          .attr("d", d3.arc()
            .innerRadius(centerY - 80)
            .outerRadius(centerY - 20)
            .startAngle(0)
            .endAngle(degToRad(180 * o.value))
          )
          .attr("transform", "rotate(-90)")
          .attr("fill", valueColor);
        
        chart.append("text")
          .attr("text-anchor", "middle")
          .attr("fill", valueColor)
          .attr("y", -(height / 12))
          .attr("font-size", 70)
          .text(`${o.value * 100}%`);

          // chart.select('text')
          const textElement = d3.select(o.selector).select('text');
          textElement
          // function for mouseover change but this was causing problems due to rapid flickering issue
          // .on('mouseover', function() {
          //     // Read the total classes from the corresponding data
          //     const index = parseInt(o.selector.replace("#chart", ""));
          //     const totalClasses = data[`attendance${index}`];
          //     // Update the text content to display total classes
          //     d3.select(this).text(totalClasses);
          // })
          // .on('mouseout', function() {
          //     // Reset the text content to display percentage when mouse moves out
          //     d3.select(this).text(`${o.value * 100}%`);
          // });

          // function for onclick only changes the content when clicked on the data rather than mouseover which is not causing the issue 
          .on('click', function() {
            // Read the total classes from the corresponding data
            const index = parseInt(o.selector.replace("#chart", ""));
            const totalClasses = data[`attendance${index}`];
        
            // Toggle between percentage and total classes display
            const currentText = d3.select(this).text();
            const newText = (currentText === `${o.value * 100}%`) ? totalClasses : `${o.value * 100}%`;
            d3.select(this).text(newText); 
          }) 
    };
    

    for (let i = 1; i <= 6; i++) {
      gaugeChart({
          selector: `#chart${i}`,
          value: data[`attendance${i}`] / 100, // Normalize the value between 0 and 1
          segments: [
              { color: "#E03435", from: 0.0, to: 0.7 },
              { color: "#D77728", from: 0.7, to: 0.9 },
              { color: "#629E51", from: 0.9, to: 1.0 }
          ]
      });
  }
gaugeChart(data);

};

//radar chart 'rgba(255, 37, 141, 1)'
var radar = document.getElementById("radar");
var radarConfig = new Chart(radar, {
    type: "radar",
    data: {
        labels: [
            "Ranac",
            "OS",
            "ADSA",
            "DBMS",
            "PC",
            "SE",
        ],
        datasets: [
            {
                label: "Present",
                data: [30, 8, 24, 10, 23, 28],
                backgroundColor: ["rgba(137, 182, 217,0.1)"],
                borderWidth: 1,
                borderColor: "rgba(56, 162, 234, 1)"
            },
            {
                label: "Absent",
                data: [10, 28, 4, 20, 8, 11],
                backgroundColor: ["rgba(255, 100, 132, 0.1)"],
                borderWidth: 1,
                borderColor: "rgba(255, 100, 132, 1)"
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true
    }
});


const jsonData = {
  div1: { details: "Subject 1 details...", moreData: "..." },
  div2: { details: "Subject 2 details...", moreData: "..." },
}

// this 

// const smallDivs = document.querySelectorAll('.small-div'); 
// smallDivs.forEach(div => {
//     div.addEventListener('click', function() {
//         const divId = this.id;  // Get the ID of the clicked div
//         const details = jsonData[divId]; // Fetch corresponding data

//         // Update window_content with the details
//         const windowContent = document.querySelector('.window_content');
//         windowContent.textContent = JSON.stringify(details, null, 2); // Pretty-print JSON
//     });
// });

const smallDivs = document.querySelectorAll('.small-div'); 
smallDivs.forEach(div => {
    div.addEventListener('click', function() {
        const divId = this.id;  
        const details = jsonData[divId]; 

        // Update the span within window_content
        const windowContent = document.querySelector('.window_content');
        const span = windowContent.querySelector('.blink'); 
        span.textContent = JSON.stringify(details, null, 2); 
    });
});
const att_data = {
  subject1: "ranac",
  attendance1: 10,
  totalClasses1: 100,

  subject2: "OS",
  attendance2: 40,
  totalClasses2: 100,

  subject3: "ADSA",
  attendance3: 50,
  totalClasses3: 100,

  subject4: "DBMS",
  attendance4: 90,
  totalClasses4: 100,

  subject5: "PC",
  attendance5: 70,
  totalClasses5: 100,

  subject6: "SE",
  attendance6: 90,
  totalClasses6: 100,
};
gaugeChart(att_data);
