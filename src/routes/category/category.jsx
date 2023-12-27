import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import {CategoryContainer, Title} from './category.styles';
import Spinner from '../../components/spinner/spinner';

const Category = () => {
  const { category } = useParams()
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
  const [products, setProducts] = useState(categoriesMap[category])
  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])
  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      {
        isLoading ? (<Spinner/> 
        ): (
          <CategoryContainer>
            
            {
              products && products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
          </CategoryContainer>
        )
      }
      
    </>
    
  );
}

export default Category;
