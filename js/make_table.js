let getTooltip = function(column){
  let d = column.getDefinition().description;
  if (d) {
    return d
  }

  return false
}


table = new Tabulator("#models-table", {

  // Data
  ajaxURL: "models/models.json",
  //ajaxURL: "https://drive.google.com/file/d/1DwWqp38A_26vrN92SoAJ8aR8zhhSonek/view?usp=sharing",
  ajaxContentType: "json",
  //ajaxConfig:"POST",
  ajaxResponse: function(url, params, response){
    return response;
  },

  // Formatting
  columns: [
    { 
     title: "Mutation Position",
     field:"Names",
     responsive: 0,
     minWidth: 100,
     selectable: false
    },
    {
      title:"HADDOCK",
      field:"HADDOCK",
      description:"HADDOCK score. Lower scores indicate stronger interactions.",
      responsive: 0,
      minWidth: 100
    },
    {
      title:"FoldX",
      field:"FoldX",
      description:"Foldx score. Lower scores indicate stronger interactions.",
      responsive: 0,
      minWidth: 100
    },
    {
      title:"FoldXwater",
      field:"FoldXwater",
      description:"Foldxwater score. Lower scores indicate stronger interactions.",
      responsive: 0,
      minWidth: 100
    },
    {
      title:"EvoEF1",
      field:"EvoEF1",
      description:"Evoef1 score. Lower scores indicate stronger interactions.",
      responsive: 0,
      minWidth: 100
    },
    {
      title:"MutaBind2",
      field:"MutaBind2",
      description:"Mutabind2 score. Lower scores indicate stronger interactions.",
      responsive: 0,
      minWidth: 100
    },
    {
      title:"SSIPe",
      field:"SSIPe",
      description:"SSPIe score. Lower scores indicate stronger interactions..",
      responsive: 0,
      minWidth: 100
    },
,
  ],

  // Layout
  layout:"fitColumns",
  resizableColumns: true,
  selectable: false,
  columnHeaderVertAlign: "bottom", //align header contents to bottom of cell
  responsiveLayout: "hide",
  

  tooltipsHeader: getTooltip,
  // pagination: "local",
  // paginationSize: 10,  // model per page.

    // Callbacks
/*  rowSelected:function(row, column){
   
   var cell = row.getCell(column);
   let modelname = row.getData().Names
   alert(modelname)
   alert(cell)
   const myArray = modelname.split("-");
   let pdbname =  myArray[1] + "_ " + cell + ".pdb"
   let pdburl = "models/" + modelname + "/" + pdbname;
    
   loadMolecule(stage, pdburl)
  },
 */
/*   rowDeselected: function (row, column){

    var cell = row.getCell(column);
    let modelname = row.getData().Names
    alert(cell)
    alert(modelname)
    const myArray = modelname.split("-");
    let pdbname = myArray[1] + "_ " + cell + ".pdb"
    let pdburl = "models/" + modelname + "/" + pdbname;

    removeMolecule(stage, pdburl)
  }, */


   cellClick: function (e, cell) {
  
    var columnname = cell.getColumn().getField()
    var rowname = cell.getRow().getData().Names
    // alert(`The cell has a value of:${row.getData().Names}${column.getField()}${cell.getValue()}`); //display the cells value
    //alert(`The cell has a value of:${rowname}${columnname}${cell.getValue()}`); //display the cells value
  
    let myArray = rowname.split("_");
    let modelname = rowname.replace("_", "-")
    let pdbname = `${myArray[1]}_${columnname}.pdb` 
    let pdburl = `models/${modelname}/${pdbname}`
    cell.getElement().style.backgroundColor = "#e68a00";
    //alert(`The cell has a url of:${pdburl}`); //display the cells refer a url
     loadMolecule(stage, pdburl)

  
  },

  cellContext: function (e, cell) {

    var columnname = cell.getColumn().getField()
    var rowname = cell.getRow().getData().Names
   
    let myArray = rowname.split("_");
    let modelname = rowname.replace("_", "-")
    let pdbname = `${myArray[1]}_${columnname}.pdb`
    let pdburl = `models/${modelname}/${pdbname}`
    cell.getElement().style.backgroundColor = "#FFFFFF";
    //alert(`The cell has a url of:${pdburl}`); //display the cells refer a url
    removeMolecule(stage, pdburl)


  },
  
/*   rowClick: function (e, row) {
    var data = row.getData(); //get data object for row

    var cells = row.getCells();

    alert("cell clicked - " + data + cells);

  }, */

});
<!doctype html>
<html lang="en">
  <head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://unpkg.com/tabulator-tables@4.6.2/dist/css/bootstrap/tabulator_bootstrap4.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/main.css">

    <script type="text/javascript" src="https://unpkg.com/tabulator-tables@4.6.2/dist/js/tabulator.min.js"></script>
    <script src="js/lib/ngl.js"></script>
    <script src="js/globals.js"></script>

    <title>ACE2:RBD Models</title>
  </head>
  <body>

  <div class="container-lg p-0 mb-2" style="height: 5%">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <a href="#" class="navbar-brand mr-3">Models of SARS-CoV-2 RBD:ACE2 variants</a>
        <div class="collapse navbar-collapse">
          <div class="navbar-nav ml-auto">
              <a href="https://github.com/RBD-ACE2-MutBench/RBD-ACE2-MutBench.github.io/tree/main/models" class="nav-item nav-link active">Download dataset</a>
          </div>
        </div>
    </nav>
  </div>    
  <div class='container-lg' style="height: 80%">
    <div class="row border border-info d-block" style="height: 50%;">
      <div id='viewer' style="width: 100%; height: 100%"></div>
    </div>
    <div class="row d-block">
      <a href="#" class="btn btn-sm btn-light active" role="button" aria-pressed="true" id='refe-toggler' onclick="toggleReference();">Hide Reference</a>
      <a href="#" class="btn btn-sm btn-light active" role="button" aria-pressed="true" id='muta-toggler' onclick="toggleMutations();">Highlight Mutations</a>
      <a href="#" class="btn btn-sm btn-light active" role="button" aria-pressed="true" id='cont-toggler' onclick="toggleContacts();">Show Contacts</a>
      <a class="btn btn-sm btn-light active" role="button" aria-pressed="true" data-toggle="modal" data-target="#help-modal">Show Help</a>
    </div>
    <div class="row d-block mt-3" style="height: 50%;">
      <div id='models-table' class="border border-info" style="height: 100%;"></div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="help-modal" tabindex="-1" role="dialog" aria-labelledby="help-modal-label" aria-hidden="true" >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="help-modal-label"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          SARS-CoV-2 infection cycle is initiated upon binding of Receptor Binding Domain (RBD) of SARS-CoV-2 Spike protein to the host Angiotensin Converting Enzyme 2 (ACE2) enzyme. 
          Therefore, understanding how the interface of RBD and ACE2 complex is changing upon a mutation on RBD or ACE2 has been of great interest to the biology community. For this, we benchmarked the prediction capacity of well-known structure-based binding affinity predictors: HADDOCK, FoldX, EvoEF1, SSIPe, and MutaBind2.
          <br>
          The mutation information is given on the first column of the table. For example, for RBD_N501Y mutation, N501 of RBD is mutated to Y.
          All predictor scores and the corresponding models are given in each cell respectively.
          The scores represent how strongly the proteins are predicted to interact, where a lower score means a stronger interaction.
          Since all predictors have different scoring functions, each predictor can be compared only within itself.
          On the model screen, ACE2 is shown in light blue, while S is shown in orange. 
          Reference is the crystal structure of RBD and ACE2 complex (pdb id: 6M0J). 
          <br> 
          To show or hide reference, please click on “Show Reference/Hide Reference”. To highlight the mutation positions, please click on “Highlight Mutations”.
          To show the chemical interactions between the atoms of the models, please click on “Show Contacts”.         
          <br>
          <br>
          Note: to deselect the model please use the right click.
          <br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    <script src="js/make_table.js"></script>
    <script src="js/nglviewer.js"></script>
  </body>
</html>

