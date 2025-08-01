import settings from "./settings";
import { header } from "./header";
import { authService } from "./response";

export function getProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/products`, requestOptions).then(
    authService.handleResponse
  );
}

export function getSearchProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}search/products`, requestOptions).then(
    authService.handleResponse
  );
}

export function getAllSearchProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}searchall/products`, requestOptions).then(
    authService.handleResponse
  );
}

export function verifyUser(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}verify/user`, requestOptions).then(
    authService.handleResponse
  );
}

export function getQuickSearch(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}quick_search`, requestOptions).then(
    authService.handleResponse
  );
}

export function getCategoryProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}shop/products`, requestOptions).then(
    authService.handleResponse
  );
}

export function getLaptopProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}laptop_products`, requestOptions).then(
    authService.handleResponse
  );
}

export function getReferrers(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}referrer/codes`, requestOptions).then(
    authService.handleResponse
  );
}

export function getTrendingProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}products/trending`, requestOptions).then(
    authService.handleResponse
  );
}

export function getCarousels(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}carousels`, requestOptions).then(
    authService.handleResponse
  );
}

export function getBrands(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/brands`, requestOptions).then(
    authService.handleResponse
  );
}

export function getAllCategories(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/allcategories`, requestOptions).then(
    authService.handleResponse
  );

  /* 
  https://hayzeeonline.com/api/user/allcategories

  request
    -token
    -search
    -rows

  responses:
  categories = [{},{}];


  */
}

export function getAllCats(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/allcats`, requestOptions).then(
    authService.handleResponse
  );
}

export function getAllBlogs(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/allblogs`, requestOptions).then(
    authService.handleResponse
  );
}

export function getAllBrands(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/allbrands`, requestOptions).then(
    authService.handleResponse
  );
}

export function getCategories(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/categories`, requestOptions).then(
    authService.handleResponse
  );
}

export function getOtherSales(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}other_sales`, requestOptions).then(
    authService.handleResponse
  );
}

export function getSideCategories(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}sidecategories`, requestOptions).then(
    authService.handleResponse
  );
}

export function getShop(data) {
  const requestOptions = {
    method: "POST",
    headers: header(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}shops`, requestOptions).then(
    authService.handleResponse
  );
}

export function getProduct(id) {
  const requestOptions = {
    method: "GET",
    headers: header(),
  };
  return fetch(`${settings.API_URL}singleproduct/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function getBlog(id) {
  const requestOptions = {
    method: "GET",
    headers: header(),
  };
  return fetch(`${settings.API_URL}blog/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function getProductImages(id) {
  const requestOptions = {
    method: "POST",
    headers: header(),
  };
  return fetch(
    `${settings.API_URL}user/product/images/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function getRelatedProduct(id) {
  const requestOptions = {
    method: "POST",
    headers: header(),
  };
  return fetch(
    `${settings.API_URL}related/products/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function getProductInfos(id) {
  const requestOptions = {
    method: "POST",
    headers: header(),
  };
  return fetch(`${settings.API_URL}product/infos/${id}`, requestOptions).then(
    authService.handleResponse
  );
}
