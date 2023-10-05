<div className="row">
  <div className="col-lg-12 col-md-12 col-12">
    <div className="product-details-content">
      <h5 style={{ color: "#0E1B4D", textTransform: "uppercase" }}>
        {product.product_type}
      </h5>
      <span>
        {" "}
        <Tag style={tagStyle}>{product.availability ? "Stock" : "Sold"}</Tag>
      </span>
      <h1
        style={{
          color: "#0E1B4D",
          fontWeight: 600,
          fontFamily: "Archivo, serif",
          fontSize: 30,
        }}
      >
        {product.name}
      </h1>

      <div style={{ marginTop: 20 }}>
        {product.storage && <StorageButton />}

        {product.ram && <RAMButton />}
        {product.processor && <ProcessorButton />}
      </div>
      <div style={{ marginTop: 15 }}>
        {/* <span style={originalPriceStyle}>
                  &#8358;{formatNumber(Number(product.price) + 10000)}
                </span> */}
        <span
          style={{
            fontSize: 30,
            paddingLeft: 10,
            color: "#0E1B4D",
            fontWeight: 800,
            fontFamily: "Archivo, serif",
          }}
        >
          &#8358;{formatNumber(product.price)}
        </span>{" "}
      </div>
      <div style={{ marginTop: 20 }}>
        <NumberButton />
      </div>
      <div style={{ marginTop: 20 }}>
        {product.availability == 1 ? (
          <>
            <svg width="15" height="15" aria-hidden="true">
              <circle
                cx="7.5"
                cy="7.5"
                r="7.5"
                fill="rgb(62,214,96, 0.3)"
              ></circle>
              <circle
                cx="7.5"
                cy="7.5"
                r="5"
                stroke="rgb(255, 255, 255)"
                stroke-width="1"
                fill="rgb(62,214,96)"
              ></circle>
            </svg>{" "}
            <span style={{ paddingLeft: 10 }}>In Stock</span>
          </>
        ) : (
          <>
            <svg width="15" height="15" aria-hidden="true">
              <circle
                cx="7.5"
                cy="7.5"
                r="7.5"
                fill="rgba(255, 0, 0, 0.3)"
              ></circle>
              <circle
                cx="7.5"
                cy="7.5"
                r="5"
                stroke="rgb(255, 255, 255)"
                stroke-width="1"
                fill="rgba(255, 0, 0, 1)"
              ></circle>
            </svg>{" "}
            <span style={{ paddingLeft: 10 }}>Out Stock</span>
          </>
        )}
      </div>
      <div style={{ marginTop: 20 }}>
        <AddToCart />
      </div>

      <div style={{ marginTop: 20 }}>
        <ViewDetails />
      </div>

      <div style={{ marginTop: 20 }}>
        <BuyNow />
      </div>
    </div>
  </div>
</div>;
