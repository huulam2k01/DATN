import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom';
import ReactPaginate from "react-paginate";
import { Link, useHistory } from "react-router-dom";
import img_icon_location from "./image_icon/location.png";

function Items({ currentItems }) {
  const history = useHistory();
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const NewsDeitail = (id) => {
    history.push(`/${id}`);
  };
  return (
    <div className="row">
      {currentItems &&
        currentItems.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-xl-4" key={index}>
            <div className="Card wow fadeInUp" data-wow-delay="0.3s">
              <div className="cardhome">
                <img className="card-img" src={item.img_avatar} alt="Card" />
                <div className="cardhome__tym">
                  <span>Lưu</span>
                </div>
                <div className="cardhome__price">
                  <span>
                    {formatNumber(item.infor.price)
                      ? formatNumber(item.infor.price) + " VND"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="taghome">
                <Link
                  className="Link-detail-news"
                  onClick={() => NewsDeitail(item.id)}
                  id={item._id}
                  to={`trang-chu/thong-tin-chi-tiet/${item._id}`}
                >
                  {item.infor.title}
                </Link>
                <div className="taghome-location">
                  <img src={img_icon_location} alt="icon_location" />
                  <span> {item.address.address_detail}</span>
                </div>
              </div>
            </div>
          </div>
        ))}{" "}
    </div>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactPaginate
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
export default PaginatedItems;
