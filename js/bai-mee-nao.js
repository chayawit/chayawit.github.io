const newQuantity = (plusButton) => {
  const quantity = document.createElement("input");
  quantity.setAttribute("type", "number");
  quantity.setAttribute("name", "quantity");
  quantity.setAttribute("min", "0");
  quantity.setAttribute("placeholder", "Hao Big");
  quantity.setAttribute("class", "extra");
  plusButton.parentNode.insertBefore(quantity, plusButton);
};

const newRow = () => {
  const price = document.createElement("input");
  price.setAttribute("type", "number");
  price.setAttribute("name", "price");
  price.setAttribute("min", "0");
  price.setAttribute("placeholder", "Hao Chib");
  
  const quantity = document.createElement("input");
  quantity.setAttribute("type", "number");
  quantity.setAttribute("name", "quantity");
  quantity.setAttribute("min", "0");
  quantity.setAttribute("placeholder", "Hao Big");
  
  const plus = document.createElement("input");
  plus.setAttribute("type", "button");
  plus.setAttribute("onclick", "newQuantity(this)");
  plus.setAttribute("value", "+");
  plus.setAttribute("class", "btn btn-primary");
  
  const items = document.getElementById("items");
  const item = document.createElement("div");
  item.classList.add("item");
  item.classList.add(items.childElementCount);
  item.classList.add("extra");
  item.appendChild(price);
  item.appendChild(quantity);
  item.appendChild(plus);

  items.appendChild(item);
};

const compare = () => {
  let winner = -1;
  let bestValue = 0;
  const valueArr = [];
  
  $('.item').each(function(i, e) {
    let quantity = 0;
    $('.item.' + i + ' > [name="quantity"]').each(function(i, e) {
      let subQuantity = e.value;
      if (subQuantity > 0) {
        if (quantity === 0) {
          quantity = subQuantity;
        } else {
          quantity *= subQuantity;          
        }
      }
    });
    if (quantity !== 0) {
      const value = quantity / $('.item.' + i + ' > [name="price"]')[0].value;
      valueArr.push([i, value]);
      if (value > bestValue) {
        winner = i;
        bestValue = value;
      }
    }
  });
  
  if (winner === -1) {
    $('#result').text('Not enough information.');
  } else {
    $('#result').text('The winner is item ' + (winner + 1) + ". Bai Yid Nao!");
    $('#detailedResults').text('');
    valueArr.forEach(([item, value]) => {
      let detailedResults = '';
      if (winner !== item) {
        const percent = (bestValue - value) * 100 / value;
        detailedResults += parseFloat(percent.toFixed(2)) + "% more value than item " + (item + 1);
        $('#detailedResults').append("<p>" + detailedResults + "</p>");
      }
    });
  }
};

const confirm_reset = () => {
  const result = confirm("Are you sure you want to reset?");
  
  if (result === true) {
    $('.extra').remove();
    $('#result').text('');
    $('#detailedResults').text('');
  }
  
  return result;
};
