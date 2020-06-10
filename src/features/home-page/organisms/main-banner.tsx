import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { SexId } from '../../../types'
import { Button1 } from '../../../commons/atoms'
import { SelectCategory , SearchBrands } from '../molecules'
import { useEffectSafe } from '../../../hooks/use-effect-safe'
import { encodeProductsUrl } from '../../../lib'


export function MainBanner({ sexId }: { sexId: SexId }) {
  const [sex_id, setSexId] = useState(sexId)
  const [ categories, setCategories ] = useState<Array<number>>([])
  const [brands, setBrands] = useState<Array<string>>([])
  
  useEffectSafe(() => { setSexId(sexId) }, [sexId])
  const urlSearchSale = useMemo(() => encodeProductsUrl({ sex_id, categories, brands }), [sex_id, categories, brands])
  
  return (
    <S.Wrap>
      <div className='filter'/>
      <S.ContainerImage className='container'>
        <img className='img' alt='' src='/assets/main-banner.jpg'/>
      </S.ContainerImage>
      
      <S.Content className='container'>
        <h1 className='title'>Все скидки<br/>в одном месте</h1>
  
        <S.ButtonsContainer>
          <S.WrapItemForm active={sexId === 1}>
            <Button1 href={'/men/home'} className='button form-item' borderRad={5}>Мужчины</Button1>
          </S.WrapItemForm>
  
          <S.WrapItemForm active={sexId === 2}>
            <Button1 href={'/women/home'} className='button form-item' borderRad={5}>Женщины</Button1>
          </S.WrapItemForm>
  
          <S.WrapItemForm>
            <SelectCategory
              className='form-item'
              setCategory={(cats: Array<number>) => setCategories(cats)}
              sexId={sex_id}
              categories={categories}
            />
          </S.WrapItemForm>
  
  
          <S.WrapItemForm>
            <SearchBrands
              className='form-item'
              setBrands={setBrands}
              selectedBrands={brands}
              categories={categories}
              sexId={sex_id}
            />
          </S.WrapItemForm>
  
   
          <Button1 type={'middle'} href={urlSearchSale} className='black-button'>
            Искать скидки
          </Button1>

          
        </S.ButtonsContainer>
      </S.Content>
      

      <div className='space'/>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    position: relative;
    
    & .filter {
      position: absolute;
      background-color: rgba(0,0,0,0.2);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      z-index: 2;
    }
    
    & .container {
        position: absolute;
        background-color: transparent;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
   
       
        z-index: 1;
    }
    
    & .space {
      padding-bottom: 140.186916%;
    }
`,
  
  ContainerImage: styled.div`
    & .img {
        width: 100%;
        height: 100%;
        display: block;
    }
`,
  
  Content: styled.div`
    z-index: 3 !important;
    & .title {
       font-family: 'Circe', sans-serif;
       padding-top: 17.5%;
       color: #FFFFFF;
       font-size: 24px;
       line-height: 28px;
       text-align: center;
       font-weight: bold;
    }
    
    @media (min-width: 360px) {
      .title {
          font-size: calc( 13.740458vw - 21.4656px );
          line-height: calc( 13.740458vw - 21.4656px );
       }
    }
`,
  ButtonsContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    
    box-sizing: border-box;
    z-index: 999;
    
    margin-top: 5%;
    width: 100%;
    
    & .black-button{
      text-transform: uppercase;
      border-radius: 5px;
      background-color: #272727;
      border: transparent;
      font-weight: bold;
      color: white;
      margin-top: 10px;
      width: 250px !important;
    }
`,
  
  WrapItemForm: styled.div<{ active?: boolean}>`
    margin: 7px 0;
    
    & .form-item {
     width: 250px !important;
    }
    
    
    & .button {
      background-color: ${({ active }) => active ? '#FFFFFF' : 'rgba(5,9,18,0.5)'};
      color: ${({ active }) => active ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.8)' };
      
      border: 1px solid transparent;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 16px;

      width: 170px;
    }
    
    & .search-brand {
       width: 216px;
       border: transparent;
       
       background-color: ${({ active }) => active ? '#FFFFFF' : 'rgba(5,9,18,0.5)'};
       color: ${({ active }) => active ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.8)' };
    }
    
    &  .icon-search { fill: #FFFFFF !important; }
`,
}
