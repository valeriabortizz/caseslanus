// compat: lista de modelos ("11".."17") o ["all"] si sirve para todos.

const LIGHTNING = ["11", "12", "13", "14"];
const USBC = ["15", "16", "17"];
const ALL_MODELS = ["11", "12", "13", "14", "15", "16", "17"];

const PRODUCTS = {

  cargadores: [
    {
      title: "Combo cargador 20W + cable + AirPods",
      compat: ["all"],
      price: 17000,
      image: "assets/cargadores/combo-cargador-airpods.jpg",
    },
    {
      title: "Cable USB-C a Lightning (1m)",
      compat: LIGHTNING,
      price: 7000,
      note: "2 x $6.000 c/u",
      image: "assets/cargadores/cable-usbc-lightning.jpg",
    },
  ],

  auriculares: [
    {
      title: "EarPods con conector Lightning",
      compat: LIGHTNING,
      price: 14000,
      image: "assets/auriculares/earpods-lightning.jpg",
    },
  ],

  vidrios: [],

  accesorios: [],
};
