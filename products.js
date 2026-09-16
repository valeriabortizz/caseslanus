// Catálogo de ejemplo. Reemplazar precios/nombres/fotos por los reales.
// compat: lista de modelos ("11".."16") o ["all"] si sirve para todos.

const LIGHTNING = ["11", "12", "13", "14"];
const USBC = ["15", "16"];
const ALL_MODELS = ["11", "12", "13", "14", "15", "16"];

const PRODUCTS = {

  cargadores: [
    { title: "Cargador de pared 20W USB-C", compat: ["all"], price: 8500, icon: "⚡" },
    { title: "Cable Lightning a USB-C (1m)", compat: LIGHTNING, price: 4500, icon: "⚡" },
    { title: "Cable USB-C a USB-C (1m)", compat: USBC, price: 4500, icon: "⚡" },
    { title: "Cargador inalámbrico MagSafe", compat: ["12", "13", "14", "15", "16"], price: 12000, icon: "⚡" },
    { title: "Cargador para auto doble USB", compat: ["all"], price: 7000, icon: "⚡" },
    { title: "Power bank 10.000mAh", compat: ["all"], price: 15000, icon: "⚡" },
  ],

  auriculares: [
    { title: "Auriculares TWS estilo AirPods", compat: ["all"], price: 9000, icon: "🎧" },
    { title: "Auriculares Bluetooth over-ear", compat: ["all"], price: 16000, icon: "🎧" },
    { title: "Manos libres con cable Lightning", compat: LIGHTNING, price: 5000, icon: "🎧" },
    { title: "Manos libres con cable USB-C", compat: USBC, price: 5000, icon: "🎧" },
    { title: "Estuche de carga para TWS", compat: ["all"], price: 3500, icon: "🎧" },
  ],

  vidrios: [
    { title: "Vidrio templado pantalla", compat: ["11"], price: 3000, icon: "▭" },
    { title: "Vidrio templado pantalla", compat: ["12"], price: 3000, icon: "▭" },
    { title: "Vidrio templado pantalla", compat: ["13"], price: 3000, icon: "▭" },
    { title: "Vidrio templado pantalla", compat: ["14"], price: 3200, icon: "▭" },
    { title: "Vidrio templado pantalla", compat: ["15"], price: 3500, icon: "▭" },
    { title: "Vidrio templado pantalla", compat: ["16"], price: 3800, icon: "▭" },
    { title: "Vidrio para cámara trasera", compat: ["all"], price: 2500, icon: "▭" },
  ],

  accesorios: [
    { title: "Funda de silicona", compat: ["11"], price: 6000, icon: "◧" },
    { title: "Funda de silicona", compat: ["12"], price: 6000, icon: "◧" },
    { title: "Funda de silicona", compat: ["13"], price: 6000, icon: "◧" },
    { title: "Funda de silicona", compat: ["14"], price: 6500, icon: "◧" },
    { title: "Funda de silicona", compat: ["15"], price: 7000, icon: "◧" },
    { title: "Funda de silicona", compat: ["16"], price: 7500, icon: "◧" },
    { title: "Soporte de auto magnético", compat: ["12", "13", "14", "15", "16"], price: 8000, icon: "◧" },
    { title: "PopSocket / agarre para celular", compat: ["all"], price: 3000, icon: "◧" },
    { title: "Llavero magnético MagSafe", compat: ["12", "13", "14", "15", "16"], price: 4000, icon: "◧" },
  ],
};
