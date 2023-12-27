// import { CategoriesContext} from '../../contexts/categories.context'
import { useContext} from 'react'
import { useSelector } from 'react-redux'
import CategoryPreview from '../../components/category-preview/category-preview'
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector'
import Spinner from '../../components/spinner/spinner'

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    // const { categoriesMap } = useContext(CategoriesContext)
    return (
        <>
        {isLoading ? (
            <Spinner/>
        ) : (// Object.keys(categoriesMap) is an array of keys/titles
            Object.keys(categoriesMap).map((title) => {
                const  products = categoriesMap[title]

                return (<CategoryPreview key={title} title={title} products={products}/>)
            }))
            
        }
                
           
        </>
        
    )
}

export default CategoriesPreview