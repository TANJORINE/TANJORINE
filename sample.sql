-- UPDATE accounts_user set password=(SELECT password FROM accounts_user WHERE email='k97115284@gmail.com')
-- SELECT id FROM products_depositproduct


-- SELECT id, fin_co_no, fin_prdt_cd from products_depositproduct

SELECT products FROM accounts_user

UPDATE accounts_user SET products = 'S/$0010019/$TD11330031000/$57,S/$0010437/$310005/$486,S/$0010389/$31/$348,D/$0010390/$240038/$491,S/$0017801/$1001303001001/$174' WHERE email='k97115284@gmail.com'

SELECT product_id FROM products_depositoption WHERE id = '516'
SELECT * FROM products_depositproduct WHERE id = (SELECT product_id FROM products_depositoption WHERE id = '560')

SELECT * FROM products_savingoption WHERE product_id = (SELECT product_id FROM products_savingoption WHERE id = '596')
SELECT * FROM products_savingproduct WHERE id = (SELECT product_id FROM products_savingoption WHERE id = '596')