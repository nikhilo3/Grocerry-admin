import { productDetails } from "../../assets/mockData/products";
import InfoCard from "../../components/reusable/InfoCard";
import sadFace from "../../assets/icons/fi-br-sad.svg";
import addCircleIcon from "../../assets/icons/add-circle.svg";
import UnCheckedBox from "../../assets/icons/unchecked-box";
import ThreeDots from "../../assets/icons/three-dots";
import { Link } from "react-router-dom";
import Button from "../../components/reusable/Button";
import SearchInput from "../../components/reusable/SearchInput";
import { useEffect, useState } from "react";
import Dropdown from "../../components/reusable/Dropdown";
import { PRODUCT_CATEGORIES } from "../../assets/data/constants";
import DownloadCSVButton from "../../components/reusable/DownloadCSVButton";
import search from "../../utils/search";
import ActionModal from "../../components/reusable/ActionModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ProductResponseType,
  handleDeleteProduct,
  handleGetAllProducts,
} from "../../api/product";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const ProductsPage = () => {
  const [filteredData, setFilteredData] = useState<ProductResponseType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [queryString, setQueryString] = useState<string>("");
  const [isOutOfStockActive, setIsOutOfStockActive] = useState<boolean>(false);
  const [deletingProduct, setDeletingProduct] = useState({
    isDeleting: false,
    index: null as number | null,
  });
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    index: null as number | null,
  });

  // get all products
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: handleGetAllProducts,
  });

  const queryClient = useQueryClient();

  // delete product
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteProduct,
    onSuccess: (msg) => {
      queryClient
        .invalidateQueries({
          queryKey: ["products"],
        })
        .then(() => {
          setDeletingProduct({ isDeleting: false, index: null });
          toast.success(msg);
        });
    },
    onError: (err: string) => {
      setDeletingProduct({ isDeleting: false, index: null });
      toast.error(err);
    },
  });

  useEffect(() => {
    if (!products) return;
    let data = products;
    if (isOutOfStockActive) {
      data = data.filter((product) => product.quantity < 1);
    }
    if (selectedCategories.length > 0) {
      data = data.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    const searchKeys = ["name", "category", "subCategory"];
    data = search(data, queryString, searchKeys);
    setFilteredData(data);
  }, [selectedCategories, queryString, isOutOfStockActive, products]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-col gap-11 overflow-hidden">
      {/* all product cards */}
      <div className="flex gap-5">
        {productDetails.map((product, index) => (
          <InfoCard key={index} {...product} />
        ))}
      </div>
      {/* product table */}
      <div className="overflow-x-scroll hide-scrollbar min-h-[40vh]  pb-40">
        <div className="border border-accent-200 rounded-[20px] bg-white p-6 flex flex-col gap-6 min-w-[1100px]">
          {/* product top action buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <SearchInput
                placeholder="Search products..."
                onChange={(e) => setQueryString(e.target.value)}
              />
              <Dropdown
                dropdownItems={PRODUCT_CATEGORIES}
                setDropdownItems={setSelectedCategories}
                selectedItems={selectedCategories}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsOutOfStockActive(!isOutOfStockActive)}
                variant="error"
                className="flex items-center justify-center gap-2"
              >
                <span>{!isOutOfStockActive ? "Out of Stock" : "Show all"}</span>
                <img src={sadFace} alt="sad" className="w-[16px] h-[16px]" />
              </Button>
              <DownloadCSVButton data={products!} fileName="products" />
              <Link to="/products/add-a-product">
                <Button className="flex items-center justify-center gap-2">
                  <span>Add Product</span>
                  <img
                    src={addCircleIcon}
                    alt="add product"
                    className="w-[16px] h-[16px]"
                  />
                </Button>
              </Link>
            </div>
          </div>
          {/* products list */}
          <div className="flex flex-col gap-4">
            <div
              className="grid bg-accent-500 rounded-xl p-4 text-accent-50 font-normal"
              style={{
                gridTemplateColumns: "1fr 7fr 5fr 5fr 4fr 1fr",
              }}
            >
              <button>
                <UnCheckedBox className="w-[18px] h-[18px]" />
              </button>
              <span>Product Name</span>
              <span>Category</span>
              <span>Sub Category</span>
              <span>Stock</span>
              <span>Actions</span>
            </div>
            {filteredData.length > 0 ? (
              filteredData.map((product, index) => (
                <div
                  key={index}
                  className="grid even:bg-accent-50 rounded-xl p-4 text-accent-500 font-normal"
                  style={{
                    gridTemplateColumns: "1fr 7fr 5fr 5fr 4fr 1fr",
                  }}
                >
                  <button>
                    <UnCheckedBox className="w-[18px] h-[18px]" />
                  </button>
                  <span className="truncate">{product.name}</span>
                  <span>{product.category}</span>
                  <span>{product.subCategory}</span>
                  <span>{product.quantity ?? 0}</span>

                  <div className="ml-auto relative">
                    <button
                      className="px-3"
                      onClick={() => {
                        setActionModal({ isOpen: true, index });
                      }}
                    >
                      {isPending && deletingProduct.index === index ? (
                        <PulseLoader color="#cdcfd1" size={6} />
                      ) : (
                        <ThreeDots className="w-[18px] h-[18px]" />
                      )}
                    </button>
                    {actionModal.index === index && actionModal.isOpen && (
                      <ActionModal
                        close={() =>
                          setActionModal({ isOpen: false, index: null })
                        }
                        className="flex flex-col items-start"
                      >
                        <Link
                          to={`/products/update/${product.code}`}
                          className="py-3 px-6 font-medium"
                        >
                          View Product
                        </Link>
                        <hr className="w-full" />
                        <button
                          onClick={() => {
                            setDeletingProduct({ isDeleting: true, index });
                            setActionModal({ isOpen: false, index: null });
                            mutate(product.code);
                          }}
                          className="py-3 px-6 font-medium text-error-300"
                        >
                          Delete Product
                        </button>
                      </ActionModal>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-accent-400 text-lg h-44 flex items-center justify-center">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
