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
     title: "RBD/ACE2 Mutation",
     field:"Names",
     responsive: 0,
     widthGrow: 1.4,
     minWidth: 100,
     selectable: false
    },
    {
      title:"HADDOCK",
      field:"HADDOCK",
      description:"HADDOCK scores. Lower scores indicate stronger (better) interactions.",
      responsive: 0,
      widthGrow: 0.9,
      minWidth: 50
    },
    {
      title:"FoldX",
      field:"FoldX",
      description:"FoldX scores. Lower scores indicate stronger (better) interactions.",
      responsive: 0,
      widthGrow: 0.6,
      minWidth: 50
    },
    {
      title:"FoldXwater",
      field:"FoldXwater",
      description:"FoldXwater scores. Lower scores indicate stronger (better) interactions.",
      responsive: 0,
      widthGrow: 0.9,
      minWidth: 50
    },
    {
      title:"EvoEF1",
      field:"EvoEF1",
      description:"Evoef1 scores. Lower scores indicate stronger (better) interactions.",
      responsive: 0,
      widthGrow: 0.6,
      minWidth: 50
    },
    {
      title:"MutaBind2",
      field:"MutaBind2",
      description:"Mutabind2 scores. Lower scores indicate stronger (better) interactions.",
      responsive: 0,
      widthGrow: 0.9,
      minWidth: 50
    },
    {
      title:"SSIPe",
      field:"SSIPe",
      description:"SSPIe scores. Lower scores indicate stronger (better) interactions.",
      responsive: 0,
      widthGrow: 0.8,
      minWidth: 50
    },
,
  ],

  // Layout
  layout:"fitColumns",
  resizableColumns: false,
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
