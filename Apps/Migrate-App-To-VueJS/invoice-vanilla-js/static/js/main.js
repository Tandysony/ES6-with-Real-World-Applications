// variables
const invoice = document.querySelector(".invoice-box");
const addRow = document.querySelector(".btn-add-row");
const items = document.querySelectorAll(".item");

// listeners
loadEventListeners();

function loadEventListeners() {
  invoice.addEventListener("keyup", calculateTotals);
  invoice.addEventListener("mouseup", calculateTotals);

  addRow.addEventListener("click", addNewRow);
}

// functions
function calculateTotals(e) {
  e.preventDefault();

  if (e.target.type === "number") {
    // console.log([...items]); // convert NodeList to Array
    const subtotals = [...items].map(item => calculateSubTotals(item));
    const total = subtotals.reduce((cal, cur) => cal + cur, 0);
    console.log(total);
    document.querySelector(".total td:last-child").textContent =
      "Total: $" + total.toFixed(2);
  }
}

function calculateSubTotals(row) {
  const inputs = row.querySelectorAll("input");
  const subtotal = inputs[1].value * inputs[2].value;
  row.querySelector("td:last-child").textContent = "$" + subtotal;
  return subtotal;
}

// Add new item
function addNewRow() {
  const newItem = `<tr class="item">
                <td>
                    <input value="Undefined item" />
                </td>

                <td>
                    $
                    <input type="number" min="0" value="0" />
                </td>

                <td>
                    <input type="number" min="0" value="1" />
                </td>

                <td>
                    $0.00
                </td>
            </tr>
  `;
  addRow.parentNode.parentElement.insertAdjacentHTML("beforebegin", newItem);
}
