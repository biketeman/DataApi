#DATA API

github link :
https://github.com/biketeman/DataApi

This project uses Node.JS GraphQL and vue.JS 

It's a dashboard connecting to a customer database that has for main purpose to put forward
the breakpoints on people subscription.

To launch the API => cd api => npm run dev 

To launch the front => cd app => npm run serve 

to make it work on your own DB you need to change it a bit.
Create 4 columns on table client named 'ispro' 'isweekend' 'isjeune' 'issenior' and set them to false

then set them to true with these queries

Week-end:
UPDATE client 
SET isweekend = true
FROM (
SELECT segment.cle_client, count(*)
FROM CLIENT
LEFT JOIN segment on segment.cle_client = client.cle_client
WHERE EXTRACT(ISODOW FROM segment.sg_dt_dep_voy) IN (6, 7)
GROUP BY segment.cle_client
having COUNT(*) <5
ORDER BY count DESC) as subquery
WHERE client.cle_client =  subquery.cle_client

Jeune:
UPDATE client
SET isjeune = true
WHERE in_age <= 25
AND in_age >= 18

Senior: 
UPDATE client
SET issenior = false
WHERE in_age >= 65

Pro:
UPDATE client 
SET isweekend = true
FROM (SELECT segment.cle_client, count(*) 
from segment
group by segment.cle_client
having count(*) >= 24
order by count desc) as subquery
