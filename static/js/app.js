// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const boyzinthesink=data.metadata;

    // Filter the metadata for the object with the desired sample number
    const lunt=boyzinthesink.filter(gourd => gourd.id==sample)[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    const cucurbitaceae = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    cucurbitaceae.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(lunt).forEach(([key, value])=> {
      cucurbitaceae.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const tastetest= samples.find(obj=> obj.id === sample);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids=tastetest.otu_ids;
    let otu_labels=tastetest.otu_labels;
    let sample_values=tastetest.sample_values;

    // Build a Bubble Chart
    let scrubadubdub= [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker:{ 
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];

    // Render the Bubble Chart
    let vinegar = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      margin: { t:0 },
      hovermode: "closest"
    };
    Plotly.newPlot("bubble", scrubadubdub, vinegar);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks=otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let mojito=[{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      mode: "markers",
      orientation:"h"
    }];
    
    // Render the Bar Chart
    let muddler={
      title: "Top 10 Bacteria Cultures Found",
      margin: { t:30, l: 150 },
    };
    Plotly.newPlot("bar", mojito, muddler);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const boyz= data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let picker=d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    boyz.forEach((sample)=> {
      picker.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list
    let larry= boyz[0];

    // Build charts and metadata panel with the first sample
    buildCharts(larry);
    buildMetadata(larry);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
