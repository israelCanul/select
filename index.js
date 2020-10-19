Object.prototype.select = init;

function init(props) {
  var defaults = {
    items: props.items ? props.items : [],
    multi: false,
    itemsSelected: [],
  };
  //se crea la lista de los items, tomando los ingresados con la inicializacion
  let newItems = [];
  Object.keys(defaults.items).map(function (id) {
    let item = defaults.items[id];
    let newItem = {};
    if (typeof item === "object") {
      console.log("Este es un objeto, aun no se implementa su parseo");
      /****
       * futura implementacion para liste de objetos
       */
    }
    //se crea el item de acuerdo a objetos string
    if (typeof item === "string") {
      newItem["value"] = item;
      newItem["selected"] = false;
      newItems.push(newItem);
    }
  });
  defaults.items = newItems; // se agrega la nueva lista de items al objeto BASE

  let select = document.querySelector("select.select"); //se crea contenedor principal para el nuevo select
  let contenedor = document.createElement("div");
  let contenedorInput = document.createElement("div");
  let contenedorItems = document.createElement("div");
  let childSelect = select.cloneNode(true);
  let clasesChild = childSelect.className; //se copian las clases actuales
  let input = document.createElement("input");
  let span = document.createElement("span");
  let texto = document.createTextNode("keyboard_arrow_down");
  let parentNode = select.parentNode; //se obtiene el parent del select
  // se copia el nuevo select

  let onFocus = function () {
    console.log("desde focus");
  };
  let onBlur = function () {
    console.log("desde blur");
  };
  input.addEventListener("focus", onFocus);
  input.addEventListener("blur", onBlur);

  let onCLickItem = function (id) {
    console.log(id);
  };
  /*****
   *
   *
   *
   *
   *
   */
  //renderizado de items en el dom
  createItems();
  function createItems() {
    //select clonado [INICIO]
    childSelect.className = "select-select"; //se agrega la clase correspodiente al select
    contenedor.appendChild(childSelect);
    //select clonado [FINAL]
    //contenedor Input [INICIO]
    contenedorInput = document.createElement("div");
    contenedorInput.className = "select-wrapperInput";
    contenedor.appendChild(contenedorInput);
    //contenedor Input [FINAL]

    //Input [INICIO]
    input.className = "select-wrapperInput-input";
    input.setAttribute("type", "text");
    contenedorInput.appendChild(input);
    //Input [FINAl]

    //span icono [INICIO]
    span.className = "material-icons";
    span.appendChild(texto);
    contenedorInput.appendChild(span);
    //span icono [FINAL]

    //contenedor items [INICIO]
    contenedorItems.className = "select-wrapperItems";
    contenedor.appendChild(contenedorItems);
    //contenedor items [FINAL]

    //items [INICIO]

    let itemsSelected = document.createElement("div");
    let itemsContenedor = document.createElement("div");
    itemsContenedor.className = "options";
    contenedorItems.appendChild(itemsSelected);
    contenedorItems.appendChild(itemsContenedor);

    Object.keys(defaults.items).map(function (id) {
      let opcion = defaults.items[id];
      let item = document.createElement("div");
      let span = document.createElement("span");
      item.className = "options-option";
      span.appendChild(document.createTextNode(opcion.value));
      item.appendChild(span);
      item.addEventListener("click", onCLickItem.bind(this, id));
      itemsContenedor.appendChild(item);
    });
    //items [FINAL]

    contenedor.className = clasesChild;
    parentNode.insertBefore(contenedor, select); //se inserta el antes del actual
    select.remove(); // se remueve el componente actual
  }
}
