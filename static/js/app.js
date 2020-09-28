// Creating function for Data plotting (Bar, bubble)
function getPlot(id) {

    // getting data from the json file
    d3.json("data/samples.json").then(function(data) {
      console.log(data)
  
         
      // filter sample values by id 
      var samples = data.samples.filter(s => s.id.toString() === id)[0];
          
      console.log(samples);
    
      // Getting the top 10 
      var samplevalues = samples.sample_values.slice(0, 10).reverse();
    
      // get only top 10 otu ids for the plot OTU and reversing it. 
      var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
      
      // get the otu id's to the desired form for the plot
      var OTU_id = OTU_top.map(d => "OTU " + d)
    
    
      // get the top 10 labels for the plot
      var labels = samples.otu_labels.slice(0, 10);
  
      // Create trace variable for the bar plot
      var trace = {
          x: samplevalues,
          y: OTU_id,
          text: labels,
          type:"bar",
          orientation: "h",
      };
    
      // create data variable
      var data = [trace];
    
      // create layout variable to set plots layout
      var layout = {
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 50,
            t: 100,
            b: 30
        }
      };
      // create the bar plot
      Plotly.newPlot("bar", data, layout);
  
  
      // Create The bubble chart
      var trace1 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
            color: samples.otu_ids,
            size: samples.sample_values
          },
          text: samples.otu_labels
      };
    
      // set the layout for the bubble plot
      var layout_b = {
          xaxis:{
          title: "OTU ID",
        },
        showlegend: false
      };
    
      // creating data variable 
      var data1 = [trace1];
    
      // create the bubble plot
      Plotly.newPlot("bubble", data1, layout_b); 
  
  
    })
  };

 
  // create the function to get the necessary data
  function getInfo(id) {
      // read the json file to get data
      d3.json("data/samples.json").then((data)=> {
          
          // get the metadata info for the demographic panel
          var metadata = data.metadata;
  
          console.log(metadata)
  
          // filter meta data info by id
          var result = metadata.filter(meta => meta.id.toString() === id)[0];
  
          // select demographic panel to put data
          var demographicInfo = d3.select("#sample-metadata");
          
          // empty the demographic info panel each time before getting new id info
          demographicInfo.html("");
  
          // grab the necessary demographic data for the id and append the info to the panel
          Object.entries(result).forEach((key) => {   
                  demographicInfo.append("h6").text(key[0].toLocaleLowerCase() + ": " + key[1] + " \n");    
          });
      });
  }
  
  // create the function for the change event
  function optionChanged(id) {
      getPlot(id);
      getInfo(id);
  }
  
  // create the function for the initial data rendering
  function init() {
      // select dropdown menu 
      var dropdown = d3.select("#selDataset");
  
      // read the data 
      d3.json("data/samples.json").then((data)=> {
          console.log(data)
  
          // get the id data to the dropdwown menu
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          // call the functions to display the data and the plots to the page
          getPlot(data.names[0]);
          getInfo(data.names[0]);

      });
  }
  
  init();