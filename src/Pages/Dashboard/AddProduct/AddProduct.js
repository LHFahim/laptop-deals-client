import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const resalePrice = form.resalePrice.value;
    const used = form.used.value;
    const location = form.location.value;
    const option = form.option.value;
    const img = form.img.value;
    const seller = form.seller.value;
    const seller_email = form.seller_email.value;

    const product = {
      name,
      img,
      resalePrice,
      used,
      location,
      category_id: option,
      seller,
      seller_email,
    };

    fetch("https://buy-sell-server-sooty.vercel.app/add_products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Product added");
          navigate("/dashboard/myproducts");
        } else {
          toast.error(data.message);
        }
      });

    console.log(product);
  };
  return (
    <div className="p-5">
      <h3 className="text-lg font-bold m-3">Add a Product</h3>
      {/* ---- */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 mt-4">
        <input
          name="name"
          type="text"
          placeholder="Product name"
          className="input w-full input-bordered"
        />
        <input
          name="resalePrice"
          type="text"
          placeholder="Price in USD"
          className="input w-full input-bordered"
        />
        <input
          name="used"
          type="text"
          placeholder="Used for"
          className="input w-full input-bordered"
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          className="input w-full input-bordered"
        />
        <select
          name="option"
          className="select select-bordered w-full mt-2 uppercase"
        >
          <option value={"01"}>apple</option>
          <option value={"02"}>asus</option>
          <option value={"03"}>dell</option>
        </select>
        <input
          name="img"
          type="url"
          placeholder="Image Link"
          required
          className="input w-full input-bordered"
        />
        <input
          name="seller"
          type="text"
          disabled
          placeholder="Your Name"
          defaultValue={user?.displayName}
          className="input w-full input-bordered"
        />
        <input
          name="seller_email"
          type="email"
          defaultValue={user?.email}
          disabled
          className="input w-full input-bordered"
        />
        <br />
        <input className="btn btn-accent w-full" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddProduct;
