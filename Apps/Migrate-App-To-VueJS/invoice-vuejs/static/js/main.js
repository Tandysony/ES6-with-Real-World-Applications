const app = new Vue({
  el: "table",

  data: {
    items: [
      { description: "Website design", quantity: 1, price: 300 },
      { description: "Hosting (3 months)", quantity: 1, price: 75 },
      { description: "Domain name (1 year)", quantity: 1, price: 10 }
    ],
    tax: 5
  },

  methods: {
    addRow() {
      this.items.push({
        description: "",
        quantity: 1,
        price: 0
      });
    }
  },

  computed: {
    // calculate sub-total
    subtotal() {
      return this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    // calculate total
    total() {
      return (
        this.items.reduce((acc, item) => acc + item.price * item.quantity, 0) *
        (1 + this.tax / 100)
      );
    }
  },

  filters: {
    currency(value) {
      return value.toFixed(2);
    }
  }
});
