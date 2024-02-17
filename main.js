const getProducts = async (page) => {
  console.log(page); // Page Number
  const skip = (page - 1) * 10;

  const response = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${skip}`
  );
  const data = await response.json();
  return data;
};

const displayData = async (page = 1) => {
  const data = await getProducts(page);
  const products = data.products;
  const numberOfPages = data.total / data.limit;
  const result = products
    .map(
      (product) =>
        `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card" style="width: 18rem;">
            <img src="${product.thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">See More</a>
            </div>
        </div>

        </div>

        `
    )
    .join("");

  document.querySelector(".products .row").innerHTML = result;

  /* --- PAGINATION --- */
  let PAGINATIONLINK = "";
  if (page == 1) {
    PAGINATIONLINK = `
        <li class="page-item"><button class="page-link disabled" href="#">Previous</button></li>
        `;
  } else {
    PAGINATIONLINK = `
        <li class="page-item"><button onclick=displayData('${
          parseInt(page) - 1
        }') class="page-link" href="#">Previous</button></li>
        `;
  }

  for (let i = 1; i <= numberOfPages; i++) {
    if (i == page) {
      PAGINATIONLINK += ` <li class="page-item"><button onclick=displayData('${i}') class="page-link active" >${i}</button></li>`;
    } else {
      PAGINATIONLINK += ` <li class="page-item"><button onclick=displayData('${i}') class="page-link " >${i}</button></li>`;
    }
  }

  if (page == numberOfPages) {
    PAGINATIONLINK += `   <li class="page-item"><button   class="page-link disabled" >Next</button></li>`;
  } else {
    PAGINATIONLINK += `   <li class="page-item"><button  onclick=displayData('${
      parseInt(page) + 1
    }') class="page-link" >Next</button></li>`;
  }

  document.querySelector(".pagination").innerHTML = PAGINATIONLINK;
};

displayData();
