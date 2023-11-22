-- UPDATE accounts_user set password=(SELECT password FROM accounts_user WHERE email='k97115284@gmail.com')
-- SELECT id FROM products_depositproduct


-- SELECT id, fin_co_no, fin_prdt_cd from products_depositproduct

SELECT products FROM accounts_user

UPDATE accounts_user SET products = 'D/$0010389/$24-3/$463,S/$0010022/$10-01-30-031-0018-0000/$73,D/$0010390/$240036/$482,D/$0010388/$240061/$425' WHERE email='k97115284@gmail.com'

SELECT product_id FROM products_depositoption WHERE id = '516'
SELECT * FROM products_depositproduct WHERE id = (SELECT product_id FROM products_depositoption WHERE id = '560')