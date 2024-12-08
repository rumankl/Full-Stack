import { useParams } from "react-router"
import { useGetProductsQuery } from "../product/productApi";
import { base } from "../../data/apis";

const SearchPage = () => {
  const { search } = useParams();
  const { isLoading, isError, error, data } = useGetProductsQuery(search);
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>{error.data.message}</h1>
  }
  return (
    <div>

      {data && data.products.length > 0 ? (
        <div className="p-4 grid grid-cols-3">

          {data.products.map((product) => {
            return (
              <div key={product._id}>
                <h1>{product.title}</h1>
                <img src={`${base}/${product.image}`} alt="" />
              </div>
            )
          })}

        </div>
      )
        : <div>
          <p>There are no movies that matched your query.</p>

        </div>

      }
    </div>
  )
}
export default SearchPage