import React from "react";
import CategorySlider from "/app/categories/CategorySlider";

// Renders the flash-sale slider at the top of a product list.
// (Social links now live in the footer for a cleaner, aligned layout.)
const SocialIconMenu = ({ flash_sale }) => {
  if (!flash_sale) return null;

  return (
    <CategorySlider sale_type={"flash sales"} />
  );
};

export default SocialIconMenu;
