Object.prototype.select = init;

function init(props) {
  var that = this;
  var defaults = {
    items: props.items ? props.items : [],
    multi: false,
    itemsSelected: [],
    itemsFiltered: [],
    searchText: "",
    placeholder: "No Value",
  };
  this.defaults = defaults;
  //se crea la lista de los items, tomando los ingresados con la inicializacion
  let newItems = [];
  Object.keys(this.defaults.items).map(function (id) {
    let item = that.defaults.items[id];
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
  this.defaults.items = newItems; // se agrega la nueva lista de items al objeto BASE
  this.defaults.itemsFiltered = newItems;
  let select = document.querySelector("select.select"); //se crea contenedor principal para el nuevo select
  let contenedor = document.createElement("div");
  let contenedorInput = document.createElement("div");
  let contenedorItems = document.createElement("div");
  let childSelect = select.cloneNode(true);
  let clasesChild = childSelect.className; //se copian las clases actuales
  let input = document.createElement("input");
  input.value = this.defaults.searchText;
  let span = document.createElement("span");
  let texto = document.createTextNode("keyboard_arrow_down");
  let parentNode = select.parentNode; //se obtiene el parent del select
  // se copia el nuevo select

  let itemsSelected = document.createElement("div");
  let itemsContenedor = document.createElement("div");

  let onFocus = function () {
    console.log("desde focus");
    input.value = "";
    openOptions();
  };
  let onBlur = function () {
    console.log("desde blur");
    closeOptions();
  };
  input.addEventListener("focus", onFocus);
  input.addEventListener("blur", onBlur);
  // span.addEventListener("click", onFocus);
  let onCLickItem = function (id) {
    // console.log(id);
    if (that.defaults.multi == false) {
      that.defaults.itemsSelected[0] = that.defaults.itemsFiltered[id];
    }
    if (that.defaults.itemsSelected.length > 0) {
      if (that.defaults.multi) {
      } else {
        input.value = that.defaults.itemsSelected[0].value;
      }
    }

    closeOptions();
  };

  let onChange = function (e) {
    itemsSelected = [];
    Object.keys(that.defaults.items).map(function (index) {
      var item = that.defaults.items[index];
      var regex = new RegExp("" + e.target.value + "", "g");
      if (regex.test(item.value)) {
        itemsSelected.push(item);
      }
    });
    that.defaults.itemsFiltered = itemsSelected;
    console.log(that.defaults.itemsFiltered);
    renderOptions();
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
  input.addEventListener("keyup", onChange);

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
    input.className = "select-wrapperInput-input NoValue";
    input.setAttribute("type", "text");
    input.placeholder = that.defaults.placeholder;
    contenedorInput.appendChild(input);
    //Input [FINAl]

    //span icono [INICIO]
    span.className = "material-icons action";
    span.appendChild(texto);
    contenedorInput.appendChild(span);
    //span icono [FINAL]

    //contenedor items [INICIO]
    contenedorItems.className = "select-wrapperItems";
    contenedor.appendChild(contenedorItems);
    //contenedor items [FINAL]

    //items [INICIO]

    itemsContenedor.className = "options";
    contenedorItems.appendChild(itemsSelected);
    contenedorItems.appendChild(itemsContenedor);
    renderOptions(false);
    //items [FINAL]

    contenedor.className = clasesChild;
    parentNode.insertBefore(contenedor, select); //se inserta el antes del actual
    select.remove(); // se remueve el componente actual
  }

  function renderOptions(render = true) {
    itemsContenedor.innerHTML = "";
    Object.keys(that.defaults.itemsFiltered).map(function (id) {
      let opcion = that.defaults.itemsFiltered[id];
      let item = document.createElement("div");
      let span = document.createElement("span");
      item.className = "options-option";
      span.appendChild(document.createTextNode(opcion.value));
      item.appendChild(span);
      item.addEventListener("click", onCLickItem.bind(this, id));
      itemsContenedor.appendChild(item);
    });
    if (render) {
      contenedorItems.style.height =
        that.defaults.itemsFiltered.length * 32 + 10 + "px";
    }
  }
  function closeOptions() {
    contenedorItems.className = "select-wrapperItems transition";
    contenedorItems.style = "";

    setTimeout(function () {
      contenedorItems.className = "select-wrapperItems ";
    }, 300);
  }
  function openOptions() {
    contenedorItems.className = "select-wrapperItems active";
    renderOptions();
  }
}
