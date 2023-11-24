-- UPDATE accounts_user set password=(SELECT password FROM accounts_user WHERE email='k97115284@gmail.com')
-- SELECT id FROM products_depositproduct


-- SELECT id, fin_co_no, fin_prdt_cd from products_depositproduct

SELECT * FROM accounts_user WHERE products LIKE ('%D/$0010389/$24%')

UPDATE accounts_user SET products = '' WHERE email='k97115284@gmail.com'
UPDATE accounts_user SET is_staff=1, is_superuser=1 WHERE email='k97115284@gmail.com'

SELECT product_id FROM products_depositoption WHERE id = '516'
SELECT * FROM products_depositproduct WHERE id = (SELECT product_id FROM products_depositoption WHERE id = '560')

SELECT * FROM products_savingoption WHERE product_id = (SELECT product_id FROM products_savingoption WHERE id = '596')
SELECT * FROM products_savingproduct WHERE id = (SELECT product_id FROM products_savingoption WHERE id = '596')

