import ProductCategory from "@/components/ProductCategory"
import ProductContainer from "@/components/ProductContainer"

const page = () => {

  return (
    <>
      <div className="sm:flex sm:justify-between">
        <div className="sm:w-1/3">
          <ProductCategory />
        </div>
        <div className="sm:w-2/3">
          <ProductContainer />
        </div>
      </div>
    </>
  )
}

export default page