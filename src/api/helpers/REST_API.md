## **REST API SITO.STORE:**

#### **1. Поиск:**
##### **- Главный поиск:**
`/api/search/mainSearch`
* phrase <String> - (Поисковое слово)
* sex_id <Integer?> 
* limit <Integer?>  (Количество возвращаемых строк)


#### **2. Продукты:**
##### **- Фильтры:**
`/api/products/filters`
* sex_id <Integer ?>
* brands < [String] ?>
* categories: < [Integer] ?>
* sizes: < [String] ?>
* colors: < [String] ?>
* prices: < [Int, Int] ?>
* sales: < [Int, Int] ?>



##### **- Товары:**
`/api/products/getProducts`
* sex_id <Integer ?>
* brands < [String] ?>
* categories: < [Integer] ?>
* sizes: < [String] ?>
* colors: < [String] ?>
* prices: < [Int, Int] ?>
* sales: < [Int, Int] ?>

* limit: <Integer?> - количество на странице (по дефолту 20)
* page <Integer> - номер страницы
* 